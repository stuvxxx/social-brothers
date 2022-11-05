import "../styles/home.css"
import Form from "../components/Form"
import Blogs from "../components/Blogs"

const HomeView = () => {
    return (
      <main>
        <div className="main-wrapper">
          <Form />
          <Blogs />
        </div>
      </main>
  )
};
  
  export default HomeView;