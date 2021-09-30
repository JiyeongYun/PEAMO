import { useEffect, useState } from 'react'
import './Search.css'
import axios from 'axios'
import SearchCard from '../components/SearchComponents/SearchCard'
import Grid from '@material-ui/core/Grid'
// import { Contacts } from '@material-ui/icons';

function Search () {
  const [perfumeResult, setPerfumeResult] = useState([])

  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header')
    header.style.backgroundColor = '#1C1C1C'
    axiosStart()
  }, [])
  // header 검은색으로 변경

  let axiosGenderData = 2
  let axiosCateData = [4]

  const axiosStart = () => {
    axios
      .post("http://j5a403.p.ssafy.io:8000/perfume/list?page=0", {
          "gender": axiosGenderData,
          "categoryList": axiosCateData,
      })
      .then((res) => {
        if (res.status === 200) {
          setPerfumeResult(res.data)
          console.log(perfumeResult)
        }
      })
      .catch((err) => {
        console.log(err)
      }) 
  }

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
      axiosGenderData = genderNum
      genders.forEach(gender => {
        if (gender === t) {
          gender.classList.add("checked")
          console.log('gender: ', axiosGenderData)
          console.log('category: ', axiosCateData)
          axios
            .post("http://j5a403.p.ssafy.io:8000/perfume/list?page=0", {
                "gender": axiosGenderData,
                "categoryList": axiosCateData,
            })
            .then((res) => {
              if (res.status === 200) {
                setPerfumeResult(res.data)
                console.log(perfumeResult)
              }
            })
            .catch((err) => {
              console.log(err)
            }) 
        } else {
          gender.classList.remove("checked")
        }
      })
    } else if (t.classList.contains('notes')) {
      const notes = document.querySelectorAll('.notes')        
      axiosCateData = [categoryNum]
      console.log('gender: ', axiosGenderData)
      console.log('category: ', axiosCateData)
      axios
        .post("http://j5a403.p.ssafy.io:8000/perfume/list?page=0", {
            "gender": axiosGenderData,
            "categoryList": axiosCateData,
        })
        .then((res) => {
          if (res.status === 200) {
            setPerfumeResult(res.data)
            console.log(perfumeResult)
          }
        })
        .catch((err) => {
          console.log(err)
        }) 
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
        <Grid container spacing={3}>
          {perfumeResult &&
            perfumeResult.map((itemdata) => {
              return (
                <Grid item md={4} sm={6} xs={12}>
                  <SearchCard
                    key={itemdata.id}
                    imgurl={itemdata.imgurl}
                    brand={itemdata.brand}
                    name={itemdata.name}
                    id={itemdata.id}
                    />
                </Grid>
              )
          })}
        </Grid>
      </div>
    </div>
  )
}

export default Search