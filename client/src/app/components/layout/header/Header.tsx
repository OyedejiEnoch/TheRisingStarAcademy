
import { BackgroundBeams } from "../../ui/background-beams";
import Reviews from "../../../../features/pages/reviews/Reviews";

const Header = () => {
  return (
    <div className="h-[55rem] bg-slate-950 text-white w-full rounded-md  relative flex flex-col items-center overflow-hidden justify-center antialiased">
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="relative z-10 text-4xl md:text-7xl font-inter text-white text-center  font-bold">
        The <span className="text-white">Rising</span> Star 
        <br />Academy
      </h1>
      <p></p>
      <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10 mt-4">
        Welcome to MailJet, the best transactional email service on the web.
        We provide reliable, scalable, and customizable email solutions for
        your business. Whether you&apos;re sending order confirmations,
        password reset emails, or promotional campaigns, MailJet has got you
        covered.
      </p>
    </div>
      <div className="flex items-center gap-6">
        <button className="px-6 py-4 rounded-2xl bg-purple-700 text-white font-semibold">Register with us</button>
        <button className="px-6 py-4 rounded-2xl border border-[#0F1035]  font-semibold">View Courses</button>
      </div>

    <div className="mt-8">
      <Reviews />
    </div>
    <BackgroundBeams />

  </div>
  )
}

export default Header


// bg-hero-bg bg-contain

// <section className="max-w-6xl mx-auto padding-container flex flex-col pb-32 py-10 gap-14 md:gap-28 lg:py-20 lg:px-4 sm:flex-row">
// {/* <div style={{background:`url(${header})` }} className={` h-screen w-screen  bg-cover bg-center`} /> */}
// <div className="w-full flex flex-col flex-1 p-4 gap-6 ">
//     <h1 className="text-[62px] sm:text-[78px] font-[700] leading-[120%]"> Rising Star Academy</h1>
//     <p className="text-sm m:max-w-[520px] text-gray-600 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error sit aperiam, perferendis ullam laboriosam neque inventore minus. Nisi, a officia tenetur dicta aliquam cum nobis vel quidem facere, repellat maiores.</p>

//     <div>
//         <Link to="/courses" className="flex items-center justify-center gap-2 w-[250px] px-4 py-5 bg-[#EABE6C] text-white font-semibold rounded-full">
//             View Courses <span><FaArrowCircleRight size={20} /></span></Link>
//     </div>
// </div>

// <div className="flex-1 w-full">
//     <img src={header} alt="img" className="w-full" />
// </div>

// </section>

// bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 