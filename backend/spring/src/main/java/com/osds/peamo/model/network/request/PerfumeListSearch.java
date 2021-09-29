package com.osds.peamo.model.network.request;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PerfumeListSearch {

    int gender;
    List<Long> categoryList;

}
