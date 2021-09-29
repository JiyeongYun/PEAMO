package com.osds.peamo.controller;

import com.osds.peamo.model.network.request.PerfumeListSearch;
import com.osds.peamo.model.network.response.PerfumeListResponse;
import com.osds.peamo.service.PerfumeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/perfume")
@Slf4j
public class PerfumeController {

    private PerfumeService perfumeService;

    @PostMapping("/list")
    public ResponseEntity<List<PerfumeListResponse>> getPerfumes(@RequestBody PerfumeListSearch perfumeSearch, @RequestParam int page) {
    	List<PerfumeListResponse> response = perfumeService.getPerfumeList(perfumeSearch, page);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
