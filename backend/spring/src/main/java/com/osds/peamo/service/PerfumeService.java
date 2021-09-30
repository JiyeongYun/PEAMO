package com.osds.peamo.service;

import com.osds.peamo.model.entity.*;
import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.request.RecommendRequest;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class PerfumeService {

    final private PerfumeRepository perfumeRepository;
    final private PerfumeCategoryRepository perfumeCategoryRepository;
    final private BrandRepository brandRepository;
    final private CategorySeasonRepository categorySeasonRepository;
    final private SimilarityRepository similarityRepository;

    public List<PerfumeSimpleInfo> getPerfumeList(PerfumeListSearch perfumeSearch, int page) {

        List<Long> categoryList = perfumeSearch.getCategoryList();
        List<Long> subCategoryList = new ArrayList<>();
        for (int i = 0, size = categoryList.size(); i < size; i++) {
            long num = categoryList.get(i);
            if (num == 4) {
                subCategoryList.add((long) 1);
            } else if (num == 5) {
                subCategoryList.add((long) 3);
                subCategoryList.add((long) 4);
            } else if (num == 6) {
                subCategoryList.add((long) 2);
            } else if (num == 7) {
                subCategoryList.add((long) 5);
                subCategoryList.add((long) 8);
            } else if (num == 8) {
                subCategoryList.add((long) 7);
            }
        }//sql에서 찾을 구체적인 카테고리로 담아주기

        List<PerfumeCategory> perfumeCategoryList = perfumeCategoryRepository.getPerfumeCategoriesByCategoryIdIn(subCategoryList);

        HashMap<Long, Integer> hm = new HashMap<Long, Integer>();
        List<Long> perfumeIdList = new ArrayList<>();
        perfumeCategoryList.forEach(p -> {
            int cnt = hm.getOrDefault(p.getPerfumeId(), 0);
            cnt++;
            hm.put(p.getPerfumeId(), cnt);
            if (cnt == subCategoryList.size()) {
                perfumeIdList.add(p.getPerfumeId());
            }
        });// 향수 id list에 담기

        Page<Perfume> perfumePage = perfumeRepository.getPerfumesByGenderAndIdIn(perfumeSearch.getGender(), perfumeIdList, PageRequest.of(page, 30, Sort.by("id")));
        List<Perfume> perfumeList = perfumePage.getContent();

        List<PerfumeSimpleInfo> perfumeListResponse = new ArrayList<>();

        for (int i = 0, size = perfumeList.size(); i < size; i++) {
            Perfume perfume = perfumeList.get(i);
            Optional<Brand> brand = brandRepository.getBrandById(perfume.getBrand().getId());
            if (brand.isPresent()) {
                String brandName = brand.get().getName();
                perfumeListResponse.add(PerfumeSimpleInfo.builder().id(perfume.getId())
                        .name(perfume.getName()).brand(brandName).imgurl(perfume.getImgurl()).build());
            } else {
                return null;
            }
        }

        return perfumeListResponse;
    }

    public List<PerfumeSimpleInfo> getPerfumeRecommend(RecommendRequest recommendRequest) {
        int season = recommendRequest.getSeason();

        boolean mainContainSeason = false;  // 메인 카테고리가 계절 포함하는지
        boolean subContainSeason = false;   // 서브 카테고리가 계절 포함하는지

        long mainCategory = recommendRequest.getMainCategory();
        long subCategory = recommendRequest.getSubCategory();
        long dislikeCategory = recommendRequest.getDislikeCategory();

        List<CategorySeason> mainSeasons = categorySeasonRepository.getCategorySeasonsByCategoryId(mainCategory);
        List<CategorySeason> subSeasons = categorySeasonRepository.getCategorySeasonsByCategoryId(subCategory);

        for (int i = 0; i < mainSeasons.size(); i++)
            if (mainSeasons.get(i).getSeasonId() == season) {
                mainContainSeason = true;
                break;
            }

        for (int i = 0; i < subSeasons.size(); i++)
            if (subSeasons.get(i).getSeasonId() == season) {
                subContainSeason = true;
                break;
            }

        List<PerfumeCategory> mainLikes = perfumeCategoryRepository.getPerfumeCategoriesByCategoryId(mainCategory);
        List<PerfumeCategory> subLikes = perfumeCategoryRepository.getPerfumeCategoriesByCategoryId(subCategory);
        List<PerfumeCategory> hates = perfumeCategoryRepository.getPerfumeCategoriesByCategoryId(dislikeCategory);

        // 교집합 결과
        List<Long> intersectionList = new ArrayList<>();

        Set<Long> hateSet = new HashSet<>();
        Set<Long> subSet = new HashSet<>();

        // 싫어하는 카테고리 찾아내기
        for (int i = 0; i < hates.size(); i++)
            hateSet.add(hates.get(i).getPerfumeId());

        if ((mainContainSeason && subContainSeason) || (!mainContainSeason && !subContainSeason)) {
            // 2개의 카테고리가 계절을 포함하는 경우 or 2개다 계절을 포함하지 않는 경우
            for (int i = 0; i < subLikes.size(); i++) {
                long perfumeId = subLikes.get(i).getPerfumeId();
                subSet.add(perfumeId);
            }

            for (int i = 0; i < mainLikes.size(); i++) {
                long perfumeId = mainLikes.get(i).getPerfumeId();
                if (!hateSet.contains(perfumeId) && subSet.contains(perfumeId)) {
                    intersectionList.add(perfumeId);
                }
            }

        } else if (mainContainSeason) {
            for (int i = 0; i < mainLikes.size(); i++) {
                long perfumeId = mainLikes.get(i).getPerfumeId();
                if (!hateSet.contains(perfumeId)) {
                    intersectionList.add(perfumeId);
                }
            }

        } else if (subContainSeason) {
            for (int i = 0; i < subLikes.size(); i++) {
                long perfumeId = subLikes.get(i).getPerfumeId();
                if (!hateSet.contains(perfumeId)) {
                    intersectionList.add(perfumeId);
                }
            }
        }

        List<PerfumeSimpleInfo> recommendedPerfumes = new ArrayList<>();

        // 1. 랜덤으로 한 개의 향수 뽑기
        long perfumeId = getRandomOnePerfume(intersectionList);

        // 2. 랜덤으로 뽑은 향수와 유사도가 높은 향수 2개 뽑기
        List<Similarity> similarityList = this.similarityRepository.getSimilaritiesByStandard(perfumeId);

        // 3. TOP3 향수 담아서 return
        recommendedPerfumes.add(getPerfumeSimpleInfo(perfumeId));
        for (Similarity similarity : similarityList) {
            recommendedPerfumes.add(getPerfumeSimpleInfo(similarity.getComparison()));
        }
        return recommendedPerfumes;
    }

    /**
     * 향수 ID로 PerfumeSimpleInfo 객체 정보 채워 반환하는 메서드
     */
    private PerfumeSimpleInfo getPerfumeSimpleInfo(long perfumeId) {

        Perfume perfume = perfumeRepository.getPerfumeById(perfumeId);
        if (perfume != null) {
            String brandName = getBrandName(perfume.getBrand().getId());
            return PerfumeSimpleInfo.builder()
                    .id(perfume.getId())
                    .name(perfume.getName())
                    .brand(brandName)
                    .imgurl(perfume.getImgurl())
                    .build();
        }
        return null;
    }

    /**
     * brand명 가져오는 메서드
     */
    private String getBrandName(long id) {
        Optional<Brand> brand = brandRepository.getBrandById(id);
        if (brand.isPresent())
            return brand.get().getName();
        return null;
    }

    /**
     * 교집합으로 나온 향수 id list 중 랜덤으로 하나의 향수 id 값을 뽑기
     * [조건] top, middle, base note가 하나라도 존재하는 향수여야 한다.
     */
    private long getRandomOnePerfume(List<Long> result) {

        Random rand = new Random();
        while (true) {

            // 1. 랜덤으로 idx 하나 뽑기
            long perfumeId = result.get(rand.nextInt(result.size()));

            // 2. note가 있는 향수인지 체크하기
            if (isExistNote(perfumeId)) {
                return perfumeId;
            }
        }
    }

    /**
     * note가 있는 향수인지 체크하기
     */
    private boolean isExistNote(long perfumeId) {
        List<PerfumeCategory> perfumeCategory = this.perfumeCategoryRepository.getPerfumeCategoriesByPerfumeId(perfumeId);
        return perfumeCategory.size() > 0;
    }

}
