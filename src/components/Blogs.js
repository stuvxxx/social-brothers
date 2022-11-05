import "../styles/blogs.css"
import "../styles/buttons.css"
import React, { useState, useEffect, } from "react"
import axios from "axios"
import BlogItem from "./BlogItem"
import Loading from "./Loading"
import Pagination from "./Pagination"

const Blogs = ({isBig}) => {

  /* I wanted to use only one page for both blog views, my solution isnt the cleanest would have done it
  differently the second time :) */

  let blogsInView = isBig ? 8 : 4

  const pageNumberLimit = 5;
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

 
  const getData = (page) => {
    axios.get(page + blogsInView, {
      headers: {
        "token": "pj11daaQRz7zUIH56B9Z"
      }
    })
      .then(res => {
        console.log(res)
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
   })
  }

  const setPageInView = (x) => {
    console.log(x)
    if(isNaN(x)) {
      const newPage = posts.next_page_url + "&perPage="
      getData(newPage)
    }
    else {
      const newPage = "https://frontend-case-api.sbdev.nl/api/posts?page=" + x + "&perPage="
      getData(newPage)
    }
  }
  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
    getData("https://frontend-case-api.sbdev.nl/api/posts?page=&perPage=") }, [])

    const onPageChange= (pageNumber)=>{
      console.log(pageNumber)
      setCurrentPage(pageNumber);
      setPageInView(pageNumber)
    }
  
    const onPrevClick = ()=>{
        console.log(currentPage)
        if((currentPage-1) % pageNumberLimit === 0){
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev=> prev-1);
        setPageInView(currentPage - 1)
     }
  
    const onNextClick = ()=>{
         if(currentPage+1 > maxPageLimit){
             setMaxPageLimit(maxPageLimit + pageNumberLimit);
             setMinPageLimit(minPageLimit + pageNumberLimit);
         }
         setCurrentPage(prev=>prev+1);
         setPageInView(currentPage + 1)
      }

    const paginationAttributes = {
      currentPage,
      maxPageLimit,
      minPageLimit,
      response: posts,
  };


    return (
      <div className={isBig ? "big-blogs-wrapper" : "blogs-wrapper"}>
        <div className={isBig ? "big-blogs-item-wrapper" : "blogs-item-wrapper"}>
        { loading
          ? <Loading />
          : posts.data.map((post) => {
            return (
              <BlogItem post={post} key={post.id}/>
            )
          })}
        </div>
        <div className={isBig ? "pagination-wrapper" : "gone-blogs-wrapper"}>
            <Pagination {...paginationAttributes} 
                              onPrevClick={onPrevClick} 
                              onNextClick={onNextClick}
                              onPageChange={onPageChange}
            />
        </div>
        <button id="btn-rechts" onClick={setPageInView} className={isBig ? "gone-btn-load" : "btn-more"}>Meer laden</button>
      </div>
    )
  };

  export default Blogs;

