import { useReducer } from "react";

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
    .map((_, index) => index + 1)
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
    switch (action.direction) {
      case Direction.Up:
      case Direction.Right:
      case Direction.Down:
      case Direction.Left:
        return state;
    }
  }
  if (action.type === "moveTile") {
    return state;
  }
  return state;
};

const Klotski = ({ size, image }: KlotskiProps) => {
  console.log(shuffleTiles(5));
  const [klotskiState, klotskiDispatch] = useReducer(
    klotskiReducer,
    shuffleTiles(size)
  );
  return (
    <div className="klotski-wrapper">
      <div className="klotski">
        {klotskiState.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{ height: `${100 / size}%` }}
          >
            {row.map((tile, columnIndex) => (
              <div
                key={columnIndex}
                className="tile"
                style={{ width: `${100 / size}%` }}
              >
                {tile !== size ** 2 && <button>{tile}</button>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Klotski;
