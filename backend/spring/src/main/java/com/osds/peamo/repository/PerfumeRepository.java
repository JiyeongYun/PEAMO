package com.osds.peamo.repository;

import com.osds.peamo.model.entity.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    ArrayList<Perfume> findTop20ByIdGreaterThanEqual(Long perfumeId);

    Perfume getPerfumeById(long id);
}
