import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import CommonButton from "../Button/CommonButton";
import { Link } from "react-router-dom";

const SignInMenu = () => {
  return (
    <Popover className="relative cursor-pointer">
      {({ open }) => (
        <>
          <PopoverButton className="outline-none focus:outline-none cursor-pointer transition-all text-gray-800 data-active:text-blue-950 data-hover:text-black">
            <h5 className="text-sm font-normal">
              Hello, sign in <br />
              <span className="text-base font-semibold ">Account</span>
            </h5>
          </PopoverButton>

          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <PopoverPanel
              static
              className="absolute -left-20 mt-2 w-62 rounded-md p-5 shadow-lg z-20 bg-amber-300 text-white"
            >
              <CommonButton
                borderRounded="rounded"
                textSize="text-sm"
                bgColor="bg-black"
                textColor="text-white"
                hoverBgColor="bg-white"
                textHover="text-black"
                fontWeight="font-semibold"
                activeBgColor="bg-amber-600"
                activeColor="text-white-900"
                style="px-12 py-2"
              >
                Sign In
              </CommonButton>

              {/* New Customer Link SignUp Page */}
              <p className="text-black mt-2">
                New Customer?{" "}
                <Link
                  to=""
                  className="text-blue-700 font-semibold underline hover:text-blue-900"
                >
                  Start Here
                </Link>{" "}
              </p>

              {/* Account Related */}
              <div className="py-2">
                <h3 className="text-lg font-bold text-black text-end">
                  Your Account
                </h3>
                <ul className="text-end">
                  <li className="">
                    <Link
                      to=""
                      className="text-blue-600 hover:text-blue-900 py-1"
                    >
                      Account
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to=""
                      className="text-blue-600 hover:text-blue-900 py-1"
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to=""
                      className="text-blue-600 hover:text-blue-900 py-1"
                    >
                      WishList
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to=""
                      className="text-blue-600 hover:text-blue-900 py-1"
                    >
                      Browsing History
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to=""
                      className="text-blue-600 hover:text-blue-900 py-1"
                    >
                      Account
                    </Link>
                  </li>
                </ul>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SignInMenu;
