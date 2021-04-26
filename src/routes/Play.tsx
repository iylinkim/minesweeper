import { MAX_COLS, MAX_ROWS } from "../constants";
import React, { useEffect, useState } from "react";
import "scss/app.scss";
import { Cell, CellState, CellValue, Face } from "types";
import { generateCells, openMultipleCells } from "utils";
import Button from "components/Button";
import Header from "components/Header";

const Play: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    // const location_state = location.state;
    // if(location_state !== undefined ){
    //    setCellNum(location_state);
    // }else{
    //   history.push("/")
    // }
  }, []);

  useEffect(() => {
    const handleMouseDown = (): void => setFace(Face.oh);
    const handleMouseUp = (): void => setFace(Face.smile);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [live, time]);

  useEffect(() => {
    if (hasLost) {
      setLive(false);
      setFace(Face.lost);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setLive(false);
      setFace(Face.won);
    }
  }, [hasWon]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();
    let currentCell = newCells[rowParam][colParam];

    //start the game
    if (!live) {
      while (currentCell.value === CellValue.bomb) {
        newCells = generateCells();
        currentCell = newCells[rowParam][colParam];
      }
      setLive(true);
    }

    if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      // click the bomb
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      //click the number cell
      newCells[rowParam][colParam].state = CellState.visible;
    }

    //Check to see if you have won
    let openCellsExist = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];

        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.open
        ) {
          openCellsExist = true;
          break;
        }
      }
    }

    if (!openCellsExist) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        })
      );

      setHasWon(true);
    }

    setCells(newCells);
  };

  const handleCellContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (!live) return; //if it's not started do nothing

    const currentCells = cells.slice(); //copy cells
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.open) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex} - ${colIndex}`}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
          onClick={handleCellClick}
          onContext={handleCellContext}
          red={cell.red}
        />
      ))
    );
  };

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return { ...cell, state: CellState.visible };
        }

        return cell;
      })
    );
  };

  // const gridStyle:React.CSSProperties = {
  //   gridTemplateRows:`repeat(${MAX_ROWS}, 1fr)`,
  //   gridTemplateColumns:`repeat(${MAX_ROWS}, 1fr)`,
  // }

  return (
    <>
      <h1 className="title">Minesweeper</h1>
      <div className="gameState">
        {getGameState(face)}
      </div>
      <div className="app">
        <Header
          bombCounter={bombCounter}
          face={face}
          time={time}
          setLive={setLive}
          setTime={setTime}
          setCells={setCells}
          setHasLost={setHasLost}
          setHasWon={setHasWon}
        />
        <div className="body">{renderCells()}</div>
      </div>
    </>
  );
};

export default Play;

function getGameState(gameState: Face) {
  switch (gameState) {
    case Face.oh:
      return "Game in progress";
    case Face.smile:
      return "Game in progress";
    case Face.won:
      return "You won!";
    case Face.lost:
      return "You lost!";
  }
}
