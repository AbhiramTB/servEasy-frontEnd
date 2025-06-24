import React from "react"

interface UploadDocumentsModalProps {
  showModal: boolean
  setShowModal: (value: boolean) => void
  invoiceFiles: File[]
  setInvoiceFiles: (files: File[]) => void
  onUpload: () => void
}

const UploadDocumentsModal: React.FC<UploadDocumentsModalProps> = ({
  showModal,
  setShowModal,
  invoiceFiles,
  setInvoiceFiles,
  onUpload,
}) => {
  if (!showModal) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInvoiceFiles(Array.from(e.target.files))
    }
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...invoiceFiles]
    updatedFiles.splice(index, 1)
    setInvoiceFiles(updatedFiles)
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Upload Bills and Documents</h3>

        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Select Files</span>
          </label>
          <input
            type="file"
            className="w-full file-input file-input-bordered"
            accept="image/jpeg,image/png,image/jpg,image/gif"
            multiple
            onChange={handleFileChange}
          />
          <label className="label">
            <span className="label-text-alt">Accepted formats: image</span>
          </label>
        </div>

        {invoiceFiles.length > 0 && (
          <div className="mt-4">
            <p className="font-medium">
              Selected Files ({invoiceFiles.length}):
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {invoiceFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative p-2 border rounded"
                >
                  <div className="flex items-center justify-center h-16 mb-1">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-contain max-w-full max-h-full"
                      onLoad={() =>
                        URL.revokeObjectURL(URL.createObjectURL(file))
                      }
                    />
                  </div>
                  <div className="text-xs truncate">{file.name}</div>
                  <button
                    className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full"
                    onClick={() => handleRemoveFile(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-action">
          <button className="btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className="btn btn-info"
            onClick={onUpload}
            disabled={invoiceFiles.length === 0}
          >
            Upload{" "}
            {invoiceFiles.length > 0 ? `(${invoiceFiles.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadDocumentsModal
