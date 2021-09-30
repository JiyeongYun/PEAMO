package com.osds.peamo.model.network.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PerfumeSimpleInfo {
	
	long id;
	String name;
	String brand;
	String imgurl;

}
