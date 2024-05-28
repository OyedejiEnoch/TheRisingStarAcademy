import 'animate.css';

const MissionVision = () => {
  return (
    <section className="max-w-6xl mx-auto  flex flex-col sm:flex-row  justify-between gap-4 p-4">
       
            {/* left */}
            <div className="animate__animated animate__fadeInUp  animate__delay-3s">
                <img src="https://images.pexels.com/photos/1198171/pexels-photo-1198171.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className=" h-[400px] object-cover " alt="Circular Image" />
            </div>
           

            {/* right */}
            <div className="flex flex-col sm:p-6 gap-2 animate__animated animate__fadeInUp  animate__delay-3s" >
                <p>Our programs</p>
                <h2 className="text-[32px] font-inter font-semibold">Why choose our coaching programs?</h2>
                <p className="text-[16px] text-gray-600 max-w-[600px]">
                   Our dedicated mentors are committed to your growth and development. Rising Stars Academy offers a comprehensive curriculum
                   designed to foster personal and professional growth within a span of 3 months.
                  <br />

                   <span className="text-gray-700 font-semibold text-[18px]">General Courses</span>: These are foundational courses essential for every student's development.
                  It's a soft skill training compulsory for all our students.

                  <br />
                  <span className="text-gray-700 font-semibold text-[18px]">Major Courses</span>: These vocational skills, Tech skills to empower individuals for self sustainability and success in the job market. 
                  All student are to specialize in only one of these skills

                </p>

                <h2 className="text-[32px] font-inter font-semibold">How will coaching benefit me?</h2>
                <p className="text-[16px] text-gray-600 max-w-[600px]">Our coaching program will help you gain clarity set meaningful goals,
                and take decisive actions to achieve your aspirations
                <br />
                <span className="text-gray-700 font-semibold text-[18px]">Empowered Youth</span>: Imparting life skills to empower students for informed decision making.
                <br />
                <span className="text-gray-700 font-semibold text-[18px]">Stronger Communities</span>: Cultivating socially conscious leaders who drive positive change within their communities.
                <br />
                <span className="text-gray-700 font-semibold text-[18px]">Future Leaders</span>: Equipping graduates to lead and inspire, shaping a promising future for all.
                <br />
                <span className="text-gray-700 font-semibold text-[18px]">Global Citizenship</span>: Fostering a sense of global citizenship, preparing students to address local and global challenges.

                </p>


            </div>
         

       
    </section>
  )
}

export default MissionVision