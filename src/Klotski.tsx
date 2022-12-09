import { useReducer, useCallback, useEffect } from "react";

import klotskiReducer, { Direction } from "./Klotski.reducer";
import { shuffleTiles } from "./Klotski.utility";

import "./Klotski.css";

interface KlotskiProps {
  size: number;
  image: string;
}

const Klotski = ({ size, image }: KlotskiProps) => {
  const [klotskiState, klotskiDispatch] = useReducer(
    klotskiReducer,
    shuffleTiles(size)
  );

  const windowKeypressHandler = useCallback((event: KeyboardEvent) => {
    if (["ArrowUp", "KeyW"].includes(event.code)) {
      klotskiDispatch({ type: "moveInDirection", direction: Direction.Up });
    }
    if (["ArrowDown", "KeyS"].includes(event.code)) {
      klotskiDispatch({ type: "moveInDirection", direction: Direction.Down });
    }
    if (["ArrowLeft", "KeyA"].includes(event.code)) {
      klotskiDispatch({ type: "moveInDirection", direction: Direction.Left });
    }
    if (["ArrowRight", "KeyD"].includes(event.code)) {
      klotskiDispatch({
        type: "moveInDirection",
        direction: Direction.Right,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", windowKeypressHandler);
    return () => {
      window.removeEventListener("keydown", windowKeypressHandler);
    };
  }, [windowKeypressHandler]);

  return (
    <div className="klotski-wrapper">
      <div className="klotski">
        {klotskiState.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{ height: `${100 / size}%` }}
            data-items={row.join(" , ")}
          >
            {row.map((tile, columnIndex) => (
              <div
                key={columnIndex}
                className="tile"
                style={{ width: `${100 / size}%` }}
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
                    onClick={() =>
                      klotskiDispatch({
                        type: "moveTile",
                        tileX: columnIndex,
                        tileY: rowIndex,
                      })
                    }
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
