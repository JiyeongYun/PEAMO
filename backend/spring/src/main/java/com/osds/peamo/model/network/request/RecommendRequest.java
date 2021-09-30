package com.osds.peamo.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendRequest {

    private int season;
    private int gender;
    private long mainCategory;
    private long subCategory;
    private long dislikeCategory;

}
