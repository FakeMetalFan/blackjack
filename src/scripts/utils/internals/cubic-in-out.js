export const easeWithCubicInOut = dt => dt < .5
  ? 4 * dt ** 3
  : (dt - 1) * (2 * dt - 2) * (2 * dt - 2) + 1;
