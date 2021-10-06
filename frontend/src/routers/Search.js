import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// css
import './Search.css';

// library
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// component
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchCard from '../components/SearchComponents/SearchCard';
import Grid from '@material-ui/core/Grid';
import PerfumeDetail from '../components/Common/PerfumeDetail';

// action
import { getPerfumeDetail } from '../components/Common/commonSlice';

function Search() {
  const [items, setItems] = useState([]);
  const [axiosGenderData, setAxiosGenderData] = useState(2);
  const [axiosCateData, setAxiosCateData] = useState(3);
  const [noMore, setNoMore] = useState(false);
  const [page, setPage] = useState(0);
  // 향수 디테일 모달 state
  const [showPerfumeDetail, setShowPerfumeDetail] = useState(false);
  // useDispatch
  const dispatch = useDispatch();

  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

  // 페이지 새로고침 한 경우 scroll 위로 이동
  window.scrollTo(0, 0);
  // scroll 위로 이동 끝

  const loadMoreData = () => {
    setPage(page + 1);
    axiosStart();
  };

  // search page 들어오자마자 기본 값인 her, all 향수 정보 axios 요청
  const axiosStart = () => {
    const axiosUserId = localStorage.getItem('userId');
    axios
      .post(`http://j5a403.p.ssafy.io:8000/perfume/list?page=${page}`, {
        gender: axiosGenderData,
        category: axiosCateData,
        uid: axiosUserId,
      })
      .then((res) => {
        if (res.status === 200 && page === 0) {
          setItems(res.data);
          setNoMore(true);
        } else if (res.status === 200 && page !== 0) {
          let temp = Object.assign([], items);
          if (items.length === page * 30) {
            temp = temp.concat(res.data);
            setItems(temp);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosStart();
  }, [axiosGenderData, axiosCateData, page]);

  const toggleItems = (n, e) => {
    setPage(0);
    const t = e.target;
    if (n < 3) {
      setAxiosGenderData(n);
    } else {
      setAxiosCateData(n);
    }
    if (t.classList.contains('gender')) {
      const genders = document.querySelectorAll('.gender');
      genders.forEach((gender) => {
        if (gender === t) {
          gender.classList.add('checked');
        } else {
          gender.classList.remove('checked');
        }
      });
    } else if (t.classList.contains('notes')) {
      const notes = document.querySelectorAll('.notes');
      notes.forEach((note) => {
        if (note === t) {
          note.classList.add('checked');
        } else {
          note.classList.remove('checked');
        }
      });
    }
  };

  // 향수 디테일 모달 열고 닫는 함수
  const togglePerfumeDetail = (perfumeId) => {
    if (!showPerfumeDetail) {
      // 향수 디테일 api 통신
      dispatch(getPerfumeDetail(perfumeId))
        .unwrap()
        .then(() => {
          setShowPerfumeDetail(!showPerfumeDetail);
        });
    } else {
      setShowPerfumeDetail(!showPerfumeDetail);
    }
  };

  return (
    <div className="search_page">
      {showPerfumeDetail && (
        <PerfumeDetail togglePerfumeDetail={togglePerfumeDetail} />
      )}
      <div id="top"></div>
      <a href="#top">
        <FontAwesomeIcon className="up_icon" icon={faAngleDoubleUp} size="3x" />
      </a>
      <div className="sex_category">
        <ul>
          <li
            className="checked gender"
            onClick={(e) => {
              toggleItems(2, e);
            }}
          >
            #For Her
          </li>
          <li
            className="gender"
            onClick={(e) => {
              toggleItems(1, e);
            }}
          >
            #For Him
          </li>
          <li
            className="gender"
            onClick={(e) => {
              toggleItems(0, e);
            }}
          >
            #For Unisex
          </li>
        </ul>
      </div>
      <div className="note_category">
        <ul>
          <li
            className="checked notes"
            onClick={(e) => {
              toggleItems(3, e);
            }}
          >
            ALL
          </li>
          <li>|</li>
          <li
            className="notes"
            onClick={(e) => {
              toggleItems(4, e);
            }}
          >
            FLOWERS
          </li>
          <li>|</li>
          <li
            className="notes"
            onClick={(e) => {
              toggleItems(5, e);
            }}
          >
            CITRUS
          </li>
          <li>|</li>
          <li
            className="notes"
            onClick={(e) => {
              toggleItems(6, e);
            }}
          >
            FRUITS
          </li>
          <li>|</li>
          <li
            className="notes"
            onClick={(e) => {
              toggleItems(7, e);
            }}
          >
            GREENS
          </li>
          <li>|</li>
          <li
            className="notes"
            onClick={(e) => {
              toggleItems(8, e);
            }}
          >
            SWEETS
          </li>
        </ul>
      </div>
      <div className="search_card">
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={loadMoreData}
          hasMore={noMore}
          loader={
            <h4 style={{ textAlign: 'center' }}>
              스크롤을 내리면 더 많은 향수를 볼 수 있습니다.
            </h4>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid container spacing={3}>
            {items.map((item) => {
              return (
                <Grid
                  key={item.id}
                  item
                  md={4}
                  sm={6}
                  xs={12}
                  onClick={() => togglePerfumeDetail(item.id)}
                  className="perfume_card"
                >
                  <SearchCard
                    imgurl={
                      item.imgurl ===
                        'http://www.basenotes.net/photos/300noimage.png' ||
                      item.imgurl === undefined
                        ? '/images/no_image.png'
                        : item.imgurl
                    }
                    brand={item.brand}
                    name={item.name}
                    id={item.id}
                  ></SearchCard>
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Search;
