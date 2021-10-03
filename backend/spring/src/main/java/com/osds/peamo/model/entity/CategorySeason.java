package com.osds.peamo.model.entity;

import javax.persistence.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="api_categoryseason")
@Builder
public class CategorySeason {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;                     

    private long categoryId;
    private long seasonId;
    
}
