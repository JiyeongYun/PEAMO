package com.osds.peamo.service;

import com.osds.peamo.controller.Oauth2Kakao;
import com.osds.peamo.model.entity.AuthorizationKakao;
import com.osds.peamo.model.entity.Perfume;
import com.osds.peamo.model.entity.User;
import com.osds.peamo.model.entity.UserPerfumeList;
import com.osds.peamo.model.network.response.MyPageResponse;
import com.osds.peamo.model.network.response.UserResponse;
import com.osds.peamo.repository.PerfumeRepository;
import com.osds.peamo.repository.UserPerfumeListRepository;
import com.osds.peamo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PerfumeRepository perfumeRepository;

    @Autowired
    private UserPerfumeListRepository userPerfumeListRepository;


    private final Oauth2Kakao oauth2Kakao;

    /**
     * 카카오 인증 메서드
     */
    public UserResponse oauth2AuthorizationKakao(String code) throws Exception {

        // 1. 권한 받아오기
        AuthorizationKakao authorization = oauth2Kakao.callTokenApi(code);

        // 2. access token 발급받아 사용자 정보 가져오기
        String userInfoFromKakao = oauth2Kakao.callGetUserByAccessToken(authorization.getAccess_token());

        // 3. json 형태로 된 문자열을 객체 형태로 변환
        User user = convertJsonToObject(userInfoFromKakao);

        // 4. 최초로그인인 경우 DB 저장
        if (isInitialLogin(user.getUid())) {
            this.userRepository.save(user);
        }

        // 5. User 객체에서 UserResponse 객체로 변환 후 반환
        UserResponse userResponse = new UserResponse(user.getUid(), user.getName(), authorization.getAccess_token());
        return userResponse;
    }

    /**
     * 카카오 로그아웃
     */
    public boolean kakaoLogout(String accessToken){
        int responseCode = oauth2Kakao.kakaoLogout(accessToken);
        if(responseCode == 200){
            return true;
        } return false;
    }

    /**
     * 향수 좋아요 및 좋아요 취소 메서드
     */
    public void likePerfume(String uid, long perfumeId){

        // uid값으로 user 정보 가져오기
        Optional<User> user = this.userRepository.findByUid(uid);

        if(user.isPresent()){
            long userId = user.get().getId();
            Perfume perfume = this.perfumeRepository.getPerfumeById(perfumeId);

            long userPerfumeId = isLikePerfume(userId, perfumeId);
            if(userPerfumeId != -1){   // 유저가 해당 향수를 좋아요한 경우
                // remove
                this.userPerfumeListRepository.deleteById(userPerfumeId);
                if(perfume.getGoodCnt() > 0)
                    perfume.setGoodCnt(perfume.getGoodCnt() - 1);
            } else{
                // add
                this.userPerfumeListRepository.save(UserPerfumeList.builder().perfumeId(perfumeId).userId(userId).build());
                perfume.setGoodCnt(perfume.getGoodCnt() + 1);
            }
            this.perfumeRepository.save(perfume);
        }
    }

    /**
     * 유저가 해당 향수를 좋아요했는지에 대한 여부를 반환해주는 메서드
     */
    public long isLikePerfume(long userId, long perfumeId){
        Optional<UserPerfumeList> userPerfumeList = this.userPerfumeListRepository.getUserPerfumeListByPerfumeIdAndUserId(perfumeId, userId);
        if(userPerfumeList.isPresent())     // 좋아요 O
            return userPerfumeList.get().getId();
        return -1;                          // 좋아요 X
    }


    /**
     * 마이페이지 정보 가져오기
     */
    public MyPageResponse getUserInfo(String id){

        // uid값으로 user 정보 가져오기
        Optional<User> user = userRepository.findByUid(id);

        // user 정보가 존재하는 경우 유저가 좋아요한 향수 정보 가져오기
        if(user.isPresent()){

            String uid = user.get().getUid();
            String name = user.get().getName();
            ArrayList<UserPerfumeList> userPerfumeList = userPerfumeListRepository.getUserPerfumeListsByUserId(user.get().getId());
            ArrayList<Perfume> perfumeList = new ArrayList<>();

            for(UserPerfumeList obj : userPerfumeList){
                Perfume perfume = perfumeRepository.getPerfumeById(obj.getPerfumeId());
                if(perfume != null)
                    perfumeList.add(perfume);
            }

            MyPageResponse myPageResponse = MyPageResponse.builder()
                    .uid(uid)
                    .name(name)
                    .perfumeList(perfumeList)
                    .build();
            return myPageResponse;
        }
        return null;
    }

    /**
     * 객체 형태로 변환 메서드
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
     * 최초로그인 확인 메서드
     */
    private boolean isInitialLogin(String uid) {
        Optional<User> user = this.userRepository.findByUid(uid);
        return !user.isPresent();
    }

}
