import SingleCourseCard from "../../../app/components/singleCourseCard/SingleCourseCard"
import {useAllCourseQuery} from "../../../app/redux/api/coursesApi"

const Courses = () => {

  const {data, isLoading} =useAllCourseQuery()

  return (
    <section className="w-full">
        <div className="max-w-6xl mx-auto p-4 mt-2 mb-4">
            <div className="grid md:grid-cols-3 lg:mt-20 flex-col gap-8">
           {data?.courses.map((course)=>(
              <SingleCourseCard course={course} />
           )) 
          }
            </div>
        </div>
    </section>
  )
}

export default Courses