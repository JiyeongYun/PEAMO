import { useEffect } from 'react'
import './Search.css'

function Search () {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header')
    header.style.backgroundColor = '#1C1C1C'
  }, [])
  // header 검은색으로 변경

  const toggleItems = (e) => {
    const t = e.target
    if (t.classList.contains('gender')) {
      const genders = document.querySelectorAll('.gender')
      genders.forEach(gender => {
        if (gender === t) {
          gender.classList.add("checked")
        } else {
          gender.classList.remove("checked")
        }
      })
    } else if (t.classList.contains('notes')) {
      const notes = document.querySelectorAll('.notes')
      notes.forEach(note => {
        if (note === t) {
          note.classList.add("checked")
        } else {
          note.classList.remove("checked")
        }
      })
    }
  }
  
  return (
    <div className="search_page">
      <div className="sex_category">
        <ul>
          <li className="checked gender" onClick={toggleItems}>#For Her</li>
          <li className="gender" onClick={toggleItems}>#For Unisex</li>
          <li className="gender" onClick={toggleItems}>#For Him</li>
        </ul>
      </div>
      <div className="note_category">
        <ul>
          <li className="checked notes" onClick={toggleItems}>ALL</li>
          <li>|</li>
          <li className="notes" onClick={toggleItems}>FLOWERS</li>
          <li>|</li>
          <li className="notes" onClick={toggleItems}>CITRUS</li>
          <li>|</li>
          <li className="notes" onClick={toggleItems}>FRUITS</li>
          <li>|</li>
          <li className="notes" onClick={toggleItems}>GREENS</li>
          <li>|</li>
          <li className="notes" onClick={toggleItems}>SWEETS</li>
        </ul>
      </div>
    </div>
  )
}

export default Search