package com.osds.peamo.service;

import com.osds.peamo.controller.Oauth2Kakao;
import com.osds.peamo.model.entity.AuthorizationKakao;
import com.osds.peamo.model.entity.User;
import com.osds.peamo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final Oauth2Kakao oauth2Kakao;

    // 카카오로 인증받기
    public void oauth2AuthorizationKakao(String code) throws Exception {
        AuthorizationKakao authorization = oauth2Kakao.callTokenApi(code);
        String userInfoFromKakao = oauth2Kakao.callGetUserByAccessToken(authorization.getAccess_token());
        System.out.println("userInfoFromKakao = " + userInfoFromKakao);
    }
}
