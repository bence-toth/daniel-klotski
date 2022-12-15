const buildBoard = (size: number) =>
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

export { buildBoard };
