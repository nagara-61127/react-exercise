import { useState } from 'react';
import './connect-four.css';
import './reset.css';

type SquareProps = {
  own: string | null;
  index: number;
  onClick: () => void;
};

const Circle = ({ own, index, onClick }: SquareProps) => {
  return (
    <button
      onClick={onClick}
      // className="circle"
      className={
        'circle ' + (own === 'A' ? 'filled-a' : own === 'B' ? 'filled-b' : '')
      }
    >
      {index}
    </button>
  );
};

type CircleState = 'A' | 'B' | null;

type BoardProps = {
  circles: Array<CircleState>;
  onClick: (index: number) => void;
};

const Board = ({ circles, onClick }: BoardProps) => {
  // const row = [...Array(7)].map((_, i) => i);
  const [filled, setFilled] = useState(false);

  // fillBlank() {

  // }

  return (
    <div className="board">
      {circles.map((i, index) => (
        <Circle index={index} own={i} onClick={() => onClick(index)} />
      ))}
    </div>
  );
};

const ConnectFour = () => {
  const [circles, setCircles] = useState(Array(42).fill(null));
  const [aIsNext, setIsNext] = useState(true);
  const [result, setResult] = useState(false);

  async function fillCircle(index: number) {
    if (result) {
      return;
    }
    const rowCount = [...Array(6)].map((_, i) => i).reverse();
    const col = index % 7;
    const targetCol = rowCount.map((row) => col + row * 7);
    const target: any = targetCol.find((col) => circles[col] === null);

    const changeCircles = [...circles];
    changeCircles[target] = aIsNext ? 'A' : 'B';

    setCircles(changeCircles);

    const test = await checkResult(changeCircles, target);
    // console.log(test);

    test ? setResult(true) : setIsNext(!aIsNext);
  }

  function checkResult(circles: Array<CircleState>, index: number) {
    let vertical;
    let horizon;
    let diagonal;

    // 縦で揃ったかを判断
    if (Math.floor((index + 1) / 7) < 4) {
      let inARow = 0;
      while (circles[index] == (aIsNext ? 'A' : 'B')) {
        index += 7;
        inARow++;
      }
      vertical = inARow > 3;
    }

    return vertical;
  }

  function resetGame() {
    setCircles(Array(42).fill(null));
    setIsNext(true);
    setResult(false);
  }

  return (
    <div className="connect-four">
      <div className="status">
        {!result ? (
          <>
            Next Player:
            <span
              style={aIsNext ? { color: 'red' } : { color: 'yellow' }}
              className="status"
            >
              {aIsNext ? 'A' : 'B'}
            </span>
          </>
        ) : (
          <>Winner: {aIsNext ? 'A' : 'B'}</>
        )}
      </div>
      <Board circles={circles} onClick={(index) => fillCircle(index)} />
      <button className="restart" onClick={resetGame}>
        最初から
      </button>
    </div>
  );
};

export default ConnectFour;
