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
import org.springframework.stereotype.Service;

import java.util.Optional;

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

        User user = convertJsonToObject(userInfoFromKakao);
        if(isInitialLogin(user.getUid())){
            this.userRepository.save(user);
        }
        UserResponse userResponse = new UserResponse(user.getUid(), user.getName());
        return userResponse;
    }

    /**
     * json형태로 된 문자열을 객체 형태로 변환하기
     */
    private User convertJsonToObject(String json) throws ParseException {
        JSONParser p = new JSONParser();
        JSONObject obj = (JSONObject) p.parse(json);

        // uid 추출
        String uid = obj.get("id").toString();
        // nickname 추출
        JSONObject properties = (JSONObject) obj.get("properties");
        String name = properties.get("nickname").toString();

        return User.builder()
                .uid(uid)
                .name(name)
                .build();
    }

    /**
     *
     */
    private boolean isInitialLogin(String uid) {
        Optional<User> user = this.userRepository.findByUid(uid);
        return !user.isPresent();
    }
}
