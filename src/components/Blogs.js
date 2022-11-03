import "../styles/blogs.css"
import "../styles/buttons.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import BlogItem from "./BlogItem"
import Loading from "./Loading"


const Blogs = () => {
  const [posts, setPosts] = useState([])
  const [pages, setPages] = useState("4")
  const [loading, setLoading] = useState(true)


const handleClick = () => {
    const newPage = posts.next_page_url + "&perPage="
    getData(newPage)
}

useEffect(() => {
  getData("https://frontend-case-api.sbdev.nl/api/posts?page=&perPage=") }, [])


const getData = (page) => {
  axios.get(page + pages, {
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


    return (
      <div className="blogs-wrapper">
        <div className="blogs-item-wrapper">
        { loading
          ? <Loading />
          : posts.data.map((post) => {
            return (
              <BlogItem post={post} key={post.id}/>
            )
          })}
        </div>
        <button onClick={handleClick} className="btn-load">Meer laden</button>
      </div>
  )
  
  };

  export default Blogs;

