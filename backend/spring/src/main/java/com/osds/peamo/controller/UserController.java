package com.osds.peamo.controller;

import com.osds.peamo.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    private UserService userService;

    @GetMapping("/oauth2/authorization/kakao")
    public void oauth2AuthorizationKakao(@RequestParam("code") String code) throws Exception {
        userService.oauth2AuthorizationKakao(code);
    }

//    public String CLIENT_ID = "112b52a3500fcf54baac18976074af45";
//    private AuthenticationManager authenticationManager;
//
//    @GetMapping("/auth/kakao/callback") // 이쪽으로 카카오 로그인을 받을 것이다.
//    public String kakaoCallback(String code) { // code값은 카카오에서 주는 것 => 이 코드가 인증code이다.
//
//        // 인증code를 통해 사용자 토큰을 받는 과정이다.
//
//        RestTemplate rt = new RestTemplate();  // RestTemplate를 쓰면 Http 요청이 편해진다.
//
//        // HttpHeader 오브젝트 생성
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // HttpBody 오브젝트 생성
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code"); // 보통 value값은 변수화시켜서 사용해야한다.
//        params.add("client_id", CLIENT_ID);
//        params.add("redirect_uri", "http://localhost:8080/auth/kakao/callback");
//        params.add("code", code);
//
//        // HttpHeader와 HttpBody를  ★★★하나의 오브젝트에 담기★★★
//        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
//
//
//        // HTTP 요청하기 - response변수의 응답 받음
//        ResponseEntity<String> response = rt.exchange(
//                "https://kauth.kakao.com/oauth/token",  // 토큰 발급 요청 주소
//                HttpMethod.POST, // Http 메소드 방식
//                kakaoTokenRequest, // HTTP 바디에 들어갈 데이터와 헤더값
//                String.class // 응답 받을 데이터 타입
//        );
//
//
//        // ReqUserToken (카카오에서 받은 사용자 토큰) 데이터 처리
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        ReqUserToken oauthToken = null;
//
//        try {
//            oauthToken = objectMapper.readValue(response.getBody(), ReqUserToken.class);
//        } catch (JsonMappingException e) {
//            e.printStackTrace();
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        System.out.println("카카오에서 받은 액세스 토큰 == : " + oauthToken.getAccess_token());
//
//        /*-------------------------------------------------------------------*/
//
//        // rt2는 카카오에서 받은 액세스 토큰을 사용해서 사용자 정보(카카오 리소스에 접근)를 조회하는 것.
//
//        RestTemplate rt2 = new RestTemplate();
//
//        // HttpHeader 오브젝트 생성
//        HttpHeaders headers2 = new HttpHeaders();
//        headers2.add("Authorization", "Bearer " + oauthToken.getAccess_token());
//        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // HttpHeader를 객체에 담아주자.
//        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest2 = new HttpEntity<>(headers2);
//
//
//        // HTTP 요청하기 - response변수의 응답 받음
//        ResponseEntity<String> response2 = rt2.exchange(
//                "https://kapi.kakao.com/v2/user/me",  // 토큰 발급 요청 주소
//                HttpMethod.POST, // Http 메소드 방식
//                kakaoProfileRequest2, // HTTP 바디에 들어갈 데이터와 헤더값
//                String.class // 응답 받을 데이터 타입
//        );
//
//        // => 여기까지 만들고 return을 한 번 받은 다음에,
//        // 그 데이터들을 jsonschema2pojo 사이트를 이용해서 model의 KakaoProfile로 만들자.
//        // 카멜 표기법으로 나오는데, 이거를 다 언더스코프로 바꿔줘야 하니 주의해야 한다.
//
//
//        // 그리고 이제 KakaoProfile에 집어넣을 것이다.
//        ObjectMapper objectMapper2 = new ObjectMapper();
//        KakaoProfile kakaoProfile = null;
//
//        try {
//            kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
//        } catch (JsonMappingException e) {
//            e.printStackTrace();
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//
////        System.out.println("카카오 아이디 번호" + kakaoProfile.getId());
////        System.out.println("카카오 이메일" + kakaoProfile.getKakao_account().getEmail());
//
//        // 카카오 유저 아이디 생성하기
////        System.out.println("카카오로 로그인한 블로그 유저 아이디: " + kakaoProfile.getKakao_account().getEmail() + "_" + kakaoProfile.getId());
////        System.out.println("카카오로 로그인한 블로그 유저 이메일: " + kakaoProfile.getKakao_account().getEmail());
////        System.out.println("카카오로 로그인한 블로그 유저 패스워드: " + garbagePassword);
//
//        // 데이터가없어도 Entity() 가 만들어지는게 문제 1.
//        // 제공하는 메소드안에서 Exception처리 힘들다.
//
//        /**
//         * 여기서부터 잠시 주석
//         */
////        User kakaoUser = User.builder()
////                .username(kakaoProfile.getKakao_account().getEmail() + "_" + kakaoProfile.getId())
////                .password(hoonKey)
////                .email(kakaoProfile.getKakao_account().getEmail())
////                .oauth("kakao")
////                .build();
////
////        // 기존 가입자인지 아닌지 확인해서 처리한다.
////        User originUser = userService.findUser(kakaoUser.getUsername());
////
////        // 비가입자일 경우 - 가입을 시킨 다음에 로그인 처리
////        if(originUser.getUsername() == null){
////            userService.join(kakaoUser);
////        }
//        /**
//         * 여기까지 =======================
//         */
//        System.out.println("============================일단?");
//
//        /**
//         * 여기서부터 새로 추가
//         */
//        User kakaoUser = User.builder()
//                .uid(kakaoProfile.getId().toString())
//                .username(kakaoProfile.getKakao_account().getEmail() + "_" + kakaoProfile.getId())
//                .build()
//                ;
//
//        // 기존 가입자인지 아닌지 확인해서 처리한다.
//        User originUser = userService.findUser(kakaoUser.getUsername());
//
//        // 비가입자일 경우 - 가입을 시킨 다음에 로그인 처리
//        if(originUser.getUsername()== null){
//            userService.join(kakaoUser);
//        }
//        /**
//         * 여기까지 =======================
//         */
//
//
//        // 기존 회원일 경우 그냥 로그인 처리
//        Authentication authentication = authenticationManager
//                .authenticate(new UsernamePasswordAuthenticationToken(kakaoUser.getUid(), "peamo123"));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        System.out.println("response2의 값은 : " + response2.getBody());
//        System.out.println("카카오 인증 완료-code 값은 : "+code);
//        System.out.println("response.getBody의 값은: "+response.getBody());
//
//        return "redirect:/";
//    }
}
