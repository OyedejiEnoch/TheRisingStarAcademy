import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,  } from "swiper/modules";
import "swiper/css/bundle";
import 'swiper/css';
import 'swiper/css/pagination';
// import {BiSolidCategory} from "react-icons/bi"
import { Link } from 'react-router-dom';
// import SingleCourseCard from '../singleCourseCard/SingleCourseCard';
import HomeSingleCourseCard from '../singleCourseCard/HomeSingleCourseCard';
import {useLatestCoursesQuery } from '../../redux/api/coursesApi';
import { SkeletonCard } from '../skeleton/Skeleton';


const OurCourses = () => {
  const array=[1,2,3,4,5,6]
    const {data, isLoading} =useLatestCoursesQuery()


    if(isLoading){
        return "Loading..."
    }

  return (
    <section className="w-full height-[400px] mt-6 ">
    <div className=" w-full sm:max-w-7xl sm:mx-auto p-4 sm:p-12 flex flex-col  gap-10 ">
        <div className='flex flex-col gap-2'>
        <p className="text-xl sm:text-[18px] font-medium text-[#8576FF] ">Our Courses</p>
        <h2 className='font-semibold text-[#0F1035] text-[26px] sm:text-[34px] font-inter'>Unlock Limitless features with our courses</h2>
        <p className='text-[15px] text-gray-500 max-w-[600px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sed, quam nobis dicta dignissimos, quo a
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sed, quam nobis dicta dignissimos, quo a</p>
        </div>
    <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        loop
        autoplay={{
          delay:3000,
          disableOnInteraction:false
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        
        className="mySwiper"
            >
       
        {isLoading ? array.map((_)=>(
              <SkeletonCard />
          )) :
        
        data?.courses.map((course)=>(

        <SwiperSlide className='swiper-slide2 '>
            <Link to={`/store-owner/profile/`}>
                <HomeSingleCourseCard course={course} />

            </Link>


        </SwiperSlide>
        )) 
        }
        
     
        
                 
    </Swiper>
       
             

    </div>
</section>
  )
}

export default OurCourses