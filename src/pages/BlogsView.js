import Blogs from "../components/Blogs"
import "../styles/blogsview.css"

const BlogsView = () => {
  const isBig = true
  return (
    <>
      <Blogs isBig={isBig}/>
    </>
    );
  };
  
  export default BlogsView;