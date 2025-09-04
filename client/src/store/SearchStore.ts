import { create } from "zustand";

type Brand = {
  name: string;
  logo_url: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  brand_url: string;
};

type Category = {
  name: string;
  image_url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  categories_url: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  sku?: string;
  status: string;
  description: string;
  main_image: string;
  brand: Brand;
  category: Category;   
};

type SearchCategory = {
  _id: number | null;
  name: string;
};

type SearchState = {
  query: string;
  selectedCat: SearchCategory;
  products: Product[];          
  filteredProducts: Product[];  
  submittedFiltered: Product[];
  loading: boolean;
  error: string | null;

  setQuery: (value: string) => void;
  setSelectedCat: (category: SearchCategory) => void;
  setSubmittedFiltered: (products: Product[]) => void;
  fetchCategoryProducts: (category: SearchCategory) => Promise<void>;
};

export const useCategorySearch = create<SearchState>((set, get) => ({
  query: "",
  selectedCat: { _id: null, name: "All" },
  products: [],
  filteredProducts: [],
  submittedFiltered: [],
  loading: false,
  error: null,

  setQuery: (value) => {
    const { products } = get();
    set({
      query: value,
      filteredProducts: products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      ),
    });
  },

  setSubmittedFiltered: (products)  => set({submittedFiltered: products}),

  setSelectedCat: (category) => set({ selectedCat: category }),

  fetchCategoryProducts: async (selectedCat) => {
    if (!selectedCat._id) return;
    try {
      set({ loading: true, error: null });
      const res = await fetch(
        `http://localhost:5000/api/v1/ProductListByCategory/${selectedCat._id}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      set({
        products: data.data,
        filteredProducts: data.data.filter((p: Product) =>
          p.name.toLowerCase().includes(get().query.toLowerCase())
        ),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
