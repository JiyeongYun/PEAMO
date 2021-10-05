import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// css
import './PerfumeDetail.css';
// component
import CloseIcon from '@mui/icons-material/Close';

function PerfumeDetail({ togglePerfumeDetail }) {
  const perfume = useSelector((state) => state.common.currentPerfume);
  const [isSpring, setIsSpring] = useState(false);
  const [isSummer, setIsSummer] = useState(false);
  const [isFall, setIsFall] = useState(false);
  const [isWinter, setIsWinter] = useState(false);
  const [gender, setGender] = useState(null);

  const closePerfumeDetail = () => {
    togglePerfumeDetail();
  };

  // 계절 여부 파악하는 함수
  const checkSeasons = (seasons) => {
    seasons.forEach((season) => {
      if (season === 1) {
        setIsSpring(true);
      } else if (season === 2) {
        setIsSummer(true);
      } else if (season === 3) {
        setIsFall(true);
      } else if (season === 4) {
        setIsWinter(true);
      }
    });
  };

  const checkGender = (g) => {
    if (g === 0) {
      setGender('Unisex');
    } else if (g === 1) {
      setGender('Him');
    } else if (g === 2) {
      setGender('Her');
    }
  };

  useEffect(() => {
    checkSeasons(perfume.seasons);
    checkGender(perfume.gender);
  }, [perfume.seasons, perfume.gender]);

  return (
    <div className="perfume_detail_container">
      <div className="perfume_detail_box">
        <CloseIcon
          className="close_icon"
          onClick={() => closePerfumeDetail()}
        />
        <div className="detail_wrapper">
          <div className="detail_info1">
            <img
              src={perfume.perfumeSimpleInfo.imgurl}
              className="detail_info1_image"
              alt="perfumeImage"
            />
            <div className="detail_info1_title">Name</div>
            <div className="detail_info1_content">
              {perfume.perfumeSimpleInfo.name}
            </div>
            <div className="detail_info1_title">Brand</div>
            <div className="detail_info1_content">
              {perfume.perfumeSimpleInfo.brand}
            </div>
          </div>
          <div className="detail_info2">
            <div className="detail_info2_title">
              <p>{perfume.categoryNameList}</p>
              <p>For {gender}</p>
            </div>
            <table className="detail_info2_table">
              <thead>
                <tr>
                  <th>TOP</th>
                  <th>MIDDLE</th>
                  <th>BOTTOM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mandarine</td>
                  <td>Rose</td>
                  <td>Woody</td>
                </tr>
                <tr>
                  <td>Orange</td>
                  <td>Musk</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Rose</td>
                </tr>
              </tbody>
            </table>
            <div className="detail_info2_seasons">
              <img
                src="/images/spring.png"
                alt="spring"
                className={isSpring ? 'season_active' : null}
              ></img>
              <img
                src="/images/summer.png"
                alt="summer"
                className={isSummer ? 'season_active' : null}
              ></img>
              <img
                src="/images/fall.png"
                alt="fall"
                className={isFall ? 'season_active' : null}
              ></img>
              <img
                src="/images/winter.png"
                alt="winter"
                className={isWinter ? 'season_active' : null}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfumeDetail;
