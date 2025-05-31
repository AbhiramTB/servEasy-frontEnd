interface Props {
  onSearch: (query: string) => void;
}

const ServiceSearchBar: React.FC<Props> = ({ onSearch }) => {
  return (
    <div className="flex items-center w-full gap-2 px-4 py-2">
      <input
        type="text"
        placeholder="Search for services"
        className="w-full bg-transparent outline-none text-base-content text-md"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110 2.5a7.5 7.5 0 016.65 14.15z" />
        </svg>
      </button>
    </div>
  );
};

export default ServiceSearchBar;
