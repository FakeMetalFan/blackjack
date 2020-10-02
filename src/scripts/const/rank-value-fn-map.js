import { rank } from './rank';

export const rankValueFnMap = new Map()
  .set(rank.Ace, (score, index) => score < 11 && index < 2 ? 11 : 1)
  .set(rank.Two, () => 2)
  .set(rank.Three, () => 3)
  .set(rank.Four, () => 4)
  .set(rank.Five, () => 5)
  .set(rank.Six, () => 6)
  .set(rank.Seven, () => 7)
  .set(rank.Eight, () => 8)
  .set(rank.Nine, () => 9)
  .set(rank.Ten, () => 10)
  .set(rank.Jack, () => 10)
  .set(rank.Queen, () => 10)
  .set(rank.King, () => 10);
