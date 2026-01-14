// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown, X, Star, Briefcase, Tag, ArrowUpDown, Filter } from 'lucide-react';

// export interface FilterSortState {
//   priceSort: 'none' | 'gtToLow' | 'lowTogt';
//   category: string;
//   experienceSort: 'none' | '1+' | '3+' | '5+' | '10+';
//   ratingFilter: number | null;
// }

// interface Category {
//   id: string;
//   category: string;
// }

// interface Props {
//   filters: FilterSortState;
//   setFilters: (state: FilterSortState) => void;
//   categories: Category[];
// }

// const FilterSortComponentSample: React.FC<Props> = ({ filters, setFilters, categories }) => {
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   const updateFilters = (updated: Partial<FilterSortState>) => {
//     setFilters({ ...filters, ...updated });
//   };

//   const clearFilters = () => {
//     setFilters({
//       priceSort: 'none',
//       category: '',
//       experienceSort: 'none',
//       ratingFilter: null,
//     });
//     setActiveDropdown(null);
//   };

//   // Helper to check if any filter is active
//   const hasActiveFilters =
//     filters.category !== '' ||
//     filters.priceSort !== 'none' ||
//     filters.experienceSort !== 'none' ||
//     filters.ratingFilter !== null;

//   return (
//     <div className="flex flex-wrap items-center gap-3 p-4">
//       {/* 1. Master Filter / Clear Button */}
//       <button
//         onClick={clearFilters}
//         className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all
//           ${hasActiveFilters ? 'border-primary text-primary bg-primary/5' : 'border-gray-300 text-gray-600'}`}
//       >
//         <Filter className="w-4 h-4" />
//         <span>
//           All Filters{' '}
//           {hasActiveFilters && `(${Object.values(filters).filter(v => v !== 'none' && v !== '' && v !== null).length})`}
//         </span>
//       </button>

//       <div className="h-6 w-[1px] bg-gray-300 mx-1 hidden md:block" />

//       {/* 2. Category Filter Pill */}
//       <div className="relative">
//         <button
//           onClick={() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}
//           className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all
//             ${filters.category ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 bg-white hover:border-gray-400'}`}
//         >
//           <Tag className="w-4 h-4" />
//           {categories.find(c => c.id === filters.category)?.category || 'Category'}
//           <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'cat' ? 'rotate-180' : ''}`} />
//         </button>

//         {activeDropdown === 'cat' && (
//           <div className="absolute left-0 z-50 w-56 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
//             <button
//               onClick={() => {
//                 updateFilters({ category: '' });
//                 setActiveDropdown(null);
//               }}
//               className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg"
//             >
//               All Categories
//             </button>
//             {categories.map(cat => (
//               <button
//                 key={cat.id}
//                 onClick={() => {
//                   updateFilters({ category: cat.id });
//                   setActiveDropdown(null);
//                 }}
//                 className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors ${filters.category === cat.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100'}`}
//               >
//                 {cat.category}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 3. Price Sort Pill */}
//       <div className="relative">
//         <button
//           onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
//           className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all
//             ${filters.priceSort !== 'none' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 bg-white hover:border-gray-400'}`}
//         >
//           <ArrowUpDown className="w-4 h-4" />
//           {filters.priceSort === 'lowTogt'
//             ? 'Price: Low to High'
//             : filters.priceSort === 'gtToLow'
//               ? 'Price: High to Low'
//               : 'Sort by Price'}
//           <ChevronDown className="w-4 h-4" />
//         </button>

//         {activeDropdown === 'price' && (
//           <div className="absolute left-0 z-50 w-56 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
//             {[
//               { label: 'Default', value: 'none' },
//               { label: 'Low to High', value: 'lowTogt' },
//               { label: 'High to Low', value: 'gtToLow' },
//             ].map(opt => (
//               <button
//                 key={opt.value}
//                 onClick={() => {
//                   updateFilters({ priceSort: opt.value as any });
//                   setActiveDropdown(null);
//                 }}
//                 className={`w-full px-3 py-2 text-left text-sm rounded-lg ${filters.priceSort === opt.value ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100'}`}
//               >
//                 {opt.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 4. Experience Pill */}
//       <div className="relative">
//         <button
//           onClick={() => setActiveDropdown(activeDropdown === 'exp' ? null : 'exp')}
//           className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all
//             ${filters.experienceSort !== 'none' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 bg-white hover:border-gray-400'}`}
//         >
//           <Briefcase className="w-4 h-4" />
//           {filters.experienceSort === 'none' ? 'Experience' : `${filters.experienceSort} Years`}
//           <ChevronDown className="w-4 h-4" />
//         </button>

//         {activeDropdown === 'exp' && (
//           <div className="absolute left-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
//             {['none', '1+', '3+', '5+', '10+'].map(exp => (
//               <button
//                 key={exp}
//                 onClick={() => {
//                   updateFilters({ experienceSort: exp as any });
//                   setActiveDropdown(null);
//                 }}
//                 className={`w-full px-3 py-2 text-left text-sm rounded-lg ${filters.experienceSort === exp ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100'}`}
//               >
//                 {exp === 'none' ? 'Any Experience' : `${exp} Years`}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 5. Rating Pill (Quick Toggle) */}
//       <button
//         onClick={() => updateFilters({ ratingFilter: filters.ratingFilter === 4 ? null : 4 })}
//         className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all
//           ${filters.ratingFilter === 4 ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 bg-white hover:border-gray-400'}`}
//       >
//         <Star className={`w-4 h-4 ${filters.ratingFilter === 4 ? 'fill-primary' : ''}`} />
//         4+ Rating
//       </button>

//       {/* Clear All Text Button (Only shows if filters applied) */}
//       {hasActiveFilters && (
//         <button onClick={clearFilters} className="text-sm font-semibold text-gray-500 hover:text-red-500 ml-2">
//           Reset
//         </button>
//       )}
//     </div>
//   );
// };

// export default FilterSortComponentSample;
