import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Button,
} from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import SelectData from '../DropDown/SelectData';

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ open, setOpen }: ModalProps) => {
  return (
    <Transition appear={true} show={open} as={Fragment}>
      <Dialog as="div" onClose={setOpen} className="relative z-50">
        {/* overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        </TransitionChild>

        {/* modal box */}
        <div className="fixed inset-0 flex items-center justify-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="flex flex-col gap-2 w-full max-w-md max-h-[50%] rounded-xl bg-white shadow-xl transform transition-all backdrop-blur-2xl">
              <DialogTitle
                as="h3"
                className="flex justify-between items-center text-base rounded-t-xl font-semibold px-3 py-4 bg-gray-100"
              >
                <p className="text-gray-800">Choose your location</p>
                <Button
                  onClick={() => setOpen(false)}
                  className="data-hover:cursor-pointer data-hover:text-red-600 text-gray-800 rounded"
                >
                  <X className="w-5" />
                </Button>
              </DialogTitle>
              <p className=" text-black text-sm px-3">
                Please note that delivery options and estimated delivery times
                may vary by location.
              </p>
              <Link
                to=""
                className="transition-all mx-3 bg-amber-300 hover:text-gray-800 hover:bg-amber-400/90 flex justify-center p-[6px] text-base rounded-full"
              >
                Sign in to see your address
              </Link>

              {/* Searching Data */}
              <SelectData onClose={setOpen}/>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
