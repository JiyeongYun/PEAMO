import { useState } from "react"
import "./SelectGuide.css"
// components
import Style from "./Style"
import Season from "./Season"
import Situation from "./Situation"

function SelectGuide() {
  // useState
  const [selected, setSelected] = useState("style")

  // 보여줄 사진을 바꾸는 함수
  const toggleSelected = (e) => {
    const {target : {className}} = e
    const prev = document.querySelector(`.${selected}`)
    const now = document.querySelector(`.${className}`)
    if (now) {
      prev.classList.remove('checked')
      now.classList.add('checked')
      setSelected(className)
    }
  }

  return (
    <div className="select_guide">
      <div className="guide_name scroll">향수 선택 가이드</div>
      <div className="selection scroll">
        <p className="style checked" onClick={toggleSelected}>#Style</p>
        <p className="season" onClick={toggleSelected}>#Season</p>
        <p className="situation" onClick={toggleSelected}>#Situation</p>
      </div>
      {selected==="style"&&<Style />}
      {selected==="season"&&<Season />}
      {selected==="situation"&&<Situation />}
    </div>
  )
}

export default SelectGuide