import Card from 'card';
import Hand from 'cardHolders/hand';
import Players from 'cardHolders/players';
import Rank from 'constants/ranks';
import Suit from 'constants/suits';

describe('Players', () => {
  let players: Players;

  beforeEach(() => {
    const first = new Hand(document.createElement('div'));
    const second = new Hand(document.createElement('div'));

    first.push(new Card(Rank.Jack, Suit.Diamonds)).setActive();
    second.push(new Card(Rank.Ace, Suit.Spades));

    players = new Players(first, second);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set next hand', () => {
    const prev = players.current;

    players.setNext();

    expect(prev).not.toStrictEqual(players.current);
  });

  it('should reset hand', () => {
    players.setNext();

    const [first] = players.hands;

    expect(players.current).not.toBe(first);

    players.reset();

    expect(players.current).toBe(first);
  });

  it('should set hands inactive', () => {
    players.setInactive();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((players.hands[0] as any).elem).not.toHaveClass('active');
  });

  it('should empty hands', () => {
    players.empty();

    expect(players.hands.every((hand) => hand.count === 0));
  });

  it('should indicate a blackjack', () => {
    jest.spyOn(players.hands[0], 'hasBlackjack').mockReturnValue(true);

    expect(players.haveBlackjack()).toBe(true);
  });

  it('should indicate whether all hands are busted', () => {
    players.hands.forEach((hand) => {
      jest.spyOn(hand, 'hasBust').mockReturnValue(true);
    });

    expect(players.haveBust()).toBe(true);
  });

  it('should return top score', () => {
    expect(players.getTopScore()).toBe(11);
  });

  it('should return current hand', () => {
    expect(players.current).toBe(players.hands[0]);
  });
});
