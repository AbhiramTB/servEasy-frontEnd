import { useRef } from 'react';

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
    }
  };

  return { modalRef, openModal, closeModal };
};

export default useModal;
