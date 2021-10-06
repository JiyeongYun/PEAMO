package com.osds.peamo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "categoryseason")
@Builder
public class CategorySeason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;                         // id

    private long categoryId;

    private long seasonId;
}
