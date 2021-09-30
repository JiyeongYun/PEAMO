package com.osds.peamo.model.network.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.osds.peamo.model.entity.Perfume;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MyPageResponse {

    String uid;

    String name;

    ArrayList<Perfume> perfumeList;

}
