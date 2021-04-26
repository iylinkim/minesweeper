import React, { Dispatch, SetStateAction } from "react";
import NumberDisplay from "components/NumberDisplay";
import { Cell, Face } from "types";
import { generateCells } from "utils";

interface HeaderProps {
  bombCounter: number;
  face: Face;
  time: number;
  setLive: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<number>>;
  setCells: Dispatch<SetStateAction<Cell[][]>>;
  setHasLost: Dispatch<SetStateAction<boolean>>;
  setHasWon: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  bombCounter,
  face,
  time,
  setLive,
  setTime,
  setCells,
  setHasLost,
  setHasWon,
}) => {
  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
  };

  return (
    <>
      <div className="header">
        <NumberDisplay value={bombCounter} name="bombCounter" />
        <div className="face" onClick={handleFaceClick}>
          <span role="img">{face}</span>
        </div>
        <NumberDisplay value={time} name="time" />
      </div>
    </>
  );
};

export default Header;
