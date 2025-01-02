export const saveLocalStorage = (key: string, value: string) => {
  localStorage.setItem(
    key,
    key == "board" || key == "turn" ? JSON.stringify(value) : value
  );
};

export const resetLocalStorageGame = () => {
  localStorage.setItem("board", JSON.stringify(Array(9).fill(null)));
  localStorage.setItem("turn", "X");
  localStorage.setItem("winner", JSON.stringify(null));
};
