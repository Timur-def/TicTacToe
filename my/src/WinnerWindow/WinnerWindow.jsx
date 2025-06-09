import './WinnerWindow.css'

export default function Figure({winner, resetGame}) {
  return (
    <>
      {winner && (
          <div className="winnerMessage">
            <div className="winnerWindow">
              <h2 className="h2Window">
                Победил{" "}
                {winner == "Красный" ? (
                  <span className="redText">{winner}</span>
                ) : (
                  <span className="blueText">{winner}</span>
                )}{" "}
                игрок
              </h2>
              <div className="gameBtn" onClick={()=>resetGame(false)}>
                Сбросить
              </div>
              <div className="gameBtn" onClick={()=>resetGame(true)}>
                Новая игра
              </div>
            </div>
          </div>
        )}
    </>
  );
}
