import "../styles/blogs.css"
import "../styles/buttons.css"
import React, { useState, useEffect, } from "react"
import axios from "axios"
import BlogItem from "./BlogItem"
import Loading from "./Loading"
import Pagination from "./Pagination"


const Blogs = ({isBig}) => {

  const pageNumberLimit = 5;
  const blogsInView = isBig ? 8 : 4

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

  const handleClick = () => {
      const newPage = posts.next_page_url + "&perPage="
      getData(newPage)
  }

  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
    getData("https://frontend-case-api.sbdev.nl/api/posts?page=&perPage=") }, [])


    const onPageChange= (pageNumber) => {
      console.log(currentPage)
      setCurrentPage(pageNumber);
      const newPage = "https://frontend-case-api.sbdev.nl/api/posts?page=" + pageNumber + "&perPage="
      getData(newPage)
    }
  
    const onPrevClick = () => {
        console.log(currentPage)
        if((currentPage -1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage( prev => prev -1 );
        const newPage = "https://frontend-case-api.sbdev.nl/api/posts?page=" + (currentPage -1) + "&perPage="
        getData(newPage)
     }
    
    const onNextClick = () => {
        console.log(currentPage)
         if(currentPage + 1 > maxPageLimit){
             setMaxPageLimit(maxPageLimit + pageNumberLimit);
             setMinPageLimit(minPageLimit + pageNumberLimit);
         }
         setCurrentPage( prev => prev +1 );
         const newPage = "https://frontend-case-api.sbdev.nl/api/posts?page=" + (currentPage +1) + "&perPage="
         getData(newPage)
      }

      const onLastClick = () => {
        console.log("clicked")
        const lastPage = posts.last_page
        if(currentPage + 1 > maxPageLimit){
          setMaxPageLimit(maxPageLimit + pageNumberLimit);
          setMinPageLimit(minPageLimit + pageNumberLimit);
      }
         setCurrentPage( lastPage );
         const newPage = "https://frontend-case-api.sbdev.nl/api/posts?page=" + ( lastPage ) + "&perPage="
         getData(newPage)
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
          <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}
                          onLastClick={onLastClick}
                          />
        </div>
        <button onClick={handleClick} className={isBig ? "gone-btn-load" : "btn-load"}>Meer laden</button>
      </div>
    )
  };

  export default Blogs;

