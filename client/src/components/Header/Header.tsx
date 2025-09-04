// import logo from '../../assets/logo/POSRA E-commerce Logo Design.png';
import Location from '../Location/Location';
import CategoryFilterSearch from '../Search/CategoryFilterSearch';
const Header = () => {
  return (
    <div className="wrapper py-2">
         {/* Head Content */}
         <section className="grid grid-cols-12 gap-2 items-center">
            {/* location & logo */}
            <div className='flex gap-2 items-center col-span-2'>
                 <div className="logo">
                    <h1 className='font-bold text-4xl'><span className='text-amber-500'>P</span>OSRA</h1>
                    {/* <img src={logo} className='w-30 bg-red-600' alt="company Logo" /> */}
                </div>
                {/* location of users */}
                <Location />
            </div>

            {/* SearchBar */}
            <div className="col-span-6">
              <CategoryFilterSearch />
            </div>
            
            

         </section>
         {/* Navbar */}
         
    </div>
  )
}

export default Header;
