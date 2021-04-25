import React from "react";
import "scss/numberDisplay.scss";

interface NumberDisplayProps {
  value: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  return (
    <div className="numberDisplay">
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, "0")}`
        : value.toString().padStart(3, "0")}
    </div>
  );
};

export default NumberDisplay;
