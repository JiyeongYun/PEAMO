package com.osds.peamo.model.network.response;

import java.util.List;

import com.osds.peamo.model.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PerfumeDetailInfo {
	
	PerfumeSimpleInfo perfumeSimpleInfo;
	List<Category> categoryList;
	
}
