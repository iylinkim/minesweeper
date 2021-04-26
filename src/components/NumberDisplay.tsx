import React from "react";
import "scss/numberDisplay.scss";

interface NumberDisplayProps {
  value: number;
  name:string;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value, name }) => {
  return (
    <div>
      <span className='displayName'>{name === "bombCounter" ? 'Mines remain:' : "Time:"}</span>
      <div className="numberDisplay">
        {value < 0
          ? `-${Math.abs(value).toString().padStart(2, "0")}`
          : value.toString().padStart(3, "0")}
      </div>
    </div>
  );
};

export default NumberDisplay;
