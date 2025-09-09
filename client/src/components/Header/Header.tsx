// import logo from '../../assets/logo/POSRA E-commerce Logo Design.png';
import { ShoppingBag } from "lucide-react";
import Location from "../Location/Location";
import CategoryFilterSearch from "../Search/CategoryFilterSearch";
import SignInMenu from "./SingInMenuHeader";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
const Header = () => {
  return (
    <div className="wrapper py-2 px-4 shadow-sm backdrop-blur-2xl text-center z-10">
      {/* Head Content */}
      <section className="flex gap-4 items-center">
        {/* location & logo */}
        <div className="flex gap-2 items-center">
          <div className="logo">
            <h1 className="font-bold text-4xl">
              <span className="text-amber-500">P</span>OSRA
            </h1>
            {/* <img src={logo} className='w-30 bg-red-600' alt="company Logo" /> */}
          </div>
          {/* location of users */}
          <Location />
        </div>

        {/* SearchBar */}
        <div className="flex-grow">
          <CategoryFilterSearch />
        </div>
        {/* sign in */}
        <SignInMenu />
        {/* Language */}
        <LanguageSelect />
        {/* Return/ Orders */}
        <div>
          <h5 className="text-base font-semibold">& Orders</h5>
        </div>
        {/* Cart */}
        <div>
          <h5 className="flex gap-2  font-semibold text-slate-900">
            <ShoppingBag /> Cart
          </h5>
        </div>
      </section>
      {/* Navbar */}
    </div>
  );
};

export default Header;
