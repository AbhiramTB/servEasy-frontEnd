
const MiniDashboardPreview = () => {

  return (
    <div className="h-64 overflow-hidden transition-all duration-200 border rounded-lg shadow-lg bg-base-100 border-base-300 w-96 hover:shadow-xl">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-base-200 border-base-300">
        <div className="w-16 h-2 rounded-full bg-base-300"></div>
        <span className="text-xs font-medium text-base-content opacity-80">serveasy</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-base-300"></div>
        </div>
      </div>
       
      {/* Body */}
      <div className="flex h-full">
      
        {/* Sidebar */}
        <div className="w-1/4 p-2 space-y-2 border-r bg-base-200 border-base-300">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-full h-2 rounded-full ${
                i === 1 ? 'bg-primary' : i === 3 ? 'bg-accent' : 'bg-base-300'
              }`}
            ></div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 p-2 bg-base-100">
          {/* Theme name display */}
          <div className="mb-3 text-center">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10">
              find your nearby services 
            </span>
          </div>
          
          {/* Content area with buttons */}
          <div className="flex-1 p-2 space-y-2 rounded-lg bg-base-200">
            {/* Top row - stats cards */}
            <div className="flex gap-1">
              <div className="flex items-center justify-center flex-1 h-6 border rounded bg-primary/20 border-primary/30">
                <div className="w-3 h-1 rounded-full bg-primary"></div>
              </div>
              <div className="flex items-center justify-center flex-1 h-6 border rounded bg-accent/20 border-accent/30">
                <div className="w-3 h-1 rounded-full bg-accent"></div>
              </div>
            </div>
            
            {/* Middle section - chart area */}
            <div className="flex items-center justify-center h-12 border rounded bg-base-300/50 border-base-300">
              <div className="flex items-end gap-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-t ${
                      i % 2 === 0 ? 'bg-primary h-3' : 'bg-accent h-2'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Bottom section - action buttons */}
            <div className="flex gap-1">
              <button className="flex-1 h-4 bg-primary/80 hover:bg-primary rounded text-[6px] text-primary-content font-medium transition-colors duration-150">
                •
              </button>
              <button className="flex-1 h-4 bg-accent/80 hover:bg-accent rounded text-[6px] text-accent-content font-medium transition-colors duration-150">
                •
              </button>
              <button className="flex-1 h-4 bg-base-300 hover:bg-base-content/20 rounded text-[6px] transition-colors duration-150">
                •
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniDashboardPreview;