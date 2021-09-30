package com.osds.peamo.model.network.response;

import java.util.List;

import com.osds.peamo.model.entity.Category;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PerfumeDetailInfo {
	
	PerfumeSimpleInfo perfumeSimpleInfo;
	List<Category> categoryList;
	List<NotesTMB> notesTMBList;
	int gender;
	List<Long> seasons;
	int goodCount;
	
}