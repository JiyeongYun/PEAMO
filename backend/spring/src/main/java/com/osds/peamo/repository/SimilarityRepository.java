package com.osds.peamo.repository;

import com.osds.peamo.model.entity.Similarity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SimilarityRepository extends JpaRepository<Similarity, Long> {

    List<Similarity> getSimilaritiesByStandard(long standard);
}
