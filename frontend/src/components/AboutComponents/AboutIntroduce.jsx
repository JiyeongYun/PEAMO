import './AboutIntroduce.css';
import React from 'react';
// import $ from 'jquery';

function AboutIntroduce () {
  return (
    <div className="aboutintro">
      <div className="intro_img">
        <img src={'/images/logo_black.png'} alt={'logo'} />
      </div>
      <div className="intro_content">
        <p>PE' AMO STORY</p>
        <br></br>
        <p>-</p>
        <br></br>
        <p>오늘 당신은 어떤 향기를 입고 있나요</p>
        <br></br>
        <p>당신의 일부가 되는 최적의 향수를 찾는 일,</p>
        <p>그것이 PE' AMO가 존재하는 이유입니다.</p>
      </div>
      <div className="intro_bottom">
        <div className="intro_btn">
          <p>더 알아보기</p>
        </div>
      </div>
    </div>
  )
}

export default AboutIntroduce 