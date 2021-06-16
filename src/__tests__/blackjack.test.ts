import { fireEvent, screen } from '@testing-library/dom';
import Blackjack from 'blackjack';
import Button from 'buttons/button';
import Buttons from 'buttons/buttons';
import Dealer from 'cardHolders/dealer';
import Deck from 'cardHolders/deck';
import Hand from 'cardHolders/hand';
import PopupText from 'constants/popupText';
import { ranks } from 'constants/ranks';
import { suits } from 'constants/suits';
import Popup from 'popup';
import * as animate from 'utils/animate';

describe('Blackjack', () => {
  let blackjack: Blackjack;

  const flushPromises = () => new Promise(setImmediate);

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (animate as any).default = (animations: animate.Animation[]) => {
      animations.forEach(({ onStart, onProgress, onEnd }) => {
        onStart?.();
        onProgress?.(0.996);
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
      new Hand(createDiv('player'))
    );
  });

  beforeEach(async () => {
    await flushPromises();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  it('should deal', async () => {
    const blackjackMock = jest
      .spyOn(Hand.prototype, 'hasBlackjack')
      .mockReturnValue(false);
    const deal = screen.getByText('deal');

    fireEvent.click(deal);

    await flushPromises();

    expect(screen.getByTestId('dealer').childElementCount).toBe(2);
    expect(screen.getByTestId('player').childElementCount).toBe(2);

    blackjackMock.mockReturnValue(true);

    fireEvent.click(screen.getByText('reset'));
    fireEvent.click(deal);

    await flushPromises();

    expect(screen.getByText(PopupText.Blackjack)).toBeInTheDocument();
  });

  it('should reset', async () => {
    fireEvent.click(screen.getByText('deal'));

    await flushPromises();

    fireEvent.click(screen.getByText('reset'));

    await flushPromises();

    expect(screen.getByTestId('dealer').childElementCount).toBe(0);
    expect(screen.getByTestId('player').childElementCount).toBe(0);
  });

  it('should hit', async () => {
    jest.spyOn(Hand.prototype, 'hasBlackjack').mockReturnValue(false);

    const hit = screen.getByText('hit');

    fireEvent.click(hit);

    await flushPromises();

    expect(screen.getByTestId('player').childElementCount).toBe(1);

    const bustMock = jest
      .spyOn(Hand.prototype, 'hasBust')
      .mockReturnValue(true);

    fireEvent.click(hit);

    await flushPromises();

    expect(screen.getByText(PopupText.PlayerDefeat)).toBeInTheDocument();

    fireEvent.click(screen.getByText('reset'));

    await flushPromises();

    bustMock.mockReturnValue(false);
    jest
      .spyOn(
        /* eslint-disable dot-notation */
        blackjack['player'],
        'hasCardsLimit',
        'get'
      )
      .mockReturnValue(true);

    fireEvent.click(hit);

    await flushPromises();

    expect(screen.getByTestId('dealer').childElementCount).toBeGreaterThan(0);
  });

  it('should stand', async () => {
    const stand = screen.getByText('stand');

    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByTestId('dealer').childElementCount).toBeGreaterThan(0);

    const reset = screen.getByText('reset');

    fireEvent.click(reset);

    await flushPromises();

    const dealerBustMock = jest
      .spyOn(blackjack['dealer'], 'hasBust')
      .mockReturnValue(true);

    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByText(PopupText.PlayerVictory)).toBeInTheDocument();

    fireEvent.click(reset);

    await flushPromises();

    dealerBustMock.mockReturnValue(false);

    const getScoreMock = jest
      .spyOn(Hand.prototype, 'getScore')
      .mockReturnValue(21);

    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByText(PopupText.Push)).toBeInTheDocument();

    fireEvent.click(reset);

    await flushPromises();

    getScoreMock.mockRestore();

    fireEvent.click(stand);

    await flushPromises();

    expect(screen.getByText(PopupText.PlayerDefeat)).toBeInTheDocument();
  });
});
