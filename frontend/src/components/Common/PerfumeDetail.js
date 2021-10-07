import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// css
import './PerfumeDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// component
import CloseIcon from '@mui/icons-material/Close';

// library
import axios from '../Common/http-common';

function PerfumeDetail({ togglePerfumeDetail }) {
  const perfume = useSelector((state) => state.common.currentPerfume);
  const [isSpring, setIsSpring] = useState(false);
  const [isSummer, setIsSummer] = useState(false);
  const [isFall, setIsFall] = useState(false);
  const [isWinter, setIsWinter] = useState(false);
  const [gender, setGender] = useState(null);
  const [noteTableData, setNoteTableData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

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

  // 성별 파악하는 함수
  const checkGender = (g) => {
    if (g === 0) {
      setGender('Unisex');
    } else if (g === 1) {
      setGender('Him');
    } else if (g === 2) {
      setGender('Her');
    }
  };

  // top, middle, base 노트 테이블 자료 만드는 함수
  const makeNoteTableData = (notes) => {
    const maxLength = Object.values(notes)
      .map((note) => note.length)
      .reduce((a, b) => Math.max(a, b));
    const data = [];
    for (let i = 0; i < maxLength; i++) {
      let top = notes.topNote[i] ? notes.topNote[i] : '';
      let middle = notes.middleNote[i] ? notes.middleNote[i] : '';
      let base = notes.baseNote[i] ? notes.baseNote[i] : '';
      data.push([top, middle, base]);
    }
    return data;
  };

  // 좋아요 토글 함수
  const likeToggle = async (perfumeId) => {
    const uid = localStorage.getItem('userId');
    try {
      await axios
        .post('/user/like', {
          uid,
          perfumeId,
        })
        .then(() => {
          setIsLiked(!isLiked);
        });
    } catch (error) {
      alert('통신불가');
    }
  };

  useEffect(() => {
    checkSeasons(perfume.seasons);
    checkGender(perfume.gender);
    setNoteTableData(makeNoteTableData(perfume.notesTMB));
    setIsLiked(perfume.perfumeSimpleInfo.like);
  }, [
    perfume.seasons,
    perfume.gender,
    perfume.notesTMB,
    perfume.perfumeSimpleInfo.like,
  ]);

  return (
    <div className="perfume_detail_container">
      <div className="perfume_detail_box">
        <CloseIcon
          className="close_icon"
          onClick={() => closePerfumeDetail()}
        />

        <div className="detail_wrapper">
          <div className="detail_info1">
            <FontAwesomeIcon
              className={
                isLiked ? 'detail_info1_icon icon_active' : 'detail_info1_icon'
              }
              icon={faHeart}
              onClick={() => likeToggle(perfume.perfumeSimpleInfo.id)}
            />
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
              <p>
                {perfume.categoryNameList.map((category, index) => {
                  if (index !== perfume.categoryNameList.length - 1) {
                    return `${category} /`;
                  }
                  return ` ${category}`;
                })}
              </p>
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
                {noteTableData.map((tableData) => {
                  return (
                    <tr>
                      {tableData.map((data) => {
                        return <td>{data}</td>;
                      })}
                    </tr>
                  );
                })}
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
