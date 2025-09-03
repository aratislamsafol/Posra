import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Root = () => {
    return (
        <div className='w-full max-w-[1440px] mx-auto'>
            <Header/>
            <Outlet />
        </div>
    )
}

export default Root;