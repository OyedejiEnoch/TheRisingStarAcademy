
import 'animate.css';


const About = () => {


  return (
    <section className="max-w-6xl mx-auto  flex flex-col sm:flex-row  justify-between gap-4 p-4">
       
            {/* left */}
            <div className="flex flex-col gap-2 animate__animated animate__fadeInUp  animate__delay-3s" >
                <p>About Us</p>
                <h2 className="text-[42px] font-inter font-semibold">About Rising Star Academy</h2>
                <p className="text-[16px] text-gray-600 max-w-[600px]">
                  Rising Stars Academy is an initiative, born from a deep passion and divine guidance, with a clear mission to nurture
                  the potential in young adults by helping them discover their identity and purpose. We empower through quality education, coaching, and
                  mentoring.
                  <br />
                  <span className="font-semibold text-gray-700 text-[18px]">Our vision</span> is to cultivate a just, peaceful world free from violence, with education as a potent force of empowerment and skill development.
                  <br />
                  <span className="font-semibold text-gray-700 text-[18px]">Our Mission </span>is to nurture individuals across generations who are passionate about personal development and growth.
                  <br />   
                  At Rising Stars Academy, we're here to help you unlock your full potential and achieve your goals.
                  Our vision is to create a transformative environment where individuals of all ages, from teenagers to
                  young adults, can embark on a journey of self-discovery, learning, and empowerment. 
                </p>
                <button className="px-6 py-4 bg-[#0F1035] text-white font-semibold w-[200px] rounded-full">View More</button>
            </div>

            {/* right */}
            <div className="animate__animated animate__fadeInUp  animate__delay-3s">
                <img src="https://images.pexels.com/photos/2574616/pexels-photo-2574616.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className=" h-[600px] " alt="Circular Image" />
            </div>

       
    </section>
  )
}

export default About


// animate={controls}
// initial="hidden"
// variants={{
//   visible: { opacity: 1 },
//   hidden: { opacity: 0 }
// }}
// transition={{ duration: 0.5 }}