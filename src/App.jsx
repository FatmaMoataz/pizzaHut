import { createBrowserRouter ,  RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Contact from "./components/Contact/Contact";

function App() {

  const Cart = lazy(() => import('./components/Cart/Cart'))
  const Menu = lazy(() => import('./components/Menu/Menu'))
  const Favorites = lazy(() => import('./components/Favorites/Favorites'))
  const ForgetPassword = lazy(() => import('./components/ForgetPassword/ForgetPassword'))
  const Checkout = lazy(() => import('./components/Checkout/Checkout'))

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> }, 
        { path: "home", element: <Home /> },
        { path: "menu", element: <Suspense fallback={<div>Loading...</div>}><Menu/> </Suspense>  },
        { path: "contact", element:  <Suspense fallback={<div>Loading...</div>}><Contact/></Suspense>  },
        { path: "about", element:   <About/> },
        { path: "favorites", element: <Suspense fallback={<div>Loading...</div>}><Favorites/></Suspense>  },
        { path: "cart", element: <Suspense fallback={<div>Loading...</div>}><Cart/></Suspense>   },
        { path: "login", element:<Suspense fallback={<div>Loading...</div>}><Login/> </Suspense>  },
        { path: "register", element: <Suspense fallback={<div>Loading...</div>}><Register/></Suspense>  },
        { path: "forgetPassword", element: <Suspense fallback={<div>Loading...</div>}> <ForgetPassword/></Suspense>  },
        { path: "checkout", element: <Suspense fallback={<div>Loading...</div>}><Checkout/></Suspense>  }
  
      ],
    },
  ]);

  return (
    <>
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer />
    </>
  )
}

export default App
