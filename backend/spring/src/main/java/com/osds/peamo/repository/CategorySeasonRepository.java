package com.osds.peamo.repository;

import com.osds.peamo.model.entity.CategorySeason;
import com.osds.peamo.model.entity.PerfumeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategorySeasonRepository extends JpaRepository<CategorySeason, Long> {
    List<CategorySeason> getCategorySeasonsByCategoryId(long categoryId);
}
