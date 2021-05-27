import Blackjack from '../src/scripts/blackjack';
import Button from '../src/scripts/buttons/button';
import Buttons from '../src/scripts/buttons/buttons';
import Dealer from '../src/scripts/card-holders/dealer';
import Deck from '../src/scripts/card-holders/deck';
import Hand from '../src/scripts/card-holders/hand';
import PopupText from '../src/scripts/constants/popup-text';
import { ranks } from '../src/scripts/constants/ranks';
import { suits } from '../src/scripts/constants/suits';
import Popup from '../src/scripts/popup';
import { Animation } from '../src/scripts/utils/animate';

jest.mock('../src/scripts/utils/animate', () => ({
  __esModule: true,
  default: (animations: Animation[]) => {
    animations.forEach(({ onProgress, onEnd }) => {
      onProgress?.(0.996);
      onEnd?.();
    });
  },
}));

describe('Blackjack', () => {
  let dealerElem: HTMLDivElement;
  let deckElem: HTMLDivElement;
  let playerElem: HTMLDivElement;

  let dealBtnElem: HTMLButtonElement;
  let resetBtnElem: HTMLButtonElement;
  let hitBtnElem: HTMLButtonElement;
  let standBtnElem: HTMLButtonElement;

  let attachHandlerSpy: jest.SpyInstance;
  let disableAllButtonsSpy: jest.SpyInstance;
  let enableBtnSpy: jest.SpyInstance;
  let deckIntroSpy: jest.SpyInstance;
  let shuffleDeckSpy: jest.SpyInstance;
  let hidePopupSpy: jest.SpyInstance;
  let showPopupSpy: jest.SpyInstance;
  let revealDealerTopCardSpy: jest.SpyInstance;
  let enableHitAndStandSpy: jest.SpyInstance;

  let blackjack: Blackjack;

  const flushPromises = () => new Promise(setImmediate);

  beforeEach(() => {
    attachHandlerSpy = jest.spyOn(Button.prototype, 'attachHandler');
    disableAllButtonsSpy = jest.spyOn(Buttons.prototype, 'disableAll');
    enableBtnSpy = jest.spyOn(Button.prototype, 'enable');
    deckIntroSpy = jest.spyOn(Deck.prototype, 'intro');
    shuffleDeckSpy = jest.spyOn(Deck.prototype, 'shuffle');
    hidePopupSpy = jest.spyOn(Popup.prototype, 'hide');
    showPopupSpy = jest.spyOn(Popup.prototype, 'show');
    revealDealerTopCardSpy = jest
      .spyOn(Dealer.prototype, 'revealTopCard')
      .mockImplementation(jest.fn());
    enableHitAndStandSpy = jest.spyOn(Buttons.prototype, 'enableHitAndStand');
  });

  beforeEach(() => {
    const createElem = (tagName: string) => document.createElement(tagName);

    const createDiv = () => createElem('div') as HTMLDivElement;

    const createBtn = () => createElem('button') as HTMLButtonElement;

    dealerElem = createDiv();
    deckElem = createDiv();
    playerElem = createDiv();

    dealBtnElem = createBtn();
    resetBtnElem = createBtn();
    hitBtnElem = createBtn();
    standBtnElem = createBtn();

    blackjack = new Blackjack(
      new Buttons(
        new Button(dealBtnElem),
        new Button(resetBtnElem),
        new Button(hitBtnElem),
        new Button(standBtnElem)
      ),
      new Popup(createDiv()),
      new Deck(deckElem, suits, ranks),
      new Dealer(dealerElem),
      new Hand(playerElem)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should attach event handlers to buttons', () => {
    expect(attachHandlerSpy).toHaveBeenCalledTimes(4);
    expect(attachHandlerSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it(`should show deck's intro`, () => {
    expect(deckIntroSpy).toHaveBeenCalled();
  });

  it('should shuffle deck', () => {
    expect(shuffleDeckSpy).toHaveBeenCalledTimes(2);
  });

  it('should enable deal button', async () => {
    await flushPromises();

    expect(enableBtnSpy).toHaveBeenCalled();
  });

  describe('deal', () => {
    let playerBlackjackMock: jest.SpyInstance;
    let dealerBlackjackMock: jest.SpyInstance;

    beforeEach(() => {
      playerBlackjackMock = jest
        /* eslint-disable dot-notation */
        .spyOn(blackjack['player'], 'hasBlackjack')
        .mockReturnValue(false);
      dealerBlackjackMock = jest
        .spyOn(blackjack['dealer'], 'hasBlackjack')
        .mockReturnValue(false);
    });

    it('should hide popup', () => {
      dealBtnElem.click();

      expect(hidePopupSpy).toHaveBeenCalled();
    });

    it('should disable buttons', () => {
      dealBtnElem.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it('should supply both player and dealer with 2 cards', async () => {
      dealBtnElem.click();

      await flushPromises();

      expect(playerElem.childElementCount).toBe(2);
      expect(dealerElem.childElementCount).toBe(2);
    });

    it('should enable reset button', () => {
      dealBtnElem.click();

      expect(enableBtnSpy).toHaveBeenCalled();
    });

    it('should show popup if both player and dealer get a blackjack', async () => {
      playerBlackjackMock.mockReturnValue(true);
      dealerBlackjackMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.Blackjack);
    });

    it('should show popup if player gets a blackjack', async () => {
      playerBlackjackMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.Blackjack);
    });

    it('should show popup if dealer gets a blackjack', async () => {
      dealerBlackjackMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.Blackjack);
    });

    it(`should reveal dealer's second card if a blackjack occurs`, async () => {
      playerBlackjackMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(revealDealerTopCardSpy).toHaveBeenCalled();
    });

    it('should not enable hit and stand buttons if blackjack occurs', async () => {
      playerBlackjackMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(enableHitAndStandSpy).not.toHaveBeenCalled();
    });

    it('should enable hit and stand buttons if no blackjack occurs', async () => {
      dealBtnElem.click();

      await flushPromises();

      expect(enableHitAndStandSpy).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      blackjack['buttons'].reset.enable();
    });

    it('should hide popup', () => {
      resetBtnElem.click();

      expect(hidePopupSpy).toHaveBeenCalled();
    });

    it('should disable buttons', () => {
      resetBtnElem.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it('should supply deck with cards', () => {
      blackjack['supplyHandWithCard'](blackjack['player']);
      blackjack['supplyHandWithCard'](blackjack['dealer']);

      expect(deckElem.childElementCount).toBe(50);

      resetBtnElem.click();

      expect(deckElem.childElementCount).toBe(52);
    });

    it('should empty player and dealer cards', () => {
      const spy = jest.spyOn(Hand.prototype, 'empty');

      resetBtnElem.click();

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should shuffle deck', async () => {
      jest.clearAllMocks();

      resetBtnElem.click();

      await flushPromises();

      expect(shuffleDeckSpy).toHaveBeenCalledTimes(2);
    });

    it('should enable deal button', async () => {
      resetBtnElem.click();

      await flushPromises();

      expect(enableBtnSpy).toHaveBeenCalled();
    });
  });

  describe('hit', () => {
    let playerBustMock: jest.SpyInstance;

    beforeEach(() => {
      playerBustMock = jest.spyOn(blackjack['player'], 'hasBust');

      blackjack['buttons'].hit.enable();
    });

    it('should disable buttons', () => {
      hitBtnElem.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it('should add card to player', async () => {
      hitBtnElem.click();

      await flushPromises();

      expect(playerElem.childElementCount).toBe(1);
    });

    it(`should reveal dealer's second card if player is busted`, async () => {
      playerBustMock.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(revealDealerTopCardSpy).toHaveBeenCalled();
    });

    it('should show popup if player is busted', async () => {
      playerBustMock.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.PlayerDefeat);
    });

    it('should enable reset button if player is busted', async () => {
      playerBustMock.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(enableBtnSpy).toHaveBeenCalled();
    });

    it(`should stand if player's card limit is reached`, async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const spy = jest.spyOn(blackjack, 'stand');

      jest
        .spyOn(blackjack['player'], 'hasCardsLimit', 'get')
        .mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(spy).toHaveBeenCalled();
    });

    it('should enable reset, hit and stand buttons if neither bust nor card limit has occurred', async () => {
      hitBtnElem.click();

      expect(resetBtnElem.disabled).toBe(true);

      await flushPromises();

      expect(resetBtnElem.disabled).toBe(false);
      expect(enableHitAndStandSpy).toHaveBeenCalled();
    });
  });

  describe('stand', () => {
    let playerScoreMock: jest.SpyInstance;
    let dealerScoreMock: jest.SpyInstance;

    let dealerIsBustedMock: jest.SpyInstance;

    beforeEach(() => {
      playerScoreMock = jest.spyOn(blackjack['player'], 'getScore');
      dealerScoreMock = jest.spyOn(blackjack['dealer'], 'getScore');

      dealerIsBustedMock = jest
        .spyOn(blackjack['dealer'], 'hasBust')
        .mockReturnValue(false);

      blackjack['supplyHandWithCard'](blackjack['dealer']);
      blackjack['supplyHandWithCard'](blackjack['dealer'], false);
      blackjack['buttons'].stand.enable();
    });

    it('should disable buttons', () => {
      standBtnElem.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it(`should reveal dealer's second card`, () => {
      standBtnElem.click();

      expect(revealDealerTopCardSpy).toHaveBeenCalled();
    });

    it('should supply dealer with cards', async () => {
      standBtnElem.click();

      await flushPromises();

      expect(dealerElem.childElementCount).toBeGreaterThanOrEqual(2);
    });

    it('should show popup if dealer is busted', async () => {
      dealerIsBustedMock.mockReturnValue(true);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.PlayerVictory);
    });

    it(`should show popup if player's score is greater then dealer's`, async () => {
      playerScoreMock.mockReturnValue(18);
      dealerScoreMock.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.PlayerVictory);
    });

    it(`should show popup if player's score equals dealer's`, async () => {
      playerScoreMock.mockReturnValue(17);
      dealerScoreMock.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.Push);
    });

    it(`should show popup if player's score is less then dealer's`, async () => {
      playerScoreMock.mockReturnValue(4);
      dealerScoreMock.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(PopupText.PlayerDefeat);
    });

    it('should enable reset button', async () => {
      standBtnElem.click();

      expect(resetBtnElem.disabled).toBe(true);

      await flushPromises();

      expect(resetBtnElem.disabled).toBe(false);
    });
  });
});
