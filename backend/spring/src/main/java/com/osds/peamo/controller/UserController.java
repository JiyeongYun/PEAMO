package com.osds.peamo.controller;

import com.osds.peamo.model.network.response.UserResponse;
import com.osds.peamo.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
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
//        MultiValueMap accessToken = new LinkedMultiValueMap<>();
//        accessToken.add("AccessToken", response.getAccess_token());
//        response.setAccess_token(null);
//        return new ResponseEntity(response, accessToken, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader Map<String, Object> requestHeader) {
        boolean isPossible = userService.kakaoLogout(requestHeader.get("authorization").toString().split(" ")[1]);
        if(isPossible){
            return new ResponseEntity(HttpStatus.OK);
        } else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }


}
