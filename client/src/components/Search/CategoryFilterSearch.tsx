import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Field,
  Input,
  Button,
} from "@headlessui/react";
import { useRef, Fragment, useEffect, useState } from "react";
import { useCategorySearch } from "../../store/SearchStore";
import { useLoaderData } from "react-router-dom";
import clsx from "clsx";
import { ChevronDown, Search } from "lucide-react";

const CategoryFilterSearch = () => {
  const {
    selectedCat,
    setSelectedCat,
    query,
    setQuery,
    fetchCategoryProducts,
    filteredProducts, 
    setSubmittedFiltered
  } = useCategorySearch();

  const [showSuggesion, setShowSuggesion] = useState<boolean>();
  const { categoriesData } = useLoaderData();
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (selectedCat) {
      fetchCategoryProducts(selectedCat);
    }
  }, [selectedCat, fetchCategoryProducts]);

  const handleCategoryChange = (category: { _id: number | null; name: string }) => {
    setSelectedCat(category);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Filter products only on submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setSubmittedFiltered([]);
      return;
    }

    const result = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setSubmittedFiltered(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border w-full rounded-md"
    >
      {/* Category Select */}
      <Listbox value={selectedCat} as={Fragment} onChange={handleCategoryChange}>
        <ListboxButton className="flex gap-2 items-center p-[6px] px-2 bg-slate-200">
          {selectedCat.name}
          <ChevronDown className="pointer-events-none size-4" aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "absolute min-w-[210px] max-w-fit rounded-xl border border-gray-600/5 bg-white p-2 [--anchor-gap:--spacing(1)] focus:outline-none",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0"
          )}
        >
          {categoriesData?.data.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className={({ active, selected }) =>
                clsx(
                  "cursor-pointer p-1 w-full rounded",
                  active && "bg-blue-500 text-white",
                  selected && "bg-blue-700 text-white"
                )
              }
            >
              {category?.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

      {/* Search Input + Button */}
      <div className="flex items-center flex-grow relative">
        <Field className="flex-grow">
          <Input
            ref={inputRef}
            placeholder="Search Posra"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value); setShowSuggesion(true)
            }}
            
            className="w-full border-none outline-none px-2 py-1"
          />

          {/* Suggestion Dropdown (input typing) */}
          {query && showSuggesion && filteredProducts.length > 0 && (
            <ul className="absolute top-10 left-0 right-0 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto z-10">
              {filteredProducts.map((p) => (
                <li
                  key={p._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {setQuery(p.name); setShowSuggesion(false)}}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </Field>

        {/* Search Button */}
        <Button
          type="submit"
          className="cursor-pointer group bg-amber-300 hover:bg-amber-400 transition ease-in p-[6px] px-2 ml-2 flex-none"
        >
          <Search className="text-gray-600 group-hover:text-gray-50" />
        </Button>
      </div>
    </form>
  );
};

export default CategoryFilterSearch;
