package com.osds.peamo.model.network.request;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PerfumeSearch {

    int gender;
    List<Long> categoryList;

}
