import React from 'react';
import './PerfumeNote.css';
// component
import TopMiddleBase from './TopMiddleBase'

function PerfumeNote () {
  return (
    <div className="note">
      <div className="note_img">
        <img src={'/images/perfumenote.png'} alt={'perfumenote'} />
      </div>
      <div className="note_word">
        <TopMiddleBase></TopMiddleBase>
      </div>
    </div>
  )
}

export default PerfumeNote