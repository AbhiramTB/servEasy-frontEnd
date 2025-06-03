import React, { useState } from "react";
import { X } from "lucide-react";

interface BrowseCategoriesProps {
  categories: {id:string,category:string}[];
  onClickCategory?: (category: string) => void;
  onClearCategory?: () => void;
}

const BrowseCategories: React.FC<BrowseCategoriesProps> = ({
  categories,
  onClickCategory,
  onClearCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    const isSelected = selectedCategory === category;
    const newSelection = isSelected ? null : category;

    setSelectedCategory(newSelection);
    if (isSelected) {
      onClearCategory?.();
    } else {
      onClickCategory?.(category);
    }
  };

  const handleClear = () => {
    setSelectedCategory(null);
    onClearCategory?.();
  };

  // Sample categories for demo
  const sampleCategories = categories?.length ? categories : [
    { id: '1', category: 'Technology' },
    { id: '2', category: 'Design' },
    { id: '3', category: 'Marketing' },
    { id: '4', category: 'Business' },
    { id: '5', category: 'Finance' },
    { id: '6', category: 'Health' },
    { id: '7', category: 'Education' },
    { id: '8', category: 'Travel' },
    { id: '9', category: 'Food' },
    { id: '10', category: 'Sports' },
    { id: '11', category: 'Music' },
    { id: '12', category: 'Art' }
  ];

  return (
    <div className="max-w-6xl mx-auto ">
      
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-base-content ">
          Browse Categories
        </h1>
        <p className="text-base-content/70">
          Select a category to explore related content
        </p>
      </div>

      {/* Clear Button */}
      {selectedCategory && (
        <div className="text-center mb-8">
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 px-4 py-2 bg-base-200  text-base-content hover:bg-accent rounded-lg border border-base-300 transition-colors"
          >
            <X size={16} />
            Clear Selection
          </button>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {sampleCategories.map((categoryObj) => (
          <button
            key={categoryObj.id}
            onClick={() => handleCategoryClick(categoryObj.category)}
            className={`p-4 rounded-lg border text-center transition-colors ${
              selectedCategory === categoryObj.category
                ? "bg-primary text-primary-content border-primary shadow-lg"
                : "bg-base-100 text-base-content border-base-300 hover:bg-base-200 hover:border-base-400"
            }`}
          >
            <span className="font-medium text-sm">
              {categoryObj.category}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Category Display */}
      {selectedCategory && (
        <div className="text-center p-6 bg-base-100 rounded-lg border border-base-300">
          <h2 className="text-xl font-semibold text-base-content mb-2">
            Selected Category
          </h2>
          <p className="text-lg text-primary font-medium">
            {selectedCategory}
          </p>
        </div>
      )}

    </div>
  );
};

export default BrowseCategories;