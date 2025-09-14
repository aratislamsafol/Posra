import { Dialog, Transition, TransitionChild, DialogPanel } from "@headlessui/react";
import { Fragment } from "react";
import RippleButton from "../Button/RippleButton";
import { Search } from "lucide-react";

type OffCanvasProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const OffCanvasMenu = ({ open, setOpen, modalOpen, setModalOpen }: OffCanvasProps) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        {/* Overlay fade */}
        <TransitionChild
          as={Fragment}
          enter="transition-transform ease-out duration-400"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform ease-in duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>

        {/* Sidebar from right */}
        <div className="fixed inset-0 flex justify-end">
          <TransitionChild
            as={Fragment}
            enter="transition-transform ease-out duration-300"
            enterFrom="translate-x-full"   
            enterTo="translate-x-0"
            leave="transition-transform ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"    
          >
            <DialogPanel className="relative bg-gray-800 text-white w-64 p-4">
              <button
                onClick={() => setOpen(false)}
                className="text-right block w-full mb-4 text-white"
              >
                ✖ Close
              </button>
              <div className="">
                <RippleButton modalOpen={modalOpen} setModalOpen={setModalOpen}>Search <Search size={14} /> </RippleButton>
              </div>
              <ul className="space-y-2">
                <li>🏠 Home</li>
                <li>📄 About</li>
                <li>📞 Contact</li>
              </ul>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OffCanvasMenu;
