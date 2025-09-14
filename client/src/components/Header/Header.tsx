import { Link } from "react-router-dom";
import Location from "../Location/Location";
import CategoryFilterSearch from "../Search/CategoryFilterSearch";
import SignInMenu from "./SingInMenuHeader";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import { ShoppingBag } from "lucide-react";
import Humburger from "../../utils/Humburger";
import { useState } from "react";
import OffCanvas from "./OffCanvas";
import Modal from "../Modal/Modal";

const Header = () => {
    // off canvavs
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    
  return (
    // Parent Div
    <div className="flex items-center justify-between m-1 border-b border-gray-100 p-2 ">
      {/* logo & location */}
      <div className="flex gap-[6px]">
        <Link to="" className="font-bold text-2xl md:text-4xl">
          <span className="text-amber-500">P</span>OSRA
        </Link>

        <div className="hidden lg:block">
          <Location />
        </div>
      </div>

      {/* SearchBar */}
      <div className="flex-grow hidden lg:block">
        <CategoryFilterSearch />
      </div>

      {/* User Orders, Cart ETC */}
      <div className="flex items-center gap-3 md:gap-4 ml-3">
        <div className="hidden sm:block">
          <SignInMenu />
        </div>
        {/* Language */}
        <LanguageSelect />
        {/*  Orders Link */}
        <Link to="/orders" className="hidden sm:block text-base font-semibold">
          Orders
        </Link>

        {/* Cart Link */}
        <Link
          to="/cart"
          className="flex items-center gap-2 font-semibold text-slate-900"
        >
          <ShoppingBag />
          <span className="hidden md:block">Cart</span>
        </Link>

        {/* off Canvas Button */}
        <div className="lg:hidden">
            <Humburger size={24} gap={6} open={open} setOpen={setOpen} />
        </div>
          {/* Offcanvas Menu */}
        <OffCanvas modalOpen={modalOpen} setModalOpen= {setModalOpen} open={open} setOpen={setOpen} />
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default Header;
