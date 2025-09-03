import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import HomeLayout from '../layouts/HomeLayout';
import {Loader} from "../utils/Loader";

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<div className="spinner"></div>}>
                <Root></Root>
            </Suspense>
        ),
        loader: Loader({location: '/location.json'}),
        children: [
            {
                path: '/',
                element: <HomeLayout></HomeLayout>,
                
            }
        ]
    }
]);

export default router;