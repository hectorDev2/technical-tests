import { WinnerModal } from "./components/ModalWinner";
import { Square } from "./components/Square";
import { useBoard } from "./hooks/useBoard";

function App() {
  const { board, turn, winner, updateBoard, handleClickReset } = useBoard();

  return (
    <main className="board">
      <h1>Tic-Tac-Toe</h1>
      <section className="game">
        {board?.map((_: unknown, i: number) => (
          <Square index={i} updateBoard={updateBoard} key={i}>
            {board[i]}
          </Square>
        ))}
        <div className="turn">
          <h1>turno:</h1>
          <h2 className={`${turn !== "O" && "turn-active"}`}>x</h2>
          <h2 className={`${turn !== "X" && "turn-active"}`}>o</h2>
        </div>
        <div className="statistics">
          <h1>Statistics</h1>
          <h2 className="playerOne">X won 2 times</h2>
          <h2 className="playerOne">X won 2 times</h2>
        </div>
        //make a button to reset the game
        <button className="reset" onClick={handleClickReset}>
          Reset
        </button>
      </section>
      {winner !== null && (
        <WinnerModal winner={winner} resetGame={handleClickReset} />
      )}
    </main>
  );
}

export default App;
