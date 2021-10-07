import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// css
import './PerfumeDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// component
import CloseIcon from '@mui/icons-material/Close';

// library
import axios from '../Common/http-common';

// action
import { getMyPerfume } from '../MypageComponents/mypageSlice';

function PerfumeDetail({ togglePerfumeDetail, extra = 'default' }) {
  const dispatch = useDispatch();
  const perfume = useSelector((state) => state.common.currentPerfume);
  const [isSpring, setIsSpring] = useState(false);
  const [isSummer, setIsSummer] = useState(false);
  const [isFall, setIsFall] = useState(false);
  const [isWinter, setIsWinter] = useState(false);
  const [gender, setGender] = useState(null);
  const [noteTableData, setNoteTableData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [similar, setSimilar] = useState([]);

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

  // mypage에서 향수 상세 모달을 켜서 좋아요를 눌렀을 때 실행시킬 나의 향수 업데이트 함수
  const updateMyPerfume = () => {
    if (extra === 'mypage') {
      dispatch(getMyPerfume());
    }
  };

  // 좋아요 토글 함수
  const likeToggle = async (perfumeId) => {
    const uid = localStorage.getItem('userId');
    if (uid) {
      try {
        await axios
          .post('/user/like', {
            uid,
            perfumeId,
          })
          .then(() => {
            setIsLiked(!isLiked);
            dispatch(updateMyPerfume());
          });
      } catch (err) {}
    } else {
      alert('로그인이 필요한 작업입니다');
    }
  };

  useEffect(() => {
    checkSeasons(perfume.perfumeDetailInfo.seasons);
    checkGender(perfume.perfumeDetailInfo.gender);
    setNoteTableData(makeNoteTableData(perfume.perfumeDetailInfo.notesTMB));
    setIsLiked(perfume.perfumeDetailInfo.perfumeSimpleInfo.like);
    setSimilar(perfume.twoSimilarPerfumeSimpleInfos);
  }, [
    perfume.perfumeDetailInfo.seasons,
    perfume.perfumeDetailInfo.gender,
    perfume.perfumeDetailInfo.perfumeSimpleInfo.like,
    perfume.twoSimilarPerfumeSimpleInfos,
    perfume.perfumeDetailInfo.notesTMB,
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
              onClick={() =>
                likeToggle(perfume.perfumeDetailInfo.perfumeSimpleInfo.id)
              }
            />
            <img
              src={perfume.perfumeDetailInfo.perfumeSimpleInfo.imgurl}
              className="detail_info1_image"
              alt="perfumeImage"
            />
            <div className="detail_info1_title">Brand</div>
            <div className="detail_info1_content">
              {perfume.perfumeDetailInfo.perfumeSimpleInfo.brand}
            </div>
            <div className="detail_info1_title">Name</div>
            <div className="detail_info1_content">
              {perfume.perfumeDetailInfo.perfumeSimpleInfo.name}
            </div>
          </div>
          <div className="detail_info2">
            <div className="detail_info2_title">
              <p>
                {perfume.perfumeDetailInfo.categoryNameList.map(
                  (category, index) => {
                    if (
                      index !==
                      perfume.perfumeDetailInfo.categoryNameList.length - 1
                    ) {
                      return `${category} /`;
                    }
                    return ` ${category}`;
                  }
                )}
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
            <hr />
            <p className="similar_title">유사한 향수</p>
            <div className="similar_perfumes">
              {similar.length === 0 ? (
                <p>비슷한 향수를 찾을 수 없어요!</p>
              ) : (
                similar.map((per) => {
                  return (
                    <div className="similar_perfume" key={per.id}>
                      <img
                        src={
                          per.imgurl ===
                            'http://www.basenotes.net/photos/300noimage.png' ||
                          per.imgurl === undefined
                            ? '/images/no_image.png'
                            : per.imgurl
                        }
                        alt={per.name}
                      />
                      <p>{per.name}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfumeDetail;
