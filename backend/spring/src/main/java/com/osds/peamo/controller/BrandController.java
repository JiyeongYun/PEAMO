package com.osds.peamo.controller;

import com.osds.peamo.model.entity.Brand;
import com.osds.peamo.service.BrandService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/brand")
@Slf4j
public class BrandController {

    private BrandService brandService;

    @GetMapping("/list")
    public ResponseEntity<ArrayList<Brand>> getBrandList() {
        ArrayList<Brand> response = brandService.getBrandList();
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<Brand> getBrand(@RequestParam String id) {
        Brand response = brandService.getBrand(Long.parseLong(id));
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
