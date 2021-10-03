package com.osds.peamo.repository;

import com.osds.peamo.model.entity.CategorySeason;
import com.osds.peamo.model.entity.PerfumeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface CategorySeasonRepository extends JpaRepository<CategorySeason, Long> {
	
	List<CategorySeason> getCategorySeasonsByCategoryId(long categoryId);

	@Query(value = "SELECT season_id FROM peamo.api_categoryseason WHERE category_id in (:pCList)", nativeQuery = true)
	Set<Long> getSeasonIdsByCategoryIds(List<PerfumeCategory> pCList);

	@Query(value = "SELECT category_id FROM peamo.api_categoryseason WHERE season_id = :season)", nativeQuery = true)
	List<Long> getCategoryIdBySeasonId(int season);
	
}
