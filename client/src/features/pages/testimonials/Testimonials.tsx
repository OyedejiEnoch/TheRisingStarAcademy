import TestimonialsReview from "../../../app/components/testimonials/TestimonialsReview"

const Testimonials = () => {
  return (
    <section className="w-full bg-slate-950 p-6 flex sm:flex-row flex-col justify-center items-center">
        <div className="max-w-6xl mx-auto flex sm:flex-row flex-col-reverse justify-center items-center">
            
            <div className="flex-1 ">
                <TestimonialsReview />
            </div>
    
            <div className="flex-1 flex flex-col gap-2">
                <p className="px-4 py-2 bg-slate-800 text-gray-400 w-[150px] rounded-full text-center">Testimonials</p>
                <h2 className="font-bold text-[30px] sm:text-[52px] text-white font-inter ">Our Students say about us</h2>
                <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nesciunt deleniti praesentium ipsa fuga quia ipsum non rem cum dignissimos 
                    nobis libero ratione, ad asperiores beatae obcaecati sapiente modi corporis?</p>
                
                <button className="text-white w-[150px] bg-purple-700 px-4 py-2 rounded-xl mt-6">Register with us</button>
            </div>
        </div>
    </section>
  )
}




export default Testimonials