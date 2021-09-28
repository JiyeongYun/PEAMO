package com.osds.peamo.service;

import com.osds.peamo.model.entity.Perfume;
import com.osds.peamo.model.entity.PerfumeCategory;
import com.osds.peamo.model.network.request.PerfumeSearch;
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

    public Map<String, Object> getPerfumeList(PerfumeSearch perfumeSearch, int page) {

    	Map<String, Object> response = new HashMap<>();
    	
    	List<Long> categoryList = perfumeSearch.getCategoryList();
    	List<Long> subCategoryList = new ArrayList<>();
    	for (int i = 0, size=categoryList.size(); i < size; i++) {
			long num = categoryList.get(i);
			if (num == 1) { subCategoryList.add((long) 1); }
			else if (num == 2) { subCategoryList.add((long) 3); subCategoryList.add((long) 4); }
			else if (num == 3) { subCategoryList.add((long) 2); }
			else if (num == 4) { subCategoryList.add((long) 5); subCategoryList.add((long) 8); } 
			else if (num == 5) { subCategoryList.add((long) 7); } 
    	}//sql에서 찾을 구체적인 카테고리로 담아주기
    	
        List<PerfumeCategory> perfumeCategoryList = perfumeCategoryRepository.getPerfumeCategoriesByCategoryIdIn(subCategoryList);
        List<Long> perfumeIdList = new ArrayList<>(); 
        for (int i = 0, size=perfumeCategoryList.size(); i < size; i++) {
			perfumeIdList.add((long) perfumeCategoryList.get(i).getPerfumeId());
		}// 향수 id list에 담기
        
        Page<Perfume> perfumePage = perfumeRepository.getPerfumesByGenderAndIdIn(perfumeSearch.getGender(), perfumeIdList, PageRequest.of(page, 30, Sort.by("id")));
        List<Perfume> perfumeList = perfumePage.getContent();
        ///////////// 코드 작성 중 /////////////

        return response;
    }

}
