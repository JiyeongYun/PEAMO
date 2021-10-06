package com.osds.peamo.repository;

import com.osds.peamo.model.entity.Similarity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SimilarityRepository extends JpaRepository<Similarity, Long> {

    List<Similarity> getSimilaritiesByStandard(long standard);


    @Query(value = "SELECT id FROM peamo.similarity WHERE standard=:perfumeId LIMIT 1", nativeQuery = true)
    Optional<Long> getIdByStandard(long perfumeId);
}
