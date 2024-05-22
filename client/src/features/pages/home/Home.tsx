import About from "../../../app/components/about/About"
import Header from "../../../app/components/layout/header/Header"
import OurCourses from "../../../app/components/ourCourses/OurCourses"
import Features from "../features/Features"
import { Cta } from "../cta/Cta"
// import Reviews from "../reviews/Reviews"
import Testimonials from "../testimonials/Testimonials"
import MissionVision from "../../../app/components/missionVision/MissionVision"

const Home = () => {
  return (
    <section>
      <Header />
      <About />
      <div className="mt-20">
      <MissionVision />
      </div>
      <OurCourses />
      <Features />
      <div className="mt-20">
      <Testimonials />
      </div>
      <div className="mt-20">
      <Cta />
      </div>
      {/* <Reviews /> */}
    </section>
  )
}

export default Home