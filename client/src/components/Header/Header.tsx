import { Link } from 'react-router-dom';
// import logo from '../../assets/logo/POSRA E-commerce Logo Design.png';
import Location from '../Location/Location';
const Header = () => {
  return (
    <div className="wrapper py-2">
         {/* Head Content */}
         <section className="grid grid-cols-3 gap-2">
            {/* location & logo */}
            <div className='flex gap-2 items-center'>
                 <div className="logo">
                    <h1 className='font-bold text-4xl'><span className='text-amber-500'>P</span>OSRA</h1>
                    {/* <img src={logo} className='w-30 bg-red-600' alt="company Logo" /> */}
                </div>

                <Link to="" className='location'>
                    <Location />
                </Link>
            </div>

            {/* SearchBar */}
           
            

         </section>
         {/* Navbar */}
         
    </div>
  )
}

export default Header;
