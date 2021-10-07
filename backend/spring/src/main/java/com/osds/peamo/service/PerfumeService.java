package com.osds.peamo.service;

import com.osds.peamo.model.entity.*;
import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.request.RecommendRequest;
import com.osds.peamo.model.network.response.NotesTMB;
import com.osds.peamo.model.network.response.PerfumeDetailInfo;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class PerfumeService {

    final private BrandRepository brandRepository;
    final private CategoryRepository categoryRepository;
    final private CategorySeasonRepository categorySeasonRepository;
    final private NoteRepository noteRepository;
    final private PerfumeCategoryRepository perfumeCategoryRepository;
    final private PerfumeNoteRepository perfumeNoteRepository;
    final private PerfumeRepository perfumeRepository;
    final private SimilarityRepository similarityRepository;
    final private UserService userService;
    
    /**
     * 향수 기본 정보 반환
     */
    public List<PerfumeSimpleInfo> getPerfumeList(PerfumeListSearch perfumeListSearch, int page) {
        int category = perfumeListSearch.getCategory();
        List<Long> perfumeIdList;
        if (category == 3) {
            perfumeIdList = perfumeCategoryRepository.getAllPerfumeId();
        } else {
            List<Long> subCategoryList = getSubCategoryList(category);
            perfumeIdList = perfumeCategoryRepository.getperfumeIdByCategoryId(subCategoryList);
        }
        Page<Perfume> perfumePage = perfumeRepository.getPerfumesByGenderAndIdIn(perfumeListSearch.getGender(), perfumeIdList, PageRequest.of(page, 30, Sort.by("id").descending()));
        List<Perfume> perfumeList = perfumePage.getContent();

        return getPerfumeSimpleInfoList(perfumeList, perfumeListSearch.getUId());
    }

    // 향수 리스트, 향수 기본 정보 리스트 반환
    public List<PerfumeSimpleInfo> getPerfumeSimpleInfoList(List<Perfume> perfumeList, String uId) {
        List<PerfumeSimpleInfo> perfumeListResponse = new ArrayList<>();

        long userId = userService.getUserTableId(uId);
        int size = perfumeList.size();

        for (int i = 0; i < size; i++) {
            Perfume perfume = perfumeList.get(i);
            long perfumeId = perfume.getId();
            boolean isLike = false;
            if (userId != -1)
                isLike = userService.isLikePerfume(userId, perfumeId) != -1 ? true : false; // -1이 아닌 경우? true: 좋아요 O  / false: 좋아요 X
            Optional<Brand> brand = brandRepository.getBrandById(perfume.getBrand().getId());
            String brandName = null;
            if (brand.isPresent()) {
                brandName = brand.get().getName();
            }
            perfumeListResponse.add(PerfumeSimpleInfo.builder().id(perfume.getId()).name(perfume.getName()).brand(brandName).imgurl(perfume.getImgurl()).isLike(isLike).build());
        }
        return perfumeListResponse;
    }


    // 큰 카테고리 -> 세부 카테고리 변환 메소드
    public List<Long> getSubCategoryList(int category) {
        List<Long> subCategoryList = new ArrayList<>();
        switch (category) {
            case 4: subCategoryList.add((long) 1); break;
            case 5: subCategoryList.add((long) 3); subCategoryList.add((long) 4); break;
            case 6: subCategoryList.add((long) 2); break;
            case 7: subCategoryList.add((long) 5); subCategoryList.add((long) 8); break;
            case 8: subCategoryList.add((long) 7); break;
        }
        return subCategoryList;
    }

    // 세부 카테고리 -> 큰 카테고리 변환 메소드
    public Set<Integer> getCategoryList(List<Long> subCategory) {
        Set<Integer> categoryList = new HashSet<>();
        for (int i = 0, size = subCategory.size(); i < size; i++) {
            long num = subCategory.get(i);
            if(num == 1) { categoryList.add(4); }
            else if(num == 3 || num == 4) { categoryList.add(5); }
            else if(num == 2) { categoryList.add(6); }
            else if(num == 5 || num == 8) { categoryList.add(7); }
            else if(num == 7) { categoryList.add(8); }
        }
        return categoryList;
    }

    /**
     * 향수 상세 정보 반환
     */
    public PerfumeDetailInfo getPerfumeDetailInfo(long pId, String uId) {

        Perfume perfume = perfumeRepository.getPerfumeById(pId);
        if (perfume != null) {

            // 1. 향수 간단 정보 - PerfumeSimpleInfo
            PerfumeSimpleInfo perfumeSimpleInfo = getPerfumeSimpleInfo(pId);
            long userId = userService.getUserTableId(uId);
            boolean isLike = false;
            if(userId != -1) isLike = userService.isLikePerfume(userId, pId) != -1 ? true : false;
            perfumeSimpleInfo.setLike(isLike);

            // 2. 카테고리명 리스트 - CategoryNameList
            List<PerfumeCategory> PCList = perfumeCategoryRepository.getPerfumeCategoriesByPerfumeId(pId);
            List<Long> categoryIdList = new ArrayList<>();      // 카테고리 ID 정보
            List<String> categoryNameList = new ArrayList<>();  // 카테고리 이름 정보
            for (int i = 0, size = PCList.size(); i < size; i++) {
                long categoryId = PCList.get(i).getCategoryId();
                Category category = categoryRepository.getCategoryById(categoryId);
                categoryIdList.add(category.getId());
                categoryNameList.add(category.getEng());
            }

            // 3. Note(Top, Middle, Base) 정보 - NotesTMB
            NotesTMB notesTMB = getNotesTMB(pId); // 향(Top, Middle, Base) 정보

            // 4. 성별 정보 - gender
            int gender = perfume.getGender();

            // 5. 계절 정보 - Seasons
            List<Long> duplicatedSeasons = new ArrayList<>();
            List<CategorySeason> csList = categorySeasonRepository.getCategorySeasonsByCategoryIdIn(categoryIdList);
            for(CategorySeason cs : csList){
                duplicatedSeasons.add(cs.getSeasonId());
            }
            HashSet<Long> seasons = new HashSet<>(duplicatedSeasons);   // 중복제거

            // 6. 좋아요 수 - goodCount
            int goodCount = perfume.getGoodCnt();

            return PerfumeDetailInfo.builder().perfumeSimpleInfo(perfumeSimpleInfo).categoryNameList(categoryNameList)
                    .notesTMB(notesTMB).gender(gender).seasons(seasons).goodCount(goodCount).build();
        }
        return null;
    }

    // 향수 id에 맞는 NotesTMB 반환
    public NotesTMB getNotesTMB(long id) {
        NotesTMB notesTMB = new NotesTMB(new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        List<Long> noteIdList;
        for (int noteType = 1; noteType <= 3; noteType++) {
            noteIdList = perfumeNoteRepository.getNoteIds(id, noteType); //향수 id가 갖고있는 note id 리스트 반환
            switch (noteType) { //id에 맞는 note 영어 이름 각 리스트에 저장
                case 1: notesTMB.getTopNote().addAll(noteRepository.getNoteEngNameById(noteIdList)); break;
                case 2: notesTMB.getMiddleNote().addAll(noteRepository.getNoteEngNameById(noteIdList)); break;
                case 3: notesTMB.getBaseNote().addAll(noteRepository.getNoteEngNameById(noteIdList)); break;
            }
        }
        return notesTMB;
    }

    /**
     * 이달의 향수 리스트 반환
     */
    public Map<String, Object> getMonthPerfume() {
        Map<String, Object> response = new HashMap<String, Object>();
        int season = getSeason();
        List<Long> categoryIds = categorySeasonRepository.getCategoryIdBySeasonId(season); //시즌에 해당하는 카테고리 아이디들
        List<Long> perfumeIds = perfumeCategoryRepository.getPopularPerfumeIdByCategoryId(categoryIds);
        response.put("PerfumeSimpleInfoList", getSimilarPerfumes(getSimilarityExistPerfumeId(perfumeIds)));
        response.put("categoryIds", getCategoryList(categoryIds));
        return response;
    }

    // id에 해당하는 향수 & 유사 향수 두 개 반환
    public List<PerfumeSimpleInfo> getSimilarPerfumes(long perfumeId) {
        List<PerfumeSimpleInfo> response = new ArrayList<>();

        // 1. 랜덤으로 뽑은 향수와 유사도가 높은 향수 2개 뽑기
        List<Similarity> similarityList = this.similarityRepository.getSimilaritiesByStandard(perfumeId);

        // 2. TOP3 향수 담아서 return
        response.add(getPerfumeSimpleInfo(perfumeId));
        for (Similarity similarity : similarityList) {
            response.add(getPerfumeSimpleInfo(similarity.getComparison()));
        }
        return response;
    }


    // 월에 따라 season 반환
    public int getSeason() {
        int season;
        Calendar cal = Calendar.getInstance();
        int month = cal.get(cal.MONTH) + 1;
        if (month == 3 || month == 4 || month == 5) { season = 1; }
        else if (month == 6 || month == 7 || month == 8) { season = 2; }
        else if (month == 9 || month == 10 || month == 11) { season = 3; }
        else { season = 4; }
        return season;
    }


    // brand명 가져오는 메서드
    private String getBrandName(long id) {
        Optional<Brand> brand = brandRepository.getBrandById(id);
        if (brand.isPresent())
            return brand.get().getName();
        return null;
    }

    // 유사도가 존재하는 향수의 perfumeId 반환
    private long getSimilarityExistPerfumeId(List<Long> perfumeIds) {
        long perfumeId = perfumeIds.get(0);
        for (int i = 0; i < 100; i++) {
            perfumeId = perfumeIds.get(i);
            if (similarityRepository.getIdByStandard(perfumeId).isPresent()) break;
        }
        return perfumeId;
    }

    /**
     * 이름에 단어가 포함된 향수 리스트 반환
     */
    public List<PerfumeSimpleInfo> getPerfumeList(String word, String uId, int page) {
        Page<Perfume> perfumePage = perfumeRepository.findByNameLike(word, PageRequest.of(page, 30, Sort.by("id").descending()));
        List<Perfume> perfumeList = perfumePage.getContent();
        return getPerfumeSimpleInfoList(perfumeList, uId);
    }

    /** teller 데이터에 따른 향수 추천 */
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

        // 성별 구별
        List<Long> result = new ArrayList<>();
        List<Perfume> perfumeList = perfumeRepository.getPerfumesByIdIn(intersectionList);
        for (Perfume perfume : perfumeList) {
            if (perfume.getGender() == recommendRequest.getGender()) {
                result.add(perfume.getId());
            }
        }
        return getSimilarPerfumes(getSimilarityExistPerfumeId(result));
    }

    // 향수 ID로 PerfumeSimpleInfo 객체 정보 채워 반환하는 메서드
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

}
