package com.osds.peamo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "api_userperfumelist")
@Builder
public class UserPerfumeList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;                    // id

    @Column
    private long perfumeId;

    @Column
    private long userId;

}
