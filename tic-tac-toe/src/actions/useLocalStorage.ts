export const useLocalStorage = () => {
  return {
    getItem: (key: string) => {
      if (!key) return null;
      const item = localStorage.getItem(key);
      if (key == "board") {
        return item ? JSON.parse(item) : null;
      }
      return item;
    },
  };
};
