
const About = () => {
  return (
    <div className="p-2 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
    <div className="flex flex-col gap-6">
        <h1 className="font-bold text-[32px]">Personal Relationship-</h1>
        <div className="flex flex-col gap-2">
        <span className="font-semibold text-[18px] sm:text-[18px] text-gray-800">About this course</span>
        <p className="text-gray-600 text-[14px] sm:text-[18px] ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore, rem laborum deleniti delectus maiores iusto, natus aliquid veniam, incidunt magnam tempora quis enim qui! Minus fugiat ratione dignissimos magni perferendis?</p>
        </div>
    </div>
    {/* description */}
    <hr className="mt-2 sm:mt-4" />
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-between mt-2 sm:mt-6">
        <span className="font-semibold text-[18px] sm:text-[18px] text-gray-800">Description</span>
        <div className="px-4 sm:px-8">
        <p className=" text-[14px] sm:text-[18px] text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati at quod natus blanditiis libero atque in recusandae fugit, modi quaerat qui minima voluptatum quidem molestiae! Quisquam, asperiores provident! Qui, perferendis?</p>
        </div>
    </div>
    {/* tutor */}
        <hr className="mt-2 sm:mt-4" />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8  justify-between mt-2 sm:mt-6">
            <span className="font-semibold text-[18px] sm:text-[18px] text-gray-800">Instructor</span>
            <div className="px-4 sm:px-8 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <img src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img" 
                className="w-[60px] h-[60px] object-cover rounded-full"/>
    
                <div className="flex flex-col">
                    <h2 className="font-bold text-[20px]">Enoch Oyedeji</h2>
                    <h2 className="font-bold text-[16px] text-gray-600">Fullstack web developer</h2>
                </div>
            </div>
            <p className=" text-[14px] sm:text-[18px] text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati at quod natus blanditiis libero atque in recusandae fugit, modi quaerat qui minima voluptatum quidem molestiae! Quisquam, asperiores provident! Qui, perferendis?</p>
            </div>
        </div>
    </div>
  )
}

export default About