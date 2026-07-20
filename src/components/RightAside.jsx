import "bootstrap/dist/css/bootstrap.min.css"
import News from "./News"
import Puzzle from "./Puzzle"
import Banner from "./Banner"
import Footer from "./Footer"

function RightAside() {
  return (
    <aside className="col-12 col-md-4 ms-md-auto d-flex flex-column gap-3 pt-5 ps-3 pe-5">
      <News />
      <Puzzle />
      <Banner />
      <Footer />
    </aside>
  )
}

export default RightAside
