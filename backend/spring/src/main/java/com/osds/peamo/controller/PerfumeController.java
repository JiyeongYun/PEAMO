package com.osds.peamo.controller;

import java.util.List;
import java.util.Map;

import com.osds.peamo.model.network.request.RecommendRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.response.PerfumeDetailInfo;
import com.osds.peamo.model.network.response.PerfumeSimpleInfo;
import com.osds.peamo.service.PerfumeService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/perfume")
@Slf4j
public class PerfumeController {

    private PerfumeService perfumeService;

    // 향수 전체 리스트
    @PostMapping("/list")
    public ResponseEntity<List<PerfumeSimpleInfo>> getPerfumes(@RequestBody PerfumeListSearch perfumeSearch, @RequestParam int page) {
    	List<PerfumeSimpleInfo> response = perfumeService.getPerfumeList(perfumeSearch, page);
    	if (response == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    // 단어로 향수 검색
    @GetMapping("/search")
    public ResponseEntity<List<PerfumeSimpleInfo>> getPerfumes(@RequestParam String word, @RequestParam String uId, @RequestParam int page) {
    	List<PerfumeSimpleInfo> response = perfumeService.getPerfumeList(word, uId, page);
    	if (response == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    

    @PostMapping("/recommend")
    public ResponseEntity<List<PerfumeSimpleInfo>> recommend(@RequestBody RecommendRequest recommendRequest) {
        List<PerfumeSimpleInfo> response = perfumeService.getPerfumeRecommend(recommendRequest);
        if(response == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 향수 상세 정보
    @GetMapping
    public ResponseEntity<PerfumeDetailInfo> getPerfume(@RequestParam long pId, @RequestParam String uId) {
    	PerfumeDetailInfo response = perfumeService.getPerfumeDetailInfo(pId, uId);
    	if (response == null) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 존재하지 않는 id 요청
		}
    	return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    // 이달의 향수
    @GetMapping("/thismonth")
    public ResponseEntity<Map<String, Object>> getMonthPerfume() {
    	Map<String, Object> response = perfumeService.getMonthPerfume();
    	return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
