import { useEffect, useState } from 'react'
import './Search.css'
import axios from 'axios'
import SearchCard from '../components/SearchComponents/SearchCard'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroll-component'

function Search () {
  const [items, setItems] = useState([])
  const [axiosGenderData, setAxiosGenderData] = useState(2)
  const [axiosCateData, setAxiosCateData] = useState([4])
  const [page, setPage] = useState(0)
  const [noMore, setnoMore] = useState(false)

  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header')
    header.style.backgroundColor = '#1C1C1C'
  }, [])
  // header 검은색으로 변경

  const loadMoreData = () => {
    setPage(page + 1)
  }

  // search page 들어오자마자 기본 값인 her, all 향수 정보 axios 요청
  const axiosStart = () => {
    // if (page !== -1) setnoMore(true)
    console.log('axpage: ', page)
    console.log('axgender: ', axiosGenderData)
    console.log('axcategory: ', axiosCateData)
    axios
      .post(`http://j5a403.p.ssafy.io:8000/perfume/list?page=${page}`, {
          "gender": axiosGenderData,
          "categoryList": axiosCateData,
      })
      .then((res) => {
        if (res.status === 200) {
          setItems([...items, ...res.data])
          setnoMore(true)
          console.log(items)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    axiosStart()
  }, [page, axiosGenderData, axiosCateData])
  
  const toggleItems = (n, e) => {
    const t = e.target
    let genderNum
    let categoryNum
    if (n < 3) {
      genderNum = n
    } else {
      categoryNum = n
    }
    if (t.classList.contains('gender')) {
      const genders = document.querySelectorAll('.gender')
      setAxiosGenderData(genderNum)
      setPage(0)
      console.log('gender: ', axiosGenderData)
      console.log('category: ', axiosCateData)
      console.log('page: ', page)
      genders.forEach(gender => {
        if (gender === t) {
          gender.classList.add("checked")
        } else {
          gender.classList.remove("checked")
        }
      })
    } else if (t.classList.contains('notes')) {
      const notes = document.querySelectorAll('.notes')        
      setAxiosCateData([categoryNum])
      console.log('gender: ', axiosGenderData)
      console.log('category: ', axiosCateData)
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
          <li className="checked gender" onClick={(e) => {toggleItems(2, e)}}>#For Her</li>
          <li className="gender" onClick={(e) => {toggleItems(0, e)}}>#For Unisex</li>
          <li className="gender" onClick={(e) => {toggleItems(1, e)}}>#For Him</li>
        </ul>
      </div>
      <div className="note_category">
        <ul>
          <li className="checked notes" onClick={(e) => {toggleItems(3, e)}}>ALL</li>
          <li>|</li>
          <li className="notes" onClick={(e) => {toggleItems(4, e)}}>FLOWERS</li>
          <li>|</li>
          <li className="notes" onClick={(e) => {toggleItems(5, e)}}>CITRUS</li>
          <li>|</li>
          <li className="notes" onClick={(e) => {toggleItems(6, e)}}>FRUITS</li>
          <li>|</li>
          <li className="notes" onClick={(e) => {toggleItems(7, e)}}>GREENS</li>
          <li>|</li>
          <li className="notes" onClick={(e) => {toggleItems(8, e)}}>SWEETS</li>
        </ul>
      </div>
      <div className="search_card">
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={loadMoreData}
        hasMore={noMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={3}>
          {items.map((item) => {
            return <Grid item md={4} sm={6} xs={12}>
                    <SearchCard
                      key={item.id}
                      imgurl={item.imgurl}
                      brand={item.brand}
                      name={item.name}
                      id={item.id}
                    >
                    </SearchCard>
                  </Grid>
            }
          )}
        </Grid>
      </InfiniteScroll>
        
      </div>
    </div>
  )
}

export default Search;