import { useEffect, useState } from "react";
import "./App.css";
import Figure from "./Figure/Figure";
import Board from "./Board/Board";
import WinnerWindow from "./WinnerWindow/WinnerWindow";

const board = Array(9).fill({ height: 0, figure: null }); // напоминалка: заполнает поле 9 раз данным объектом

const FigursPlayer1 = [
  { height: 1, figure: "crest" },
  { height: 2, figure: "crest" },
  { height: 3, figure: "crest" },
  { height: 4, figure: "crest" },
  { height: 5, figure: "crest" },
];

const FigursPlayer2 = [
  { height: 1, figure: "circle" },
  { height: 2, figure: "circle" },
  { height: 3, figure: "circle" },
  { height: 4, figure: "circle" },
  { height: 5, figure: "circle" },
];

function App() {
  const [actPlayer, setActPlayer] = useState(1);
  const [actFigure, setActFigure] = useState(null);
  const [poleState, setPoleState] = useState(board);
  const [winner, setWinner] = useState(null);
  const [figursPlayers1, setFigursPlayers1] = useState([...FigursPlayer1]);
  const [figursPlayers2, setFigursPlayers2] = useState([...FigursPlayer2]);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (key) => {
    if (actFigure && poleState[key] && !winner) {
      const selectPole = poleState[key];
      if (
        selectPole.height < actFigure.height &&
        selectPole.figure !== actFigure.figure
      ) {
        const newPoleState = poleState.map((pole, index) =>
          index === key
            ? { height: actFigure.height, figure: actFigure.figure }
            : pole
        );
        setPoleState(newPoleState);
        if (actPlayer === 1) {
          setFigursPlayers1((figures) =>
            figures.filter(
              (elem) =>
                elem.figure !== actFigure.figure ||
                elem.height !== actFigure.height
            )
          );
        } else {
          setFigursPlayers2((figures) =>
            figures.filter(
              (elem) =>
                elem.figure !== actFigure.figure ||
                elem.height !== actFigure.height
            )
          );
        }
        isWinner(newPoleState);
        setActPlayer(actPlayer === 1 ? 2 : 1);
      }
    }
    setActFigure(null);
  };

  const isWinner = (elem) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const combination = winningCombinations[i];
      const [a, b, c] = combination;
      if (
        elem[a].figure &&
        elem[a].figure === elem[b].figure &&
        elem[a].figure === elem[c].figure
      ) {
        setWinner(elem[a].figure === "crest" ? "Красный" : "Синий");
        return;
      }
    }
  };
  useEffect(() => {
    if (winner) {
      if (winner == "Красный") {
        setCount1((prev) => prev + 1);
      } else {
        setCount2((prev) => prev + 1);
      }
    }
  }, [winner]);

  const chooseFigure = (elem) => {
    if (
      (actPlayer === 1 && elem.figure === "crest") ||
      (actPlayer === 2 && elem.figure === "circle")
    ) {
      setActFigure(elem);
    }
  };

  const resetGame = (isNewGame) => {
    setPoleState(board);
    setActPlayer(1);
    setActFigure(null);
    setWinner(null);
    setFigursPlayers1([...FigursPlayer1]);
    setFigursPlayers2([...FigursPlayer2]);
    if (isNewGame) {
      setCount1(0);
      setCount2(0);
    }
  };
  return (
    <div className="App">
      <Figure figuresMap={figursPlayers1} chooseFigure={chooseFigure} />
      <div className="centerBlock">
        <div className="upBlock">
          <h3 className="counts">
            Счёт <span className="redText">{count1}</span> :{" "}
            <span className="blueText">{count2}</span>
          </h3>
          <h3 className="playersTable">
            Ход{" "}
            {actPlayer === 1 ? (
              <span className="redText">красного</span>
            ) : (
              <span className="blueText">синего</span>
            )}{" "}
            игрока
          </h3>
        </div>
        <Board handleClick={handleClick} poleState={poleState} />
        <div className="gameBtn" onClick={()=>resetGame(false)}>
          Сбросить
        </div>
        <div className="gameBtn" onClick={()=>resetGame(true)}>
          Новая игра
        </div>
        <WinnerWindow winner={winner} resetGame={resetGame}/>
      </div>
      <Figure figuresMap={figursPlayers2} chooseFigure={chooseFigure} />
    </div>
  );
}

export default App;
