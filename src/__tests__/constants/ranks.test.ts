import Rank, { rankValue } from 'constants/ranks';

describe('rankValue', () => {
  it('should return Ace value', () => {
    expect(rankValue.get(Rank.Ace)(0, 1)).toBe(11);
    expect(rankValue.get(Rank.Ace)(11, 2)).toBe(1);
  });

  it('should return Two value', () => {
    expect(rankValue.get(Rank.Two)()).toBe(2);
  });

  it('should return Three value', () => {
    expect(rankValue.get(Rank.Three)()).toBe(3);
  });

  it('should return Four value', () => {
    expect(rankValue.get(Rank.Four)()).toBe(4);
  });

  it('should return Five value', () => {
    expect(rankValue.get(Rank.Five)()).toBe(5);
  });

  it('should return Six value', () => {
    expect(rankValue.get(Rank.Six)()).toBe(6);
  });

  it('should return Seven value', () => {
    expect(rankValue.get(Rank.Seven)()).toBe(7);
  });

  it('should return Eight value', () => {
    expect(rankValue.get(Rank.Eight)()).toBe(8);
  });

  it('should return Nine value', () => {
    expect(rankValue.get(Rank.Nine)()).toBe(9);
  });

  it('should return Ten value', () => {
    expect(rankValue.get(Rank.Ten)()).toBe(10);
  });

  it('should return Jack value', () => {
    expect(rankValue.get(Rank.Jack)()).toBe(10);
  });

  it('should return Queen value', () => {
    expect(rankValue.get(Rank.Queen)()).toBe(10);
  });

  it('should return King value', () => {
    expect(rankValue.get(Rank.King)()).toBe(10);
  });
});
