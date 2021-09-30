package com.osds.peamo.service;

import com.osds.peamo.model.entity.Perfume;
import com.osds.peamo.model.entity.PerfumeCategory;
import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.repository.BrandRepository;
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

    public List<PerfumeSimpleInfo> getPerfumeList(PerfumeListSearch perfumeSearch, int page) {

    	List<Long> categoryList = perfumeSearch.getCategoryList();
    	List<Long> subCategoryList = new ArrayList<>();
    	for (int i = 0, size=categoryList.size(); i < size; i++) {
			long num = categoryList.get(i);
			if (num == 4) { subCategoryList.add((long) 1); }
			else if (num == 5) { subCategoryList.add((long) 3); subCategoryList.add((long) 4); }
			else if (num == 6) { subCategoryList.add((long) 2); }
			else if (num == 7) { subCategoryList.add((long) 5); subCategoryList.add((long) 8); } 
			else if (num == 8) { subCategoryList.add((long) 7); } 
    	}//sql에서 찾을 구체적인 카테고리로 담아주기
    	
        List<PerfumeCategory> perfumeCategoryList = perfumeCategoryRepository.getPerfumeCategoriesByCategoryIdIn(subCategoryList);

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
        
        Page<Perfume> perfumePage = perfumeRepository.getPerfumesByGenderAndIdIn(perfumeSearch.getGender(), perfumeIdList, PageRequest.of(page, 30, Sort.by("id")));
        List<Perfume> perfumeList = perfumePage.getContent();
        
        List<PerfumeSimpleInfo> perfumeListResponse = new ArrayList<>();
        
        for (int i = 0, size=perfumeList.size(); i < size; i++) {
        	Perfume perfume = perfumeList.get(i);
            String brandName = brandRepository.getBrandById(perfume.getBrand().getId()).getName();
			perfumeListResponse.add(PerfumeSimpleInfo.builder().id(perfume.getId())
					.name(perfume.getName()).brand(brandName).imgurl(perfume.getImgurl()).build());
		}
        
        return perfumeListResponse;
    }

}
