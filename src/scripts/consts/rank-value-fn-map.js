import { Rank } from './rank';

export const rankValueFnMap = new Map()
  .set(Rank.Ace, (score, index) => score < 11 && index < 2 ? 11 : 1)
  .set(Rank.Two, () => 2)
  .set(Rank.Three, () => 3)
  .set(Rank.Four, () => 4)
  .set(Rank.Five, () => 5)
  .set(Rank.Six, () => 6)
  .set(Rank.Seven, () => 7)
  .set(Rank.Eight, () => 8)
  .set(Rank.Nine, () => 9)
  .set(Rank.Ten, () => 10)
  .set(Rank.Jack, () => 10)
  .set(Rank.Queen, () => 10)
  .set(Rank.King, () => 10);
