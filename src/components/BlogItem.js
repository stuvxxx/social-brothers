import "../styles/blogs-item.css"
import rect from "../assets/Mask-1.png"

const imgBaseUrl = "https://frontend-case-api.sbdev.nl/storage/"

const removeTime = (date) => {
  const newDate = date.split("T")
  return newDate[0]
}

const Blogs = ({post}) => {
    return (
      <div className="blogs-item">
        <img src={imgBaseUrl + post.img_url} alt="a" />
        <img src={rect} alt="a"/>
        <div className="date-cat">
          <p>{removeTime(post.updated_at)}</p>
          <p>{post.category.name}</p>
        </div>
        <h3>{post.title}</h3>
        <div className="article-wrapper">
          <p>{post.content}</p>
        </div>
      </div>
  )
};
  
  export default Blogs;