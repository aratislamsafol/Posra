import { Fragment } from "react";
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        {/* Modal panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="translate-y-10 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-10 opacity-0"
          >
            <DialogPanel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <DialogTitle className="text-xl font-bold mb-4">Arat</DialogTitle>
              <p>
                This is your animated modal content.
              </p>

              <div className="mt-4 text-right">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
