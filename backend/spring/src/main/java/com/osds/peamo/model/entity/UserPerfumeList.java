package com.osds.peamo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "userperfumelist")
@Builder
public class UserPerfumeList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;                    // id

    @Column(name = "perfume_id")
    private long perfumeId;

    @Column(name = "user_id")
    private long userId;

}
