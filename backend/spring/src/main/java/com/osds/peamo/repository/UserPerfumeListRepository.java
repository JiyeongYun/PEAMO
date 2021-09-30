package com.osds.peamo.repository;

import com.osds.peamo.model.entity.UserPerfumeList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface UserPerfumeListRepository extends JpaRepository<UserPerfumeList, Long> {
    ArrayList<UserPerfumeList> getUserPerfumeListsByUserId(long userId);
    Optional<UserPerfumeList> getUserPerfumeListByPerfumeIdAndUserId(long perfumeId, long userId);
}
