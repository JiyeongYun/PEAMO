import './About.css'
import PerfumeKind from '../components/PerfumeKind'

function About() {
  return (
    <div className="about">
      <img src={'/images/about.jpg'} alt={'about'} />
      <div class="navbar"></div>
      <div className="perfume_kind">
        <div className="kind_name">
          향수의 종류
        </div>
        <div class="kind_table">
          <PerfumeKind></PerfumeKind>
        </div>
      </div>
    </div>
  )
}

export default About