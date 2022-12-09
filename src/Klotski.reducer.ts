// TODO: Add tile movement to state

export type KlotskiState = number[][];

export enum Direction {
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

export type KlotskiAction = MoveInDirectionAction | MoveTileAction;

const moveInDirectionReducer = (
  state: KlotskiState,
  action: MoveInDirectionAction
): KlotskiState => {
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
};

const moveTileReducer = (
  state: KlotskiState,
  action: MoveTileAction
): KlotskiState => {
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
  return state;
};

const klotskiReducer = (
  state: KlotskiState,
  action: KlotskiAction
): KlotskiState => {
  if (action.type === "moveInDirection") {
    return moveInDirectionReducer(state, action);
  }
  if (action.type === "moveTile") {
    return moveTileReducer(state, action);
  }
  return state;
};

export default klotskiReducer;
