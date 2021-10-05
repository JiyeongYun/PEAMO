package com.osds.peamo.service;

import com.osds.peamo.model.entity.*;
import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.request.RecommendRequest;
import com.osds.peamo.model.network.response.NotesTMB;
import com.osds.peamo.model.network.response.PerfumeDetailInfo;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
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
    final private UserRepository userRepository;
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

        List<PerfumeSimpleInfo> perfumeListResponse = new ArrayList<>();

        Optional<User> user = userRepository.findUserByUid(perfumeListSearch.getUid());

        long userId = user.isPresent() ? user.get().getId() : -1;
        int size = perfumeList.size();

        for (int i = 0; i < size; i++) {
            Perfume perfume = perfumeList.get(i);
            long perfumeId = perfume.getId();
            boolean isLike = false;
            if(userId != -1)
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

    /**
     * 큰 카테고리 -> 세부 카테고리 변환 메소드
     */
    public List<Long> getSubCategoryList(int category) {
        List<Long> subCategoryList = new ArrayList<>();
        switch (category) {
            case 4:
                subCategoryList.add((long) 1);
                break;
            case 5:
                subCategoryList.add((long) 3);
                subCategoryList.add((long) 4);
                break;
            case 6:
                subCategoryList.add((long) 2);
                break;
            case 7:
                subCategoryList.add((long) 5);
                subCategoryList.add((long) 8);
                break;
            case 8:
                subCategoryList.add((long) 7);
                break;
        }
        return subCategoryList;
    }

    /**
     * 향수 상세 정보 반환
     */
    public PerfumeDetailInfo getPerfumeDetailInfo(long id) {

        PerfumeSimpleInfo perfumeSimpleInfo;  // 향수 간단 정보
        Perfume perfume = perfumeRepository.getPerfumeById(id);
        if (perfume != null) {
            perfumeSimpleInfo = PerfumeSimpleInfo.builder().id(id).name(perfume.getName()).brand(perfume.getBrand().getName()).imgurl(perfume.getImgurl()).build();

            List<PerfumeCategory> PCList = perfumeCategoryRepository.getPerfumeCategoriesByPerfumeId(id);
            List<String> categoryNameList = new ArrayList<>(); // 카테고리 이름 정보
            for (int i = 0, size = PCList.size(); i < size; i++) {
                long categoryId = PCList.get(i).getCategoryId();
                Category category = categoryRepository.getById(categoryId);
                categoryNameList.add(category.getEng());
            }

            NotesTMB notesTMB = getNotesTMB(id); // 향(Top, Middle, Base) 정보
            int gender = perfume.getGender(); // 성별 정보
            Set<Long> seasons = categorySeasonRepository.getSeasonIdsByCategoryIds(PCList);
            int goodCount = perfume.getGoodCnt();

            return PerfumeDetailInfo.builder().perfumeSimpleInfo(perfumeSimpleInfo).categoryNameList(categoryNameList)
                    .notesTMB(notesTMB).gender(gender).seasons(seasons).goodCount(goodCount).build();
        } else {
            return null;
        }
    }

    /**
     * 향수 id에 맞는 NotesTMB 반환
     */
    public NotesTMB getNotesTMB(long id) {
        NotesTMB notesTMB = new NotesTMB(new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        List<Long> noteIdList;
        for (int noteType = 1; noteType <= 3; noteType++) {
            noteIdList = perfumeNoteRepository.getNoteIds(id, noteType); //향수 id가 갖고있는 note id 리스트 반환
            switch (noteType) { //id에 맞는 note 영어 이름 각 리스트에 저장
                case 1:
                    notesTMB.getTopNote().addAll(noteRepository.getNoteEngNameById(noteIdList));
                    break;
                case 2:
                    notesTMB.getMiddleNote().addAll(noteRepository.getNoteEngNameById(noteIdList));
                    break;
                case 3:
                    notesTMB.getBaseNote().addAll(noteRepository.getNoteEngNameById(noteIdList));
                    break;
            }
        }
        return notesTMB;
    }

    /**
     * 이달의 향수 리스트 반환
     */
    public List<PerfumeSimpleInfo> getMonthPerfume() {

        int season = getSeason();
        List<Long> categoryIds = categorySeasonRepository.getCategoryIdBySeasonId(season); //시즌에 해당하는 카테고리 아이디들
        List<Long> perfumeIds = perfumeCategoryRepository.getPopularPerfumeIdByCategoryId(categoryIds);
        long perfumeId = perfumeIds.get(0);
        for (int i = 0; i < 100; i++) {
        	perfumeId = perfumeIds.get(i);
        	if(isExistNote(perfumeId)) break;
		}
        return getSimilarPerfumes(perfumeId);
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


    /**
     * 월에 따라 season 반환
     */
    public int getSeason() {
        int season;
        Calendar cal = Calendar.getInstance();
        int month = cal.get(cal.MONTH) + 1;
        if (month == 3 || month == 4 || month == 5) {
            season = 1;
        } else if (month == 6 || month == 7 || month == 8) {
            season = 2;
        } else if (month == 9 || month == 10 || month == 11) {
            season = 3;
        } else {
            season = 4;
        }
        return season;
    }

    /**
     * teller 데이터에 따른 향수 추천
     */
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
        // 랜덤으로 한 개의 향수 뽑기
        long perfumeId = getRandomOnePerfume(intersectionList);

        return getSimilarPerfumes(perfumeId);
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
        return similarityRepository.getIdByStandard(perfumeId).isPresent();
    }

}
