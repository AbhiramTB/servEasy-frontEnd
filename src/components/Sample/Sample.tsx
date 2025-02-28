// // Modal.tsx
// import React from 'react';
// import useModal from './useModal';

// interface ModalProps {
//   title: string;
//   content: React.ReactNode;
//   buttonText: string;
// }

// const Modal: React.FC<ModalProps> = ({ title, content, buttonText }) => {
//   const { modalRef, openModal, closeModal } = useModal();

//   return (
//     <>
//       <button className="btn" onClick={openModal}>{buttonText}</button> {/* Button to open modal */}
//       <dialog ref={modalRef} className="modal">
//         <div className="modal-box">
//           <form method="dialog">
//             {/* If there is a button in the form, it will close the modal */}
//             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
//           </form>
//           <h3 className="font-bold text-lg">{title}</h3>
//           <div className="py-4">{content}</div>
//         </div>
//       </dialog>
//     </>
//   );
// };

// export default Modal;
