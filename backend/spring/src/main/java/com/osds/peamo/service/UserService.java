package com.osds.peamo.service;

import com.osds.peamo.controller.Oauth2Kakao;
import com.osds.peamo.model.entity.AuthorizationKakao;
import com.osds.peamo.model.entity.User;
import com.osds.peamo.model.network.response.UserResponse;
import com.osds.peamo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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

    /**
     * 카카오로 인증받기
     */
    public UserResponse oauth2AuthorizationKakao(String code) throws Exception {
        AuthorizationKakao authorization = oauth2Kakao.callTokenApi(code);
        String userInfoFromKakao = oauth2Kakao.callGetUserByAccessToken(authorization.getAccess_token());
        return convertJsonToObject(userInfoFromKakao);
    }

    private UserResponse convertJsonToObject(String json) throws ParseException {
        JSONParser p = new JSONParser();
        JSONObject obj = (JSONObject)p.parse(json);

        // uid 추출
        String uid = obj.get("id").toString();
        // nickname 추출
        JSONObject properties = (JSONObject)obj.get("properties");
        String name = properties.get("nickname").toString();

        User user = User.builder()
                .uid(uid)
                .username(name)
                .build();
        this.userRepository.save(user);

        UserResponse userResponse = UserResponse.builder()
                .uid(uid)
                .name(name)
                .build();
        return userResponse;
    }
}
