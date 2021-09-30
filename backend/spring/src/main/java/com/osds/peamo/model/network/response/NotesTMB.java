package com.osds.peamo.model.network.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
// Top, Middle, Base notes 정보를 담은 Class
public class NotesTMB {
	
	String topNote;
	String middleNote;
	String baseNote;
	
}