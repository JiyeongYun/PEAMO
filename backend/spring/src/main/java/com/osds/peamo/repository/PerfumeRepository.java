package com.osds.peamo.repository;

import com.osds.peamo.model.entity.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    Page<Perfume> getPerfumesByGenderAndIdIn(int gender, List<Long> perfumeIdList, Pageable pageable);

    Perfume getPerfumeById(long id);

    List<Perfume> getPerfumesByIdIn(List<Long> perfumeIdList);
    
    // 이름에 단어가 포함된 향수 객체 반환
    Page<Perfume> findByNameLike(String word, Pageable pageable);
}
