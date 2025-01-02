export const WinnerModal = ({
  winner,
  resetGame,
}: {
  winner: unknown;
  resetGame: () => void;
}) => {
  const winnerText =
    winner === false ? "Es un empate " : winner === "X" ? "X wins" : "O wins";

  return (
    <div className="container-winner">
      <section className="winner">
        <h2 className="text">
          {winnerText}
          <button className="footer" onClick={resetGame}>
            Play again
          </button>
        </h2>
      </section>
    </div>
  );
};
