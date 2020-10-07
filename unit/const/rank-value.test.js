import { rank, rankValue } from '@scripts/const';

describe('rankValue', () => {
  it(`should return Ace's rank value`, () => {
    expect(rankValue.get(rank.Ace)(0, 1)).toBe(11);
    expect(rankValue.get(rank.Ace)(11, 2)).toBe(1);
  });

  it(`should return Two's rank value`, () => {
    expect(rankValue.get(rank.Two)()).toBe(2);
  });

  it(`should return Three's rank value`, () => {
    expect(rankValue.get(rank.Three)()).toBe(3);
  });

  it(`should return Four's rank value`, () => {
    expect(rankValue.get(rank.Four)()).toBe(4);
  });

  it(`should return Five's rank value`, () => {
    expect(rankValue.get(rank.Five)()).toBe(5);
  });

  it(`should return Six's rank value`, () => {
    expect(rankValue.get(rank.Six)()).toBe(6);
  });

  it(`should return Seven's rank value`, () => {
    expect(rankValue.get(rank.Seven)()).toBe(7);
  });

  it(`should return Eight's rank value`, () => {
    expect(rankValue.get(rank.Eight)()).toBe(8);
  });

  it(`should return Nine's rank value`, () => {
    expect(rankValue.get(rank.Nine)()).toBe(9);
  });

  it(`should return Ten's rank value`, () => {
    expect(rankValue.get(rank.Ten)()).toBe(10);
  });

  it(`should return Jack's rank value`, () => {
    expect(rankValue.get(rank.Jack)()).toBe(10);
  });

  it(`should return Queen's rank value`, () => {
    expect(rankValue.get(rank.Queen)()).toBe(10);
  });

  it(`should return King's rank value`, () => {
    expect(rankValue.get(rank.King)()).toBe(10);
  });
});
