import { Popover, PopoverButton, PopoverPanel, Transition, Radio, RadioGroup } from "@headlessui/react";
import { Check } from "lucide-react";
import { languages, useLanguageStore } from "../../store/LanguageStore.ts";

const LanguageSelect = () => {
  const selected = useLanguageStore((state) => state.selected);
  const setSelected = useLanguageStore((state) => state.setSelected);

  return (
    <Popover className="relative cursor-pointer">
      {({ open }) => (
        <>
          <PopoverButton className="flex gap-1 items-center">
            <img src={selected.flag} alt={selected.name} className="w-5 h-5" />
            <h5 className="text-sm font-semibold">{selected.code}</h5>
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
            <PopoverPanel className="absolute flex justify-center -left-26 px-2 mt-4 w-60 rounded-xl shadow-lg z-20 bg-gray-100">
              <RadioGroup
                value={selected}
                onChange={setSelected}
                by="code"
                className="space-y-[6px] py-4"
              >
                <p className="text-left">Select a Language : {selected?.name}</p>
                {languages.map((language) => (
                  <Radio
                    key={language.code}
                    value={language}
                    className="group flex items-center justify-between border rounded-lg p-2 shadow-md cursor-pointer transition
                               data-[checked]:border-blue-500 data-[checked]:bg-blue-100 min-w-50"
                  >
                    <span className="flex items-center gap-2 overflow-hidden">
                      <img src={language.flag} alt={language.name} className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{language.name}</span>
                    </span>
                    <Check className="opacity-0 transition group-data-[checked]:opacity-100" />
                  </Radio>
                ))}
              </RadioGroup>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default LanguageSelect;
