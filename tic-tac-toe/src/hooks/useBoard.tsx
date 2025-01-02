import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  resetLocalStorageGame,
  saveLocalStorage,
} from "../actions/saveLocalStorage";
import { useLocalStorage } from "../actions/useLocalStorage";
type TURNS = "X" | "O";

const COMBOS_WINNERS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export const useBoard = () => {
  const [board, setBoard] = useState(() => {
    const board = window.localStorage.getItem("board");
    return board ? JSON.parse(board) : Array(9).fill(null);
  });
  const { getItem } = useLocalStorage();
  const [turn, setTurn] = useState<TURNS>("X");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [winner, setWinner] = useState<any>(null);

  const changeTurn = () => {
    if (winner) return;
    setTurn(turn === "X" ? "O" : "X");
  };

  const checkWinner = (boardToCheck: string[]) => {
    for (const combo of COMBOS_WINNERS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[b] == boardToCheck[c]
      ) {
        saveLocalStorage("turn", turn);
        saveLocalStorage("winner", boardToCheck[a]);
        return boardToCheck[a];
      }
    }
  };
  const updateBoard = (i: number) => {
    if (board[i] || winner) return;
    setBoard((prev: [string, string, string]) => {
      const newBoard = [...prev];
      newBoard[i] = turn;
      changeTurn();
      const winner = checkWinner(newBoard);
      if (winner) {
        setWinner(winner);
        const statistics = JSON.parse(getItem("statistics"));
        if (!statistics) {
          saveLocalStorage("statistics", JSON.stringify({ X: 0, O: 0 }));
        }

        saveLocalStorage("lastWinner", winner);
        confetti();
        return newBoard;
      } else if (checkEndGame(newBoard)) {
        setWinner(false);
      }
      return newBoard;
    });
  };
  const handleClickReset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
    resetLocalStorageGame();
  };

  const checkEndGame = (newBoard: string[]) => {
    return newBoard.every((square) => square !== null);
  };

  useEffect(() => {
    const statistics = getItem("statistics");

    if (winner != null)
      saveLocalStorage(
        "statistics",
        JSON.stringify({
          ...JSON.parse(statistics),
          [winner]: JSON.parse(statistics)[winner] + 1,
        })
      );
  }, [board, winner, getItem]);
  return {
    board,
    turn,
    winner,
    updateBoard,
    handleClickReset,
  };
};
