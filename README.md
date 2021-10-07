<img src="https://user-images.githubusercontent.com/57614563/135024260-2559c6a8-7dd2-4e5e-950c-c5595c6af3f8.png">

# PE' AMO [ 당신의 취향을 찾아드립니다 ]

> *Pe*rfume(향수) 과 TI *Amo*(사랑해) 의 결합
>
> 빅데이터 기반 향수 추천 사이트



[TOC]

## 0. 팀소개

![members](README.assets/members.png)

- 권오우 : 빅데이터 추천 알고리즘 구현 / 프론트엔드 teller 페이지 구현
- 서예리 : 프론트엔드 main, search, about 페이지 구현
- 송상민 :  프론트엔드 login, error, loading 페이지 구현
- 신지수 : 
- 윤지영 : 
- 장현웅 : 빅데이터 추천 알고리즘 구현

## 1. 서비스 소개

> 빅데이터를 기반으로 향수를 추천해주는 사이트

### 1.1 기획 배경

코로나로 인한 정부 방역지침에 따라 백화점에서는 시식, 시음, 시향 등을 금지했으며, 이에 따라 화장품 매출은 감소했지만 향수 매출은 오히려 늘어났다. 업계에서는 화장 대신 자신을 표현할 수 있는 수단으로 향수가 각광받고 있는 것으로 보고 있다. 이러한 흐름에 발 맞추어 사용자에게 어울리는 향수를 추천해주는 사이트의 필요성을 느끼고 PE' AMO 프로젝트를 기획하게 되었다.

 

### 1.2 주요 타겟

#### 1.2.1 향수에 대해 잘 모르는 사회 초년생

- 향수를 처음 구매하려는 사회 초년생에게는 많은 진입 장벽이 있다. 우리 사이트에서는 이런 진입 장벽을 허물고 간단한 질문을 통해 사용자의 선호도를 파악하고 그에 맞는 향수를 추천해준다.

#### 1.2.2 본인이 사용했던 향수와 비슷한 향을 찾는 구매자

- 향수는 같은 향을 낸다고 하더라도 포함된 노트들에 따라 전혀 다른 향기가 난다. 이런 문제로 고민을 하는 구매자들에게 자신이 사용했던 향수를 검색하면 그 향수와 가장 비슷한 향수를 찾아서 추천해준다.

  

### 1.3 주요 기능

#### 1.3.1 취'향' 찾기

![image-20211007104315204](README.assets/image-20211007104315204.png)

- 향수를 처음 접하는 사용자들 위한 향수 추천 기능으로 총 3가지의 향수를 추천하여 준다.
- 6개의 간단한 질문을 통해 필터링된 향수들 중 '좋아요' 수가 가장 높은 향수 하나를 뽑아낸 후, 이 향수와 가장 유사도가 높은 향수 2개를 CBF(Content Based Filtering) 추천 알고리즘을 이용하여 추출한다. 이렇게 선택된 3개의 향수를 사용자에게 어울리는 향수로 추천하여 준다.

#### 1.3.2 향수 검색

![image-20211007105344464](README.assets/image-20211007105344464.png)

- 이미 사용하고 있는 향수가 있고 기존 사용한 향수와 유사한 향수를 찾고 싶은 사용자를 위한 기능이다.
- 약 40,000 개의 향수를 검색 및 상세 정보를 확인할 수 있다.
- 향수 이름으로 검색을 하면 해당 향수를 찾을 수 있고, 이미지를 클릭 시 해당 향수의 상세 모달 창이 뜨게 된다. 이 모달 창에서 향수의 상세 정보(note 정보, 성별 등)와 함께 CBF(Content Based Filtering) 추천 알고리즘을 이용하여 이 향수와 유사도가 가장 높은 2개의 향수를 보여준다.



## 2. 기술스택

### 2.1 백엔드

- Spring Boot
- My SQL

- Amazon RDS

### 2.2 프론트엔드

- React.js
- Redux
- Material UI



### 2.3 데이터 수집 및 처리



### 2.4 배포

- AWS EC2

- Jenkins

- Docker

### 2.5 협업 Tool

- Git

- Notion

- Jira



<h3>추천 알고리즘</h3>



-----

<img src="https://user-images.githubusercontent.com/57614563/135027522-cbec6f62-beb1-413b-a95f-87c01513de18.PNG" width="500">

<br>



✔ **컨텐츠 기반 필터링**

<img src="https://user-images.githubusercontent.com/57614563/135040061-f6cb0642-c492-437c-98be-ea4f0521d202.jpg" width="400">

<br>

- 추천의 대상이 되는 아이템과 사용자에 대한 이해를 바탕으로 추천하는 방식
- **각 아이템들에 대한 특성**들을 벡터로 뽑아내고 **사용자의 선호 특성**들을 벡터로 뽑아내 두 벡터간의 연산을 통해 추천하는 방식



**👍 장점**

1. 다른 유저의 데이터가 필요없음
2. 개인의 취향을 고려한 추천이 가능

**👎 단점** : 처음 유입된 유저에 대해서는 추천할 수 없음



<h3>개발기간</h3>

-----

2021.08.30(월) ~ 2021.10.08(금)





<h3>기술 스택</h3>

----

**1. 데이터 수집**

> 웹 스크래핑을 통해 필요한 데이터들을 가져와 가공 및 DB 저장

- Java
- Jsoup
- Python
- Pandas
- pymysql
- sqlalchemy



**2. 프론트엔드**

- React.js

<img src="https://user-images.githubusercontent.com/57614563/135031623-5d3a5829-1cf0-4e65-9b3c-2e988a26babf.PNG" width="200">

<br>



**3. 백엔드**

- Django

<img src="https://user-images.githubusercontent.com/57614563/135032052-cc8cc168-af6e-4d42-af31-581b235054de.PNG" width="150">

<br>

- Spring Boot

<img src="https://user-images.githubusercontent.com/57614563/135031884-422c259d-a86a-48da-a14c-f202aef09eeb.PNG" width="200">

<br>

- MySQL

<img src="https://user-images.githubusercontent.com/57614563/135032332-ae5d9f35-24ce-4453-a255-3b177c2ff5ea.PNG" width="180">

<br>

- AWS RDS

<img src="https://user-images.githubusercontent.com/57614563/135032166-90fe7f8c-0353-4609-a572-9db1dd69e08e.PNG" width="180">

<br>





<h3>Developer</h3>

------

<img src="https://user-images.githubusercontent.com/57614563/135023758-193c4aef-7a3e-4c87-a77e-85ad7d983908.png" width="600">

