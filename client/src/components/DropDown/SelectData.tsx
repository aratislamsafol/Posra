import { useLoaderData } from "react-router-dom";
import { Field, Label, Select, Button } from "@headlessui/react";
import { useLocationStore } from "../../store/LocationStore"; 

type LocationData = {
  Bangladesh: {
    Divisions: {
      [key: string]: string[];
    };
  };
};

type CloseState = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectData = ({ onClose }: CloseState) => {
  const { location } = useLoaderData() as { location: LocationData };
  const divisions = Object.keys(location.Bangladesh.Divisions);

  // zustand state
  const { division, district, setLocation } = useLocationStore();

  // initialize default if empty
  if (!division && !district) {
    setLocation(divisions[0], location.Bangladesh.Divisions[divisions[0]][0]);
  }

  const districts = location.Bangladesh.Divisions[division];

  const handelDivision = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDivision = e.target.value;
    setLocation(newDivision, location.Bangladesh.Divisions[newDivision][0]);
  };

  const handleDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(division, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(false);
    console.log("Form submitted:", { division, district }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-3 grid grid-cols-3 gap-2 mt-2">
        {/* Division Select */}
        <Field className="col-span-1">
          <Label className="block text-sm text-gray-900 font-medium mb-1">
            Select Division
          </Label>
          <Select
            className="w-full rounded-md border p-2 focus:not-data-focus:outline-none"
            value={division}
            onChange={handelDivision}
          >
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </Select>
        </Field>

        {/* District Select */}
        <Field className="col-span-2">
          <Label className="block text-sm text-gray-900 font-medium mb-1">
            Select District
          </Label>
          <Select
            value={district}
            onChange={handleDistrict}
            className="w-full rounded-md border p-2 focus:not-data-focus:outline-none"
          >
            {districts?.map((dis) => (
              <option key={dis} value={dis}>
                {dis}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="mt-4 flex justify-end p-2 px-3">
        <Button
          type="submit"
          className="px-3 py-1 data-hover:cursor-pointer data-hover:bg-amber-400 text-sm bg-amber-300 text-gray-900 rounded-lg font-medium"
        >
          Done
        </Button>
      </div>
    </form>
  );
};

export default SelectData;
