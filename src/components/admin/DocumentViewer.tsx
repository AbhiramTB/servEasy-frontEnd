
interface DocumentViewerProps {
  documents: string[];
  onImagePreview: (url: string) => void;
}

// Document Viewer Component
const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents, onImagePreview }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 border rounded-lg border-base-300 bg-base-100">
        <p className="text-sm text-base-content/50">No documents provided</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.length === 1 ? (
        <div
          className="w-full h-40 overflow-hidden transition-colors border rounded-lg cursor-pointer border-base-300 hover:border-primary/50"
          onClick={() => onImagePreview(documents[0])}
        >
          <img
            src={documents[0]}
            alt="Verification Document"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        // Multiple documents - grid layout
        <div className="grid grid-cols-2 gap-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="h-32 overflow-hidden transition-colors border rounded-lg cursor-pointer border-base-300 hover:border-primary/50"
              onClick={() => onImagePreview(doc)}
            >
              <img
                src={doc}
                alt={`Verification Document ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-base-content/50">
        {documents.length === 1 
          ? "Click to view document" 
          : `${documents.length} documents - Click any to view`
        }
      </p>
    </div>
  );
};
export default DocumentViewer