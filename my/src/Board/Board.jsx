import './Board.css';

export default function Figure({poleState, handleClick}) {
  return (
    <div className="poleCrestsCircles">
      {poleState.map((elem, key) => (
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
