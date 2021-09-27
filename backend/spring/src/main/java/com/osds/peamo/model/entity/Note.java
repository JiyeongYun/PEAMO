package com.osds.peamo.model.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="api_note")
@Builder
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                         // id

    private String eng;

    private String kor;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;
}
