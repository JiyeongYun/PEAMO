package com.osds.peamo.model.entity;

import lombok.*;
import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "api_perfumecategory")
@Entity
@Builder
@Getter
@ToString
public class PerfumeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "perfume_id")
    private long perfumeId;

    @Column(name = "category_id")
    private long categoryId;

    // 다대일 : category의 id와 연결
    @ManyToOne
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    private Category category;

}
