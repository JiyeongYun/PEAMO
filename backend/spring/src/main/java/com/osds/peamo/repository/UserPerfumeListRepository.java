package com.osds.peamo.repository;

import com.osds.peamo.model.entity.UserPerfumeList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface UserPerfumeListRepository extends JpaRepository<UserPerfumeList, Long> {
    ArrayList<UserPerfumeList> getUserPerfumeListsByUserId(long userId);
}
