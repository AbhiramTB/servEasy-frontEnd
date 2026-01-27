import { RefreshCw } from 'lucide-react';

interface ReloadButtonProps {
  reloadAction: () => void;
}

export const ReloadButton: React.FC<ReloadButtonProps> = ({ reloadAction }) => {
  return (
    <button
      onClick={reloadAction}
      className="p-2 rounded-lg hover:bg-primary hover:text-primary-content text-base-content   "
      aria-label="Reload"
    >
      <RefreshCw className="w-5 h-5  " />
    </button>
  );
};
