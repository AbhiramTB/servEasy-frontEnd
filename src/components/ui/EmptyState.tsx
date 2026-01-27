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
    'system-error': '/images/empty-states/system-error.png',
    'no-data': '/images/empty-states/no-data.png',
    'product-empty': '/images/empty-states/product-empty.png',
    'no-results': '/images/empty-states/no-results.png',
    'deep-search': '/images/empty-states/deep-search.png',
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
      className={`w-full min-h-[400px] flex items-center justify-center p-8 ${showBorder ? 'border-2 border-dashed border-base-300 rounded-xl' : ''}`}
    >
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <div className="absolute -top-8 -right-8 w-4 h-4 bg-warning rounded-full animate-bounce"></div>
          <div className="absolute -bottom-6 -left-8 w-5 h-5 bg-secondary rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-12 w-3 h-3 bg-accent rounded-full animate-ping"></div>
          <div
            className="absolute -top-4 -left-6 w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.5s' }}
          ></div>

          <div
            className="absolute top-8 -left-12 w-2 h-2 bg-info rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-12 -right-10 w-2 h-2 bg-success rounded-full animate-bounce"
            style={{ animationDelay: '0.7s' }}
          ></div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl transform -rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 to-warning/5 rounded-3xl transform rotate-6"></div>
            <div className="relative bg-base-100/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-base-200">
              <img src={iconSrc} alt={icon} className="w-60 h-60 object-contain" />
            </div>
          </div>

          <div className="absolute -top-6 left-8 w-12 h-12 text-secondary/20">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.63-2.09C7.31 18.63 9.75 17 12 17c2.25 0 4.69 1.63 5.66 2.91l.63 2.09 1.89-.66C18.1 16.17 16 10 7 8l5-4 5 4z" />
            </svg>
          </div>
          <div className="absolute -bottom-6 right-6 w-14 h-14 text-accent/20 transform rotate-180">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.63-2.09C7.31 18.63 9.75 17 12 17c2.25 0 4.69 1.63 5.66 2.91l.63 2.09 1.89-.66C18.1 16.17 16 10 7 8l5-4 5 4z" />
            </svg>
          </div>

          <div className="absolute top-1/3 -left-10 w-10 h-10 text-primary/15 transform -rotate-45">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2L15 8L21 9L16 14L18 21L12 17L6 21L8 14L3 9L9 8L12 2Z" />
            </svg>
          </div>
          <div className="absolute bottom-1/4 -right-12 w-8 h-8 text-warning/20 transform rotate-12">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2L15 8L21 9L16 14L18 21L12 17L6 21L8 14L3 9L9 8L12 2Z" />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-base-content mb-2">{title}</h3>
        <p className="text-base-content/60 mb-6">{message}</p>

        {actionText && onAction && (
          <button onClick={onAction} className="btn btn-primary btn-wide">
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
