package com.osds.peamo.controller;

import java.util.List;

import com.osds.peamo.model.network.request.RecommendRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.service.PerfumeService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/perfume")
public class PerfumeController {

    private PerfumeService perfumeService;

    @PostMapping("/list")
    public ResponseEntity<List<PerfumeSimpleInfo>> getPerfumes(@RequestBody PerfumeListSearch perfumeSearch, @RequestParam int page) {
    	List<PerfumeSimpleInfo> response = perfumeService.getPerfumeList(perfumeSearch, page);
    	if (response == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/recommend")
    public ResponseEntity<List<PerfumeSimpleInfo>> recommend(@RequestBody RecommendRequest recommendRequest) {
        perfumeService.getPerfumeRecommend(recommendRequest);
        return null;
    }

// 코드 작성 중
//    @GetMapping
//    public ResponseEntity<PerfumeDetailInfo> getPerfume(long id) {
//    	PerfumeDetailInfo response = perfumeService.getPerfumeDetailInfo(id);
//    	if (response == null) {
//    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 존재하지 않는 id 요청
//		}
//    	return ResponseEntity.status(HttpStatus.OK).body(response);
//    }

}
