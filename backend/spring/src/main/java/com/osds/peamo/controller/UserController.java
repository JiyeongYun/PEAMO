package com.osds.peamo.controller;

import com.osds.peamo.model.network.response.UserResponse;
import com.osds.peamo.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;



    @GetMapping("/oauth2/authorization/kakao")
    public ResponseEntity<UserResponse> oauth2AuthorizationKakao(@RequestParam String code) throws Exception {
        UserResponse response = userService.oauth2AuthorizationKakao(code);
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
