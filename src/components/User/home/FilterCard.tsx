import React from 'react';
import { ChevronDown, Star, Briefcase, Tag, ArrowUpDown, Filter, RotateCcw, Check } from 'lucide-react';

export interface FilterSortState {
  priceSort: 'none' | 'gtToLow' | 'lowTogt';
  category: string;
  experienceSort: 'none' | '1+' | '3+' | '5+' | '10+';
  ratingFilter: number | null;
}

interface Category {
  id: string;
  category: string;
}

interface Props {
  filters: FilterSortState;
  setFilters: (state: FilterSortState) => void;
  categories: Category[];
  onReset: () => void;
}

const FilterSortComponent: React.FC<Props> = ({ filters, setFilters, categories }) => {
  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  const updateFilters = (updated: Partial<FilterSortState>) => {
    setFilters({ ...filters, ...updated });
    closeDropdown();
  };

  const clearFilters = () => {
    setFilters({
      priceSort: 'none',
      category: '',
      experienceSort: 'none',
      ratingFilter: null,
    });
  };

  const activeCount = Object.values(filters).filter(v => v !== 'none' && v !== '' && v !== null).length;
  const hasActiveFilters = activeCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-base-100">
      {/* 1. Master Reset Button */}
      <button
        onClick={clearFilters}
        className={`btn btn-sm rounded-full font-bold transition-all gap-2 
          ${hasActiveFilters ? 'btn-primary shadow-md' : 'btn-outline border-base-300'}`}
      >
        <Filter className="w-4 h-4" />
        {hasActiveFilters ? `Filters (${activeCount})` : 'All Filters'}
      </button>

      <div className="divider divider-horizontal mx-0 hidden md:flex" />

      {/* 2. Category Filter (Fixed Dropdown) */}
      <div className="dropdown dropdown-bottom">
        <label
          tabIndex={0}
          className={`btn btn-sm rounded-full btn-ghost border-base-300 border font-medium gap-2
            ${filters.category ? 'bg-primary/10 text-primary border-primary' : 'bg-base-100'}`}
        >
          <Tag className="w-4 h-4" />
          {categories.find(c => c.id === filters.category)?.category || 'Category'}
          <ChevronDown className="w-3 h-3 opacity-50" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[50] menu p-2 shadow-2xl bg-base-100 rounded-xl w-60 mt-2 border border-base-200"
        >
          <li className="menu-title text-xs">Select Category</li>
          <li>
            <button
              className={`flex justify-between ${filters.category === '' ? 'active' : ''}`}
              onClick={() => updateFilters({ category: '' })}
            >
              All Categories
              {filters.category === '' && <Check className="w-4 h-4" />}
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button
                className={`flex justify-between ${filters.category === cat.id ? 'active' : ''}`}
                onClick={() => updateFilters({ category: cat.id })}
              >
                {cat.category}
                {filters.category === cat.id && <Check className="w-4 h-4" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown dropdown-bottom">
        <label
          tabIndex={0}
          className={`btn btn-sm rounded-full btn-ghost border-base-300 border font-medium gap-2
            ${filters.priceSort !== 'none' ? 'bg-primary/10 text-primary border-primary' : 'bg-base-100'}`}
        >
          <ArrowUpDown className="w-4 h-4" />
          {filters.priceSort === 'lowTogt'
            ? 'Price: Low-High'
            : filters.priceSort === 'gtToLow'
              ? 'Price: High-Low'
              : 'Price'}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[50] menu p-2 shadow-2xl bg-base-100 rounded-xl w-52 mt-2 border border-base-200"
        >
          <li>
            <button onClick={() => updateFilters({ priceSort: 'none' })}>Default</button>
          </li>
          <li>
            <button onClick={() => updateFilters({ priceSort: 'lowTogt' })}>Low to High</button>
          </li>
          <li>
            <button onClick={() => updateFilters({ priceSort: 'gtToLow' })}>High to Low</button>
          </li>
        </ul>
      </div>

      <div className="dropdown dropdown-bottom">
        <label
          tabIndex={0}
          className={`btn btn-sm rounded-full btn-ghost border-base-300 border font-medium gap-2
            ${filters.experienceSort !== 'none' ? 'bg-primary/10 text-primary border-primary' : 'bg-base-100'}`}
        >
          <Briefcase className="w-4 h-4" />
          {filters.experienceSort === 'none' ? 'Experience' : `${filters.experienceSort} Years`}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[50] menu p-2 shadow-2xl bg-base-100 rounded-xl w-48 mt-2 border border-base-200"
        >
          {['none', '1+', '3+', '5+', '10+'].map(exp => (
            <li key={exp}>
              <button onClick={() => updateFilters({ experienceSort: exp as any })}>
                {exp === 'none' ? 'Any Experience' : `${exp} Years`}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => updateFilters({ ratingFilter: filters.ratingFilter === 4 ? null : 4 })}
        className={`btn btn-sm rounded-full btn-ghost border-base-300 border font-medium gap-2 transition-all
          ${filters.ratingFilter === 4 ? 'bg-primary/10 text-primary border-primary' : 'bg-base-100 hover:bg-base-200'}`}
      >
        <Star className={`w-4 h-4 ${filters.ratingFilter === 4 ? 'fill-primary text-primary' : 'text-gray-400'}`} />
        4+ Rating
      </button>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="btn btn-ghost btn-sm text-error hover:bg-error/10 ml-2">
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      )}
    </div>
  );
};

export default FilterSortComponent;
