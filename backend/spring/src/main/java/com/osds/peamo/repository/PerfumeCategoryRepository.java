package com.osds.peamo.repository;

import com.osds.peamo.model.entity.PerfumeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PerfumeCategoryRepository extends JpaRepository<PerfumeCategory, Long> {
    List<PerfumeCategory> getPerfumeCategoriesByCategoryIdIn(List<Long> categoryIdList);
    List<PerfumeCategory> getPerfumeCategoriesByCategoryId(long categoryId);
    List<PerfumeCategory> getPerfumeCategoriesByPerfumeId(long perfumeId);

}