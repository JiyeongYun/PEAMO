package com.osds.peamo.service;

import com.osds.peamo.model.entity.Brand;
import com.osds.peamo.model.entity.CategorySeason;
import com.osds.peamo.model.entity.Perfume;
import com.osds.peamo.model.entity.PerfumeCategory;
import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.request.RecommendRequest;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.repository.BrandRepository;
import com.osds.peamo.repository.CategorySeasonRepository;
import com.osds.peamo.repository.PerfumeCategoryRepository;
import com.osds.peamo.repository.PerfumeRepository;
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

    public List<PerfumeSimpleInfo> recommend(RecommendRequest recommendRequest) {
        int season = recommendRequest.getSeason();

        boolean mainContainSeason = false; // 메인 카테고리가 계절 포함하는지
        boolean subContainSeason = false; // 서브 카테고리가 계절 포함하는지

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

        List<Long> result = new ArrayList<Long>(); // 교집합 결과

        Set<Long> hateSet = new HashSet<Long>();
        Set<Long> subSet = new HashSet<Long>();

        for (int i = 0; i < hates.size(); i++) // 싫어하는 카테고리 찾아내기
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
                    result.add(perfumeId);
                }
            }


        } else if (mainContainSeason) {
            for (int i = 0; i < mainLikes.size(); i++) {
                long perfumeId = mainLikes.get(i).getPerfumeId();
                if (!hateSet.contains(perfumeId)) {
                    result.add(perfumeId);
                }
            }

        } else if (subContainSeason) {
            for (int i = 0; i < subLikes.size(); i++) {
                long perfumeId = subLikes.get(i).getPerfumeId();
                if (!hateSet.contains(perfumeId)) {
                    result.add(perfumeId);
                }
            }
        }

        for (int i = 0; i < result.size(); i++) { // 교집합 결과들
            System.out.println(result.get(i));
        }

        return null;
    }

}
