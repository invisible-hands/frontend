import create from 'zustand';

const useModalStore = create(set => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),

  closeModal: () => set({ isModalOpen: false }),
}));
export default useModalStore;
