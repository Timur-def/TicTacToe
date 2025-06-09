import './Figure.css'

export default function Figure({figuresMap, chooseFigure}) {
  return (
    <div className="figursPlayers">
      {figuresMap.map((elem, key) => (
        <div
          key={key}
          style={{
            width: `${elem.height * 25}px`,
            backgroundColor: elem.figure === "crest" ? "#ff3a3a" : "#4949ff",
          }}
          className="figure"
          onClick={() => chooseFigure(elem)}
        />
      ))}
    </div>
  );
}
