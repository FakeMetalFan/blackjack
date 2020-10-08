import { Blackjack } from '@scripts/Blackjack';

import { popupMessage } from '@scripts/const';

import { Deck, Dealer, Hand } from '@scripts/card-stack';

import { Button, Buttons } from '@scripts/buttons';

import { Popup } from '@scripts/Popup';

jest.mock('@scripts/utils/animation-runner', () => ({
  runAnimations: animations => {
    animations.forEach(({ onStart, onProgress, onEnd }) => {
      onStart?.();
      onProgress?.(.996);
      onEnd?.();
    });
  },
}));

describe('Blackjack', () => {
  let dealerElem;
  let deckElem;
  let playerElem;

  let dealBtnElem;
  let resetBtnElem;
  let hitBtnElem;
  let standBtnElem;

  let attachHandlerSpy;
  let disableAllButtonsSpy;
  let enableBtnSpy;
  let deckIntroSpy;
  let shuffleDeckSpy;
  let hidePopupSpy;
  let showPopupSpy;
  let revealDealerSecondCardSpy;
  let allowHitOrStandSpy;

  let blackjack;

  const flushPromises = () => new Promise(setImmediate);

  beforeEach(() => {
    attachHandlerSpy = jest.spyOn(Button.prototype, 'attachHandler');
    disableAllButtonsSpy = jest.spyOn(Buttons.prototype, 'disableAll');
    enableBtnSpy = jest.spyOn(Button.prototype, 'enable');
    deckIntroSpy = jest.spyOn(Deck.prototype, 'intro');
    shuffleDeckSpy = jest.spyOn(Deck.prototype, 'shuffle');
    hidePopupSpy = jest.spyOn(Popup.prototype, 'hide');
    showPopupSpy = jest.spyOn(Popup.prototype, 'show');
    revealDealerSecondCardSpy = jest.spyOn(Dealer.prototype, 'revealSecondCard').mockImplementation(jest.fn());
    allowHitOrStandSpy = jest.spyOn(Buttons.prototype, 'allowHitOrStand');
  });

  beforeEach(() => {
    const createElem = tagName => document.createElement(tagName);
    const createDiv = () => createElem('div');
    const createBtn = () => createElem('button');

    dealerElem = createDiv();
    deckElem = createDiv();
    playerElem = createDiv();

    dealBtnElem = createBtn();
    resetBtnElem = createBtn();
    hitBtnElem = createBtn();
    standBtnElem = createBtn();

    blackjack = new Blackjack({
      dealerElem,
      deckElem,
      playerElem,
      dealBtnElem,
      resetBtnElem,
      hitBtnElem,
      standBtnElem,
      popupElem: createDiv(),
    });
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

  it('should enable deal button', () => {
    expect(enableBtnSpy).toHaveBeenCalled();
  });

  describe('deal', () => {
    let playerBlackjackedMock;
    let dealerBlackjackedMock;

    beforeEach(() => {
      playerBlackjackedMock = jest.spyOn(blackjack._player, 'isBlackjacked').mockReturnValue(false);
      dealerBlackjackedMock = jest.spyOn(blackjack._dealer, 'isBlackjacked').mockReturnValue(false);
    });

    it('should hide popup', () => {
      dealBtnElem.click();

      expect(hidePopupSpy).toHaveBeenCalled();
    });

    it('should disable buttons', () => {
      dealBtnElem.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it(`should move deck's card stack to foreground`, () => {
      dealBtnElem.click();

      expect(deckElem.style.zIndex).toBe('1');
    });

    it('should shuffle deck', async () => {
      dealBtnElem.click();

      await flushPromises();

      expect(shuffleDeckSpy).toHaveBeenCalledTimes(2);
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
      playerBlackjackedMock.mockReturnValue(true);
      dealerBlackjackedMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Blackjack);
    });

    it('should show popup if player gets a blackjack', async () => {
      playerBlackjackedMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Blackjack);
    });

    it('should show popup if dealer gets a blackjack', async () => {
      dealerBlackjackedMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Blackjack);
    });

    it(`should reveal dealer's second card if a blackjack occurs`, async () => {
      playerBlackjackedMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
    });

    it('should not enable hit and stand buttons if blackjack occurs', async () => {
      playerBlackjackedMock.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(allowHitOrStandSpy).not.toHaveBeenCalled();
    });

    it('should enable hit and stand buttons if no blackjack occurs', async () => {
      dealBtnElem.click();

      await flushPromises();

      expect(allowHitOrStandSpy).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    beforeEach(() => {
      blackjack._buttons.reset.enable();
    });

    it('should hide popup', () => {
      resetBtnElem.click();

      expect(hidePopupSpy).toHaveBeenCalled();
    });

    it('should disable buttons', () => {
      resetBtnElem.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it('should put deck to background', () => {
      resetBtnElem.click();

      expect(deckElem.style.zIndex).toBe('-1');
    });

    it('should empty player and dealer cards', () => {
      const spy = jest.spyOn(Hand.prototype, 'empty');

      resetBtnElem.click();

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should shuffle deck', async () => {
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
    let playerBustedMock;

    beforeEach(() => {
      playerBustedMock = jest.spyOn(blackjack._player, 'isBusted');

      blackjack._buttons.hit.enable();
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
      playerBustedMock.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
    });

    it('should show popup if player is busted', async () => {
      playerBustedMock.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerLost);
    });

    it('should enable reset button if player is busted', async () => {
      playerBustedMock.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(enableBtnSpy).toHaveBeenCalled();
    });

    it(`should stand if player's card limit is reached`, async () => {
      const spy = jest.spyOn(blackjack, '_stand');

      jest.spyOn(blackjack._player, 'isCardsLimitReached', 'get').mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(spy).toHaveBeenCalled();
    });

    it('should enable reset, hit and stand buttons if neither bust nor card limit has occurred', async () => {
      hitBtnElem.click();

      expect(resetBtnElem.disabled).toBe(true);

      await flushPromises();

      expect(resetBtnElem.disabled).toBe(false);
      expect(allowHitOrStandSpy).toHaveBeenCalled();
    });
  });

  describe('stand', () => {
    let playerValueMock;
    let dealerValueMock;
    let dealerIsBustedMock;

    beforeEach(() => {
      playerValueMock = jest.spyOn(blackjack._player, 'getValue');
      dealerValueMock = jest.spyOn(blackjack._dealer, 'getValue');
      dealerIsBustedMock = jest.spyOn(blackjack._dealer, 'isBusted').mockReturnValue(false);

      blackjack._cardSupplier.supplyDealerWithCard();
      blackjack._cardSupplier.supplyDealerWithCard(false);
      blackjack._buttons.stand.enable();
    });

    it('should disable buttons', () => {
      standBtnElem.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it(`should reveal dealer's second card`, () => {
      standBtnElem.click();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
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

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerWon);
    });

    it(`should show popup if player's score is greater then dealer's`, async () => {
      playerValueMock.mockReturnValue(18);
      dealerValueMock.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerWon);
    });

    it(`should show popup if player's score equals dealer's`, async () => {
      playerValueMock.mockReturnValue(17);
      dealerValueMock.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Push);
    });

    it(`should show popup if player's score is less then dealer's`, async () => {
      playerValueMock.mockReturnValue(4);
      dealerValueMock.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerLost);
    });

    it('should enable reset button', async () => {
      standBtnElem.click();

      expect(resetBtnElem.disabled).toBe(true);

      await flushPromises();

      expect(resetBtnElem.disabled).toBe(false);
    });
  });
});
