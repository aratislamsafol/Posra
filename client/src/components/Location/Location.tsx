import { Fragment, useState } from "react";
import Modal from "../UI/Modal";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import { MapPinHouse } from "lucide-react";

const Location = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button as={Fragment}>
        {({ active, hover }) => (
          <button
            className={clsx(
              "rounded px-2 py-1 sm:text-sm md:text-base cursor-pointer",
              !hover && !active && " border border-transparent",
              hover && !active && "border border-gray-500",
              active && "border border-sky-200"
            )} onClick={()=>setOpen(true)}
          >
            <p className={`text-sm/4 font-semibold text-gray-600`}>
              Deliver to, <br />
              <span className="font-bold text-amber-600 flex items-center gap-0.5">
                <MapPinHouse className="w-4" /> Bangladesh
              </span>
            </p>
          </button>
        )}
      </Button>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Location;
