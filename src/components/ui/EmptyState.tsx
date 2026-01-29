import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'system-error' | 'no-data' | 'product-empty' | 'no-results' | 'deep-search' | 'random';
  actionText?: string;
  onAction?: () => void;
  showBorder?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Not found!',
  message = 'Try using a different search keyword.',
  icon = 'no-results',
  actionText,
  onAction,
  showBorder = true,
}) => {
  const iconMap = {
    'system-error': '/images/empty-states/system-error.avif',
    'no-data': '/images/empty-states/no-data.avif',
    'product-empty': '/images/empty-states/product-empty.avif',
    'no-results': '/images/empty-states/no-result.avif',
    'deep-search': '/images/empty-states/deep-search.avif',
  };

  const getIconSrc = () => {
    if (icon === 'random') {
      const iconKeys = Object.keys(iconMap) as Array<keyof typeof iconMap>;
      const randomIndex = Math.floor(Math.random() * iconKeys.length);
      return iconMap[iconKeys[randomIndex]];
    }
    return iconMap[icon];
  };

  const iconSrc = getIconSrc();

  return (
    <div
      className={`w-full min-h-[400px] flex items-center justify-center p-4 md:p-12 transition-all duration-300 ${
        showBorder ? 'border-2 border-dashed border-base-300 rounded-lg bg-base-200/10' : ''
      }`}
    >
      <div className="flex flex-col items-center text-center max-w-lg">
        {/* Responsive Image Container */}
        <div className="relative mb-8">
          <img
            src={iconSrc}
            alt={icon}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-auto object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-base-content">{title}</h3>
          <p className="text-sm md:text-base text-base-content font-medium">{message}</p>
        </div>

        {/* Optional Action Button */}
        {actionText && onAction && (
          <div className="mt-8">
            <button onClick={onAction} className="btn btn-primary px-8 rounded-lg normal-case">
              {actionText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
