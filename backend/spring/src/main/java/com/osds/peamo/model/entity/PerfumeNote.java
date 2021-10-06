package com.osds.peamo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "perfumenote")
@Builder
public class PerfumeNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                         // id

    private int noteType;                    // note_type

    @OneToOne
    @JoinColumn(name = "note_id")
    private Note note;

    @ManyToOne
    @JoinColumn(name = "perfume_id")
    private Perfume perfume;
}
