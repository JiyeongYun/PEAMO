import React from 'react';
import './PerfumeNote.css';
// component
import TopMiddleBase from './TopMiddleBase'

function PerfumeNote () {
  return (
    <div className="note">
      <div className="note_title">
        향수의 발향 단계
      </div>
      <div className="note_subtitle">
        향수를 뿌린 후 시간에 따라 Top, Middle, Base 노트 순으로 발향됩니다
      </div>
      <div className="note_content">
        <div className="note_img scroll">
          <img src={'/images/perfumenote.png'} alt={'perfumenote'} />
        </div>
        <div className="note_word scroll">
          <TopMiddleBase></TopMiddleBase>
        </div>
      </div>
    </div>
  )
}

export default PerfumeNote