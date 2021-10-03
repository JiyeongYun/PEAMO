package com.osds.peamo.repository;

import com.osds.peamo.model.entity.UserPerfumeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.Optional;

public interface UserPerfumeListRepository extends JpaRepository<UserPerfumeList, Long> {
	
    ArrayList<UserPerfumeList> getUserPerfumeListsByUserId(long userId);
    Optional<UserPerfumeList> getUserPerfumeListByPerfumeIdAndUserId(long perfumeId, long userId);
    
//    @Query(value = "SELECT * From peamo.api_userperfumelist WHERE perfume_id = :perfumeId AND user_id =: userId", nativeQuery = true)
//    UserPerfumeList getIdByPidAndUid(long perfumeId, long userId);
    
}
