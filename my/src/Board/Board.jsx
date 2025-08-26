import { useEffect } from "react";
import "./Board.css";



export default function Board({
  poleState,
  setPoleState,
  actFigure,
  actPlayer,
  setActFigure,
  setActPlayer,
  setFigursPlayers1,
  setFigursPlayers2,
  winner,
  setWinner,
  setCount1,
  setCount2
}) {
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
  return (
    <div className="poleCrestsCircles">
      {poleState?.map((elem, key) => (
        <div key={key} className="block" onClick={() => handleClick(key)}>
          {elem.figure !== null && (
            <div
              style={{
                width: `${elem.height * 25}px`,
                backgroundColor:
                  elem.figure === "crest" ? "#ff3a3a" : "#4949ff",
              }}
              className="figure"
            />
          )}
        </div>
      ))}
    </div>
  );
}
