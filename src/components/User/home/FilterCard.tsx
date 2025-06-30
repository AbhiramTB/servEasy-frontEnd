import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export interface FilterSortState {
  priceSort: 'none' |"gtToLow" | "lowTogt";
  category: string;
  experienceSort: 'none' | '1+' | '3+' | '5+' | '10+';
  ratingFilter: number | null;
}

interface Category {
  id: string;
  category: string;
}

interface Props {
  filters:FilterSortState
  setFilters: (state: FilterSortState) => void;
  categories: Category[];
}

const FilterSortComponent: React.FC<Props> = ({ filters,setFilters, categories }) => {
 

  const [isOpen, setIsOpen] = useState(false);

  const updateFilters = (updated: Partial<FilterSortState>) => {
    const newFilters = { ...filters, ...updated };
    setFilters(newFilters);
  };

  // const handleRatingToggle = (rating: number) => {
  //   const newRating = filters.ratingFilter === rating ? null : rating;
  //   updateFilters({ ratingFilter: newRating });
  // };

  const clearFilters = () => {
    const cleared: FilterSortState = {
      priceSort: 'none',
      category: '',
      experienceSort: 'none',
      ratingFilter: null,
    };
    setFilters(cleared);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 rounded shadow bg-base-300"
      >
        Filters
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full p-4 mt-2 rounded shadow bg-base-200">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Filter Options</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-3">
            <label className="block text-sm">Category</label>
            <select
              value={filters.category}
              onChange={(e) => updateFilters({ category: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm">Sort by Price</label>
            <select
              value={filters.priceSort}
              onChange={(e) =>

                updateFilters({ priceSort: e.target.value as FilterSortState['priceSort'] })
              }
              className="w-full p-1 border rounded"
            >
              <option value="none">None</option>
              <option value="lowTogt">Low to High</option>
              <option value="gtToLow">High to Low</option>
              
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm">Experience</label>
            <select
              value={filters.experienceSort}
              onChange={(e) =>
                updateFilters({
                  experienceSort: e.target.value as FilterSortState['experienceSort'],
                })
              }
              className="w-full p-1 border rounded"
            >
              <option value="none">Any</option>
              <option value="1">1+ Years</option>
              <option value="3">3+ Years</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
            </select>
          </div>

          {/* <div className="mb-3">
            <label className="block mb-1 text-sm">Rating</label>
            <div className="flex flex-wrap gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingToggle(rating)}
                  className={`flex items-center px-2 py-1 border rounded ${
                    filters.ratingFilter === rating
                      ? 'bg-yellow-400 text-white border-yellow-500'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  <Star className="w-4 h-4 mr-1" />
                  {rating}+
                </button>
              ))}
            </div>
          </div> */}

          <div className="flex justify-between mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Clear
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-1 text-white rounded bg-primary hover:bg-primary/80"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortComponent;
