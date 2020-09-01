export const easeWithCubicInOut = pr => pr < .5
  ? 4 * pr ** 3
  : (pr - 1) * (2 * pr - 2) * (2 * pr - 2) + 1;
