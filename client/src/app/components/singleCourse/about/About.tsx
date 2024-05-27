import { useGetSingleTutorQuery } from "../../../redux/api/userApi"

type Course ={
    _id:string,
    title:string,
    description:string,
    summary:string,
    body:string,
    about:string,
    benefits:[],
    topics:[{
        title:string,
        body:string,
        summary:string
    }],
    subCourses:[],
    image:{
        public_id:string,
        url:string
    },
    author:string
}

type Prop ={
    course:Course
}


const About = ({course}:Prop) => {

    const {data:tutor, isLoading}=useGetSingleTutorQuery(course.author)

    console.log(tutor)


  return (
    <div className="p-2 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
    <div className="flex flex-col gap-6">
        <h1 className="font-bold text-[32px]">{course.title}-</h1>
        <div className="flex flex-col gap-2">
        <span className="font-semibold text-[18px] sm:text-[18px] text-gray-800">About this course</span>
        <p className="text-gray-600 text-[14px] sm:text-[18px] ">{course.about}</p>
        </div>
    </div>
    {/* description */}
    <hr className="mt-2 sm:mt-4" />
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2 sm:mt-6">
        <span className="font-semibold text-[18px] sm:text-[18px] text-gray-800">Description</span>
        <div className="px-4 sm:px-8">
        <p className=" text-[14px] sm:text-[18px] text-gray-600">{course.description}</p>
        </div>
    </div>
    {/* tutor */}
        <hr className="mt-2 sm:mt-4" />
       {isLoading ? "loading..." :  
       
       <div className="flex flex-col sm:flex-row gap-4 sm:gap-8   mt-2 sm:mt-6">
            <span className="font-semibold text-[18px] sm:text-[18px] text-gray-800">Instructor</span>
            <div className="px-4 sm:px-8 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <img src={ "/noavatar.png"} alt="img" 
                className="w-[60px] h-[60px] object-cover rounded-full"/>
    
                <div className="flex flex-col">
                    <h2 className="font-bold text-[20px]">{tutor?.singleTutor.name}</h2>
                    <h2 className="font-bold text-[16px] text-gray-600">{tutor?.singleTutor?.profession}</h2>
                </div>
            </div>
            <p className=" text-[14px] sm:text-[18px] text-gray-600">{tutor?.singleTutor?.bio}</p>
            </div>
        </div>}
    </div>
  )
}

export default About