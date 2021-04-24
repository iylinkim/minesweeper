import React, { useState } from "react";
import "scss/app.scss";
import { generateCells } from "utils";
import Button from "./Button";
import NumberDisplay from "./NumberDisplay";

const App: React.FC = () => {
  const [cells, setCells] = useState(generateCells());

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex} - ${colIndex}`}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
        />
      ))
    );
  };

  return (
    <div className="app">
      <div className="header">
        <NumberDisplay value={0} />
        <div className="face">
          <span role="img" >😀</span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className="body">{renderCells()}</div>
    </div>
  );
};

export default App;
