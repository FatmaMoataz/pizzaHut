import { createBrowserRouter ,  RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from "react";

function App() {

  const Cart = lazy(() => import('./components/Cart/Cart'))
  const Menu = lazy(() => import('./components/Menu/Menu'))
  const Contact = lazy(() => import('./components/Contact/Contact'))
  const Favorites = lazy(() => import('./components/Favorites/Favorites'))
  const Login = lazy(() => import('./components/Login/Login'))
  const Register = lazy(() => import('./components/Register/Register'))
  const ForgetPassword = lazy(() => import('./components/ForgetPassword/ForgetPassword'))
  const Checkout = lazy(() => import('./components/Checkout/Checkout'))

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        { path:"home", element: <Home /> },
        { path: "menu", element: <Suspense><Menu/> </Suspense>  },
        { path: "contact", element:  <Suspense><Contact/></Suspense>  },
        { path: "about", element:   <About/> },
        { path: "favorites", element: <Suspense><Favorites/></Suspense>  },
        { path: "cart", element: <Suspense><Cart/></Suspense>   },
        { path: "login", element:<Suspense><Login/> </Suspense>  },
        { path: "register", element: <Suspense><Register/></Suspense>  },
        { path: "forgetPassword", element: <Suspense> <ForgetPassword/></Suspense>  },
        { path: "checkout", element: <Suspense><Checkout/></Suspense>  }
  
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
