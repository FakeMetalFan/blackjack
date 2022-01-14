const enum RANK {
  ACE = 'ace',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  SIX = 'six',
  SEVEN = 'seven',
  EIGHT = 'eight',
  NINE = 'nine',
  TEN = 'ten',
  JACK = 'jack',
  QUEEN = 'queen',
  KING = 'king',
}

export const RANKS = [
  RANK.ACE,
  RANK.TWO,
  RANK.THREE,
  RANK.FOUR,
  RANK.FIVE,
  RANK.SIX,
  RANK.SEVEN,
  RANK.EIGHT,
  RANK.NINE,
  RANK.TEN,
  RANK.JACK,
  RANK.QUEEN,
  RANK.KING,
];

export const RANK_VALUE = new Map<
  RANK,
  (score?: number, index?: number) => number
>([
    [
      RANK.ACE,
      (score, index) => (score < 11 && index < 2 ? 11 : 1),
    ],
    [
      RANK.TWO,
      () => 2,
    ],
    [
      RANK.THREE,
      () => 3,
    ],
    [
      RANK.FOUR,
      () => 4,
    ],
    [
      RANK.FIVE,
      () => 5,
    ],
    [
      RANK.SIX,
      () => 6,
    ],
    [
      RANK.SEVEN,
      () => 7,
    ],
    [
      RANK.EIGHT,
      () => 8,
    ],
    [
      RANK.NINE,
      () => 9,
    ],
    [
      RANK.TEN,
      () => 10,
    ],
    [
      RANK.JACK,
      () => 10,
    ],
    [
      RANK.QUEEN,
      () => 10,
    ],
    [
      RANK.KING,
      () => 10,
    ],
]);

export default RANK;
