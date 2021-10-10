package com.osds.peamo.repository;

import com.osds.peamo.model.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

	@Query(value = "SELECT eng FROM peamo.note WHERE id in (:noteIdList)", nativeQuery = true)
	List<String> getNoteEngNameById(List<Long> noteIdList);
	
}