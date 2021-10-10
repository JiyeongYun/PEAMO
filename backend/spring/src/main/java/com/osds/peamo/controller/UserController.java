package com.osds.peamo.controller;

import com.osds.peamo.model.network.response.MyPageResponse;
import com.osds.peamo.model.network.response.UserResponse;
import com.osds.peamo.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
        if (response == null) return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader Map<String, Object> requestHeader) {
        boolean isPossible = userService.kakaoLogout(requestHeader.get("authorization").toString().split(" ")[1]);
        if (isPossible)
            return new ResponseEntity(HttpStatus.OK);
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/like")
    public ResponseEntity likePerfume(@RequestBody Map<String, String> request) {
        userService.likePerfume(request.get("uid"), Long.parseLong(request.get("perfumeId")));
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/mypage")
    public ResponseEntity<MyPageResponse> getUserInfo(@RequestBody Map<String, String> request) {
        MyPageResponse response = userService.getUserInfo(request.get("uid"));
        if (response == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
