package com.osds.peamo.model.network.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PerfumeListSearch {

    int gender;
    long category;
    String uid;

}
