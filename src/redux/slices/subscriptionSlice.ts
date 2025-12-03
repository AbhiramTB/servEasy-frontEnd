import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: true,
};

const modalSlice = createSlice({
  name: "subscriptionModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;




