import "bootstrap/dist/css/bootstrap.min.css"
import News from "./News"
import Puzzle from "./Puzzle"
import Banner from "./Banner"
import Footer from "./Footer"

function RightAside() {
  return (
    <aside className="d-flex flex-column gap-3">
      <News />
      <Puzzle />
      <Banner />
      <Footer />
    </aside>
  )
}

export default RightAside
