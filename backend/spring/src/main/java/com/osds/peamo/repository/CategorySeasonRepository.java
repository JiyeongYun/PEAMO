package com.osds.peamo.repository;

import com.osds.peamo.model.entity.CategorySeason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategorySeasonRepository extends JpaRepository<CategorySeason, Long> {
	
	List<CategorySeason> getCategorySeasonsByCategoryId(long categoryId);

//	@Query(value = "SELECT season_id FROM peamo.categoryseason WHERE category_id in (:pCList)", nativeQuery = true)
//	List<Integer> getSeasonIdsByCategoryIds(List<PerfumeCategory> pCList);

	List<CategorySeason> getCategorySeasonsByCategoryIdIn(List<Long> categoryIdList);

	@Query(value = "SELECT category_id FROM peamo.categoryseason WHERE (season_id = :season)", nativeQuery = true)
	List<Long> getCategoryIdBySeasonId(int season);
	
}
