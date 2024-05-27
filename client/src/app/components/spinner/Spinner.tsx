// import spinner from "spinner.svg"

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
        <img className="text-[20px]" src={"/spinner.svg"} alt="loading" />
    </div>
  )
}

export default Spinner