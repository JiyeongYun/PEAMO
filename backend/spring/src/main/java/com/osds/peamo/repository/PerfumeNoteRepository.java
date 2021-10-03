package com.osds.peamo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.osds.peamo.model.entity.PerfumeNote;

public interface PerfumeNoteRepository extends JpaRepository<PerfumeNote, Long> {

	PerfumeNote getByPerfumeId(long id);

	@Query(value = "SELECT note_id FROM peamo.api_perfumenote WHERE perfume_id = :id AND note_type = :noteType", nativeQuery = true)
	List<Long> getNoteIds(long id, int noteType);
    
}