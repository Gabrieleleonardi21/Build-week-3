import "bootstrap/dist/css/bootstrap.min.css";
import News from "@/features/feed/News";
import Puzzle from "@/ui/Puzzle";
import Banner from "@/ui/Banner";
import Footer from "@/layout/Footer";

function RightAside() {
  return (
    <aside className="d-flex flex-column gap-3">
      <News />
      <Puzzle />
      <Banner />
      <Footer />
    </aside>
  );
}

export default RightAside;
