package com.osds.peamo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="api_perfume")
@Builder
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                         // id

    private String name;                     // name

    private int gender;                      // gender

    private String imgurl;                   // imgurl

    private int goodCnt;                     // good_cnt

    @ManyToOne
    private Brand brand;                     // brand

}
