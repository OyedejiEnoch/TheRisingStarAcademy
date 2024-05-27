import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import './App.css'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./app/components/layout/navbar/Navbar"
import Footer from "./app/components/layout/footer/Footer"
import Home from "./features/pages/home/Home"
import Login from "./features/auth/login/Login"
import Register from "./features/auth/register/Register"
import Courses from "./features/pages/courses/Courses"
import SingleCourse from "./features/pages/singleCourse/SingleCourse"

function App() {

  const Layout =()=>{
    return (

      <div className="flex flex-col h-screen justify-between relative">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  }

  const router =createBrowserRouter([
    {
      path:"/",
      element:<Layout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/courses",
          element:<Courses />
        },
        {
          path:"/courses/:id",
          element:<SingleCourse />
        },
      ]
    },
    {
      path:"/auth/login",
      element:<Login />
    },
    {
      path:"/auth/register",
      element:<Register />
    }
  ])

  return (
    <><ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    
    />
      <RouterProvider router={router} />
    </>
  )
}

export default App
