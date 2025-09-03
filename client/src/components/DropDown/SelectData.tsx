import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Field, Label, Select, Button } from "@headlessui/react";

type LocationData = {
  Bangladesh: {
    Divisions: {
      [key: string]: string[];
    };
  };
};

type FormState =  {
    division: string;
    district: string;
}

const SelectData = ({onClose}) => {
  const { location } = useLoaderData() as { location: LocationData };
  const divisions = Object.keys(location.Bangladesh.Divisions);

  const [formData, setFormData] = useState<FormState>({
    division: divisions[0],
    district: location.Bangladesh.Divisions[divisions[0]][0]
  });
  
   // districts based on selected division
  const districts = location.Bangladesh.Divisions[formData.division];
  const handelDivision = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectDivision = e.target.value;
    setFormData({
        division: newSelectDivision,
        district: location.Bangladesh.Divisions[newSelectDivision][0]
    }
    )
  }

  const handleDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev)=> ({
        ...prev,
        district: e.target.value
    }))
  }


   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(false);
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} action="">
      <div className="px-3 grid grid-cols-3 gap-2 mt-2">
        {/* Division Select */}
        <Field className="col-span-1">
          <Label className="block text-sm text-gray-900 font-medium mb-1">
            Select Division
          </Label>
          <Select
            className="w-full rounded-md border p-2 focus:not-data-focus:outline-none"
            value={formData.division}
            onChange={handelDivision}
          >
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </Select>
        </Field>

        {/* District Select */}
        <Field className="col-span-2">
          <Label className="block text-sm text-gray-900 font-medium mb-1">
            Select District
          </Label>
          <Select value= {formData.district} onChange= {handleDistrict} className="w-full rounded-md border p-2 focus:not-data-focus:outline-none">
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="mt-4 flex justify-end p-2 px-3">
        <Button type="submit" className="px-3 py-1 data-hover:cursor-pointer data-hover:bg-amber-400 text-sm bg-amber-300 text-gray-900 rounded-lg font-medium">
          Done
        </Button>
      </div>
    </form>
  );
};

export default SelectData;
