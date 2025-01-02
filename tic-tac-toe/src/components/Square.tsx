interface SquareProps {
  updateBoard: (i: number) => void;
  index: number;
  children: string;
}

export const Square = ({ children, index, updateBoard }: SquareProps) => {
  // <button key={i} className="square" onClick={() => handleClick(i)}>
  //           {el}
  //         </button>

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <button key={index} className="square" onClick={handleClick}>
      {children}
    </button>
  );
};
