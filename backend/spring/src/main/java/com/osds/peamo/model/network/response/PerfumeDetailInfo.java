package com.osds.peamo.model.network.response;

import java.util.List;
import java.util.Set;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PerfumeDetailInfo {
	
	PerfumeSimpleInfo perfumeSimpleInfo;
	List<String> categoryNameList;
	NotesTMB notesTMB;
	int gender;
	Set<Long> seasons;
	int goodCount;
	
}