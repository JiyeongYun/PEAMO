package com.osds.peamo.model.network.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PerfumeSimpleInfo {
	
	long id;
	String name;
	String brand;
	String imgurl;
	int like;
}
