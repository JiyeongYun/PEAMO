package com.osds.peamo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.osds.peamo.model.entity.Brand;
import com.osds.peamo.model.entity.Category;
import com.osds.peamo.model.entity.Perfume;
import com.osds.peamo.model.entity.PerfumeCategory;
import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.response.NotesTMB;
import com.osds.peamo.model.network.response.PerfumeDetailInfo;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.repository.BrandRepository;
import com.osds.peamo.repository.CategoryRepository;
import com.osds.peamo.repository.CategorySeasonRepository;
import com.osds.peamo.repository.NoteRepository;
import com.osds.peamo.repository.PerfumeCategoryRepository;
import com.osds.peamo.repository.PerfumeNoteRepository;
import com.osds.peamo.repository.PerfumeRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PerfumeService {

    final private PerfumeRepository perfumeRepository;
    final private PerfumeCategoryRepository perfumeCategoryRepository;
    final private BrandRepository brandRepository;
    final private CategoryRepository categoryRepository;
    final private PerfumeNoteRepository perfumeNoteRepository;
    final private NoteRepository noteRepository;
    final private CategorySeasonRepository categorySeasonRepository;

    public List<PerfumeSimpleInfo> getPerfumeList(PerfumeListSearch perfumeSearch, int page) {

        List<Long> categoryList = perfumeSearch.getCategoryList();
        List<Long> subCategoryList = getSubCategoryList(categoryList);

        List<PerfumeCategory> perfumeCategoryList = perfumeCategoryRepository.getPerfumeCategoriesByCategoryIdIn(subCategoryList);
        List<Long> perfumeIdList = changeToAndLogic(perfumeCategoryList, subCategoryList);

        Page<Perfume> perfumePage = perfumeRepository.getPerfumesByGenderAndIdIn(perfumeSearch.getGender(), perfumeIdList, PageRequest.of(page, 30, Sort.by("id")));
        List<Perfume> perfumeList = perfumePage.getContent();

        List<PerfumeSimpleInfo> perfumeListResponse = new ArrayList<>();

        for (int i = 0, size=perfumeList.size(); i < size; i++) {
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
    
    // 큰 카테고리 -> 세부 카테고리 변환 메소드
    public List<Long> getSubCategoryList(List<Long> categoryList){
    	List<Long> subCategoryList = new ArrayList<>();
        for (int i = 0, size=categoryList.size(); i < size; i++) {
            long num = categoryList.get(i);
            if (num == 4) { subCategoryList.add((long) 1); }
            else if (num == 5) { subCategoryList.add((long) 3); subCategoryList.add((long) 4); }
            else if (num == 6) { subCategoryList.add((long) 2); }
            else if (num == 7) { subCategoryList.add((long) 5); subCategoryList.add((long) 8); }
            else if (num == 8) { subCategoryList.add((long) 7); }
        }
    	return subCategoryList;
    }
    
    // select OR -> AND 처리 메소드
    public List<Long> changeToAndLogic(List<PerfumeCategory> perfumeCategoryList, List<Long> subCategoryList){
        HashMap<Long, Integer> hm = new HashMap<Long, Integer>();
        List<Long> perfumeIdList = new ArrayList<>();
        perfumeCategoryList.forEach(p -> {
            int cnt = hm.getOrDefault(p.getPerfumeId(),0);
            cnt++;
            hm.put(p.getPerfumeId(),cnt);
            if(cnt == subCategoryList.size()){
                perfumeIdList.add(p.getPerfumeId());
            }
        });// 향수 id list에 담기
        return perfumeIdList;
    }

    // 향수 상세 정보 반환
	public PerfumeDetailInfo getPerfumeDetailInfo(long id) {
		
		PerfumeSimpleInfo perfumeSimpleInfo;  // 향수 간단 정보
		Perfume perfume = perfumeRepository.getPerfumeById(id);
		if (perfume!=null) {
			perfumeSimpleInfo = PerfumeSimpleInfo.builder().id(id).name(perfume.getName()).brand(perfume.getBrand().getName()).imgurl(perfume.getImgurl()).build();
			
			List<PerfumeCategory> PCList = perfumeCategoryRepository.getpcListByPerfumeId(id);
			List<String> categoryNameList = new ArrayList<String>(); // 카테고리 이름 정보
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
	
    // 향수 id에 맞는 NotesTMB 반환
    public NotesTMB getNotesTMB(long id){
    	NotesTMB notesTMB = new NotesTMB(new ArrayList<String>(), new ArrayList<String>(), new ArrayList<String>());
    	List<Long> noteIdList;
    	for (int noteType = 1; noteType <= 3; noteType++) {
    		noteIdList = perfumeNoteRepository.getNoteIds(id, noteType); //향수 id가 갖고있는 note id 리스트 반환
    		switch (noteType) { //id에 맞는 note 영어 이름 각 리스트에 저장
			case 1:	notesTMB.getTopNote().addAll(noteRepository.getNoteEngNameById(noteIdList)); break;
			case 2: notesTMB.getMiddleNote().addAll(noteRepository.getNoteEngNameById(noteIdList));	break;
			case 3:	notesTMB.getBaseNote().addAll(noteRepository.getNoteEngNameById(noteIdList)); break;
			}
		}
        return notesTMB;
    }

}
