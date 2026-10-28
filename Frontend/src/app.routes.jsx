import { createBrowserRouter } from "react-router";
import Login from "./features/Auth/page/Login";
import Register from "./features/Auth/page/Register";
import Protected from "./features/Auth/components/protected";
import Home from "./features/Interview/pages/Home";
import Interview from "./features/Interview/pages/Interview";

export const router  = createBrowserRouter([
    {
        path:"/",
        element: <Protected><Home/></Protected> 
    },
    { path:"/login",
     element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
    ,{
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    }
])