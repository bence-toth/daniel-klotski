import { useReducer, useCallback, useEffect } from "react";

import klotskiReducer, { Direction } from "./Klotski.reducer";
import { shuffleTiles } from "./Klotski.utility";

import "./Klotski.css";
import classNames from "classnames";

interface KlotskiProps {
  size: number;
  image: string;
}

const Klotski = ({ size, image }: KlotskiProps) => {
  const [boardState, dispatchBoardAction] = useReducer(klotskiReducer, {
    board: shuffleTiles(size),
    movingTile: null,
  });

  const windowKeypressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (boardState.movingTile !== null) {
        return;
      }
      if (["ArrowUp", "KeyW"].includes(event.code)) {
        dispatchBoardAction({
          type: "moveInDirection",
          direction: Direction.Up,
        });
      }
      if (["ArrowDown", "KeyS"].includes(event.code)) {
        dispatchBoardAction({
          type: "moveInDirection",
          direction: Direction.Down,
        });
      }
      if (["ArrowLeft", "KeyA"].includes(event.code)) {
        dispatchBoardAction({
          type: "moveInDirection",
          direction: Direction.Left,
        });
      }
      if (["ArrowRight", "KeyD"].includes(event.code)) {
        dispatchBoardAction({
          type: "moveInDirection",
          direction: Direction.Right,
        });
      }
    },
    [boardState.movingTile, dispatchBoardAction]
  );

  useEffect(() => {
    window.addEventListener("keydown", windowKeypressHandler);
    return () => {
      window.removeEventListener("keydown", windowKeypressHandler);
    };
  }, [windowKeypressHandler]);

  return (
    <div className="klotski-wrapper">
      <div className="klotski">
        {boardState.board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{ height: `${100 / size}%` }}
            data-items={row.join(" , ")}
          >
            {row.map((tile, columnIndex) => (
              <div
                key={columnIndex}
                style={{ width: `${100 / size}%` }}
                className={classNames("tile", {
                  // "is-moving-up":
                  //   boardState.movingTile?.tile === tile &&
                  //   boardState.movingTile?.direction === Direction.Up,
                  // "is-moving-down":
                  //   boardState.movingTile?.tile === tile &&
                  //   boardState.movingTile?.direction === Direction.Down,
                  // "is-moving-right":
                  //   boardState.movingTile?.tile === tile &&
                  //   boardState.movingTile?.direction === Direction.Right,
                  // "is-moving-left":
                  //   boardState.movingTile?.tile === tile &&
                  //   boardState.movingTile?.direction === Direction.Left,
                })}
              >
                {tile !== 0 && (
                  <button
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: `${size * 100}%`,
                      backgroundPosition: `${
                        100 * ((tile % size) / (size - 1))
                      }% ${(100 * Math.floor(tile / size)) / (size - 1)}%`,
                    }}
                    onClick={() => {
                      dispatchBoardAction({
                        type: "moveTile",
                        tileX: columnIndex,
                        tileY: rowIndex,
                      });
                    }}
                  >
                    <span className="number">{tile + 1}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Klotski;
