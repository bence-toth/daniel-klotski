import { useReducer, useCallback, useEffect } from "react";

import "./Klotski.css";

interface KlotskiProps {
  size: number;
  image: string;
}

type KlotskiState = number[][];

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

interface MoveInDirectionAction {
  type: "moveInDirection";
  direction: Direction;
}

interface MoveTileAction {
  type: "moveTile";
  tileX: number;
  tileY: number;
}

type KlotskiAction = MoveInDirectionAction | MoveTileAction;

const shuffleTiles = (size: number) =>
  Array(size ** 2)
    .fill(null)
    .map((_, index) => index)
    .reduce(
      (carry: number[][], _, index, original) =>
        index % size === 0
          ? [...carry, ...[original.slice(index, index + size)]]
          : carry,
      []
    );

const klotskiReducer = (
  state: KlotskiState,
  action: KlotskiAction
): KlotskiState => {
  if (action.type === "moveInDirection") {
    let blankTileX = state.filter((row) => row.includes(0))[0].indexOf(0);
    let blankTileY = state.findIndex((row) => row.includes(0));
    // Move tile up
    if (action.direction === Direction.Up && blankTileY < state.length - 1) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[blankTileY][blankTileX] = stateCopy[blankTileY + 1][blankTileX];
      stateCopy[blankTileY + 1][blankTileX] = 0;
      return stateCopy;
    }
    // Move tile down
    if (action.direction === Direction.Down && blankTileY > 0) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[blankTileY][blankTileX] = stateCopy[blankTileY - 1][blankTileX];
      stateCopy[blankTileY - 1][blankTileX] = 0;
      return stateCopy;
    }
    // Move tile left
    if (action.direction === Direction.Left && blankTileX < state.length - 1) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[blankTileY][blankTileX] = stateCopy[blankTileY][blankTileX + 1];
      stateCopy[blankTileY][blankTileX + 1] = 0;
      return stateCopy;
    }
    // Move tile right
    if (action.direction === Direction.Right && blankTileX > 0) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[blankTileY][blankTileX] = stateCopy[blankTileY][blankTileX - 1];
      stateCopy[blankTileY][blankTileX - 1] = 0;
      return stateCopy;
    }
    return state;
  }

  if (action.type === "moveTile") {
    // Move tile up
    if (state[action.tileY - 1]?.[action.tileX] === 0) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[action.tileY - 1][action.tileX] =
        stateCopy[action.tileY][action.tileX];
      stateCopy[action.tileY][action.tileX] = 0;
      return stateCopy;
    }
    // Move tile down
    if (state[action.tileY + 1]?.[action.tileX] === 0) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[action.tileY + 1][action.tileX] =
        stateCopy[action.tileY][action.tileX];
      stateCopy[action.tileY][action.tileX] = 0;
      return stateCopy;
    }
    // Move tile left
    if (state[action.tileY][action.tileX - 1] === 0) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[action.tileY][action.tileX - 1] =
        stateCopy[action.tileY][action.tileX];
      stateCopy[action.tileY][action.tileX] = 0;
      return stateCopy;
    }
    // Move tile right
    if (state[action.tileY][action.tileX + 1] === 0) {
      const stateCopy = state.map((row) => row.map((item) => item));
      stateCopy[action.tileY][action.tileX + 1] =
        stateCopy[action.tileY][action.tileX];
      stateCopy[action.tileY][action.tileX] = 0;
      return stateCopy;
    }
  }
  return state;
};

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
                    {tile}
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
