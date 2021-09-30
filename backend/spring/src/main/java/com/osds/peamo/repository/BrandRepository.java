package com.osds.peamo.repository;

import com.osds.peamo.model.entity.Brand;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    ArrayList<Brand> findAll();
    Optional<Brand> getBrandById(long id);
    
}
