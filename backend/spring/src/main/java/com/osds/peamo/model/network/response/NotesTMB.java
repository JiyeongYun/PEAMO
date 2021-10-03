package com.osds.peamo.model.network.response;

import java.util.List;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
// 향수의 Top, Middle, Base notes 정보를 담은 Class
public class NotesTMB {
	
	List<String> topNote;
	List<String> middleNote;
	List<String> baseNote;
	
}

