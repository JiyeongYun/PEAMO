import './About.css'
import PerfumeKind from '../components/AboutComponents/PerfumeKind'
import SelectGuide from '../components/AboutComponents/SelectGuide'
import PerfumeNote from '../components/AboutComponents/PerfumeNote'

function About() {
  return (
    <div className="about">
      <div class="navbar"></div>
      <div className="perfume_kind">
      <img src={'/images/about.jpg'} alt={'about'} />
        <div className="kind_name">
          향수의 종류
        </div>
        <div className="kind_table">
          <PerfumeKind></PerfumeKind>
        </div>
      </div>
      <div className="perfume_select">
        <SelectGuide></SelectGuide>
      </div>
      <div className="perfume_note">
        <PerfumeNote></PerfumeNote>
      </div>
    </div>
  )
}

export default About