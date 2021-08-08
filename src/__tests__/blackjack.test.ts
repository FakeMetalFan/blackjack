import { fireEvent, screen } from '@testing-library/dom';
import * as animate from 'animate';
import Blackjack from 'blackjack';
import Button from 'buttons/button';
import Buttons from 'buttons/buttons';
import Card from 'card';
import Dealer from 'cardHolders/dealer';
import Deck from 'cardHolders/deck';
import Hand from 'cardHolders/hand';
import Players from 'cardHolders/players';
import PopupText from 'constants/popupText';
import Rank, { ranks } from 'constants/ranks';
import Suit, { suits } from 'constants/suits';
import Popup from 'popup';

describe('Blackjack', () => {
  let blackjack: Blackjack;

  const flushPromises = () => new Promise(setImmediate);

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (animate as any).default = (...animations: animate.AnimationConfig[]) => {
      animations.forEach(({ onStart, onProgress, onEnd }) => {
        onStart?.();
        onProgress?.((from, to) => from + (to - from));
        onEnd?.();
      });
    };
  });

  beforeEach(() => {
    const createDiv = (dataTestId: string) => {
      const elem = document.createElement('div');

      elem.setAttribute('data-testid', dataTestId);

      document.body.append(elem);

      return elem;
    };

    const createBtn = (name: string) => {
      const elem = document.createElement('button');

      elem.textContent = name;

      document.body.append(elem);

      return new Button(elem);
    };

    blackjack = new Blackjack(
      new Buttons(
        createBtn('deal'),
        createBtn('reset'),
        createBtn('hit'),
        createBtn('stand')
      ),
      new Popup(createDiv('popup')),
      new Deck(createDiv('deck'), suits, ranks),
      new Dealer(createDiv('dealer')),
      new Players(
        new Hand(createDiv('player-1')),
        new Hand(createDiv('player-2'))
      )
    );
  });

  beforeEach(() => {
    // to avoid using "?." operator which worsens branching report (bug);
    jest
      .spyOn(Dealer.prototype, 'topCard', 'get')
      .mockReturnValue(new Card(Rank.Ace, Suit.Spades));
  });

  afterEach(() => {
    document.body.innerHTML = '';

    jest.restoreAllMocks();
  });

  it('should deal', async () => {
    jest.spyOn(Hand.prototype, 'hasBlackjack').mockReturnValue(true);

    fireEvent.click(screen.getByText('deal'));

    await flushPromises();

    expect(screen.getByTestId('dealer').childElementCount).toBe(2);
    expect(screen.getByTestId('player-1').childElementCount).toBe(2);
    expect(screen.getByTestId('player-2').childElementCount).toBe(2);
    expect(screen.getByText(PopupText.Blackjack)).toBeInTheDocument();
  });

  it('should reset', async () => {
    fireEvent.click(screen.getByText('deal'));

    await flushPromises();

    fireEvent.click(screen.getByText('reset'));

    await flushPromises();

    expect(screen.getByTestId('dealer').childElementCount).toBe(0);
    expect(screen.getByTestId('player-1').childElementCount).toBe(0);
    expect(screen.getByTestId('player-2').childElementCount).toBe(0);
  });

  it('should hit', async () => {
    const hit = screen.getByText('hit');

    fireEvent.click(hit);

    await flushPromises();

    expect(screen.getByTestId('player-1').childElementCount).toBe(1);

    jest.spyOn(Hand.prototype, 'hasBust').mockReturnValue(true);

    fireEvent.click(hit);

    await flushPromises();

    expect(screen.getByTestId('player-2')).toHaveClass('active');

    fireEvent.click(hit);

    await flushPromises();

    expect(
      screen.getByTestId('dealer').childElementCount
    ).toBeGreaterThanOrEqual(2);
  });

  it('should stand', async () => {
    const stand = screen.getByText('stand');
    const playersBustMock = jest
      /* eslint-disable dot-notation */
      .spyOn(blackjack['players'], 'haveBust')
      .mockReturnValue(true);

    fireEvent.click(stand);

    expect(screen.getByTestId('player-2')).toHaveClass('active');

    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByTestId('dealer').childElementCount).toBeGreaterThan(0);
    expect(screen.getByText(PopupText.Defeat)).toBeInTheDocument();

    const reset = screen.getByText('reset');
    const dealerBustMock = jest
      .spyOn(blackjack['dealer'], 'hasBust')
      .mockReturnValue(true);

    playersBustMock.mockReturnValue(false);

    fireEvent.click(reset);
    fireEvent.click(stand);
    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByText(PopupText.Victory)).toBeInTheDocument();

    const playersTopScoreMock = jest
      .spyOn(blackjack['players'], 'getTopScore')
      .mockReturnValue(17);

    jest.spyOn(blackjack['dealer'], 'getScore').mockReturnValue(17);
    dealerBustMock.mockReturnValue(false);

    fireEvent.click(reset);
    fireEvent.click(stand);
    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByText(PopupText.Push)).toBeInTheDocument();

    playersTopScoreMock.mockReturnValue(16);

    fireEvent.click(reset);
    fireEvent.click(stand);
    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByText(PopupText.Defeat)).toBeInTheDocument();
  });
});
