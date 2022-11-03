import "../styles/blogs.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import BlogItem from "./BlogItem"
import Loading from "./Loading"


const Blogs = () => {
  const [posts, setPosts] = useState([])
  const [pages, setPages] = useState("4")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("https://frontend-case-api.sbdev.nl/api/posts?page=&perPage=" + pages, {
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

  }, [])

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
      </div>
  )
  };


  
  export default Blogs;

