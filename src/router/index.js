import Layout from "@/pages/Layout";
import Login from '@/pages/Login'

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/layout",
        element: <Layout />
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router