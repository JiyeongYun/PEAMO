package com.osds.peamo.repository;

import com.osds.peamo.model.entity.PerfumeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PerfumeCategoryRepository extends JpaRepository<PerfumeCategory, Long> {
	
	//입력 받는 카테고리 번호에 따라 세부 카테고리 리턴
    List<PerfumeCategory> getPerfumeCategoriesByCategoryIdIn(List<Long> categoryIdList);
    
    @Query(value = "SELECT * From peamo.api_perfumecategory WHERE perfume_id = :perfumeId", nativeQuery = true)
    List<PerfumeCategory> getpcListByPerfumeId(long perfumeId);
}