// TODO: Add tile movement to state

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

interface MovingTile {
  tile: number;
  direction: Direction;
}

export interface KlotskiState {
  board: number[][];
  movingTile: MovingTile | null;
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
  const { board } = state;
  let blankTileX = board.filter((row) => row.includes(0))[0].indexOf(0);
  let blankTileY = board.findIndex((row) => row.includes(0));
  // Move tile up
  if (action.direction === Direction.Up && blankTileY < board.length - 1) {
    const boardCopy = board.map((row) => row.map((item) => item));
    boardCopy[blankTileY][blankTileX] = boardCopy[blankTileY + 1][blankTileX];
    boardCopy[blankTileY + 1][blankTileX] = 0;
    return { ...state, board: boardCopy };
  }
  // Move tile down
  if (action.direction === Direction.Down && blankTileY > 0) {
    const boardCopy = board.map((row) => row.map((item) => item));
    boardCopy[blankTileY][blankTileX] = boardCopy[blankTileY - 1][blankTileX];
    boardCopy[blankTileY - 1][blankTileX] = 0;
    return { ...state, board: boardCopy };
  }
  // Move tile left
  if (action.direction === Direction.Left && blankTileX < board.length - 1) {
    const boardCopy = board.map((row) => row.map((item) => item));
    boardCopy[blankTileY][blankTileX] = boardCopy[blankTileY][blankTileX + 1];
    boardCopy[blankTileY][blankTileX + 1] = 0;
    return { ...state, board: boardCopy };
  }
  // Move tile right
  if (action.direction === Direction.Right && blankTileX > 0) {
    const boardCopy = board.map((row) => row.map((item) => item));
    boardCopy[blankTileY][blankTileX] = boardCopy[blankTileY][blankTileX - 1];
    boardCopy[blankTileY][blankTileX - 1] = 0;
    return { ...state, board: boardCopy };
  }
  return state;
};

const moveTileReducer = (
  state: KlotskiState,
  action: MoveTileAction
): KlotskiState => {
  const { board } = state;
  // Move tile up
  if (board[action.tileY - 1]?.[action.tileX] === 0) {
    const boardCopy = board.map((row) => row.map((item) => item));
    const movingTile = boardCopy[action.tileY][action.tileX];
    boardCopy[action.tileY - 1][action.tileX] = movingTile;
    boardCopy[action.tileY][action.tileX] = 0;
    return {
      ...state,
      board: boardCopy,
      movingTile: { tile: movingTile, direction: Direction.Up },
    };
  }
  // Move tile down
  if (board[action.tileY + 1]?.[action.tileX] === 0) {
    const boardCopy = board.map((row) => row.map((item) => item));
    const movingTile = boardCopy[action.tileY][action.tileX];
    boardCopy[action.tileY + 1][action.tileX] = movingTile;
    boardCopy[action.tileY][action.tileX] = 0;
    return {
      ...state,
      board: boardCopy,
      movingTile: { tile: movingTile, direction: Direction.Down },
    };
  }
  // Move tile left
  if (board[action.tileY][action.tileX - 1] === 0) {
    const boardCopy = board.map((row) => row.map((item) => item));
    const movingTile = boardCopy[action.tileY][action.tileX];
    boardCopy[action.tileY][action.tileX - 1] = movingTile;
    boardCopy[action.tileY][action.tileX] = 0;
    return {
      ...state,
      board: boardCopy,
      movingTile: { tile: movingTile, direction: Direction.Left },
    };
  }
  // Move tile right
  if (board[action.tileY][action.tileX + 1] === 0) {
    const boardCopy = board.map((row) => row.map((item) => item));
    const movingTile = boardCopy[action.tileY][action.tileX];
    boardCopy[action.tileY][action.tileX + 1] = movingTile;
    boardCopy[action.tileY][action.tileX] = 0;
    return {
      ...state,
      board: boardCopy,
      movingTile: { tile: movingTile, direction: Direction.Right },
    };
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
