import { Blackjack } from '@scripts/Blackjack';

import { popupMessage } from '@scripts/const';

import { HandCardStack } from '@scripts/card-stack';

import { Button, Buttons } from '@scripts/buttons';

import { Deck } from '@scripts/deck';

import { Popup } from '@scripts/Popup';

import { Dealer } from '@scripts/hand';

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
  let playerElem;

  let dealBtnElem;
  let resetBtnElem;
  let hitBtnElem;
  let standBtnElem;

  let attachHandlerSpy;
  let disableAllButtonsSpy;
  let enableBtnSpy;

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

    shuffleDeckSpy = jest.spyOn(Deck.prototype, 'shuffle');
    hidePopupSpy = jest.spyOn(Popup.prototype, 'hide');
    showPopupSpy = jest.spyOn(Popup.prototype, 'show');
    revealDealerSecondCardSpy = jest.spyOn(Dealer.prototype, 'revealSecondCard');
    allowHitOrStandSpy = jest.spyOn(Buttons.prototype, 'allowHitOrStand');
  });

  beforeEach(() => {
    const createElem = tagName => document.createElement(tagName);
    const createDiv = () => createElem('div');
    const createBtn = () => createElem('button');

    dealerElem = createDiv();
    playerElem = createDiv();

    dealBtnElem = createBtn();
    resetBtnElem = createBtn();
    hitBtnElem = createBtn();
    standBtnElem = createBtn();

    blackjack = new Blackjack(
      dealerElem,
      createDiv(),
      playerElem,
      createDiv(),
      dealBtnElem,
      resetBtnElem,
      hitBtnElem,
      standBtnElem
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should attach event handlers to buttons', () => {
    expect(attachHandlerSpy).toHaveBeenCalledTimes(4);
    expect(attachHandlerSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should disable all buttons', () => {
    expect(disableAllButtonsSpy).toHaveBeenCalled();
  });

  it('should enable deal button', () => {
    expect(enableBtnSpy).toHaveBeenCalled();
  });

  describe('deal', () => {
    let playerBlackjackedSpy;
    let dealerBlackjackedSpy;

    beforeEach(() => {
      playerBlackjackedSpy = jest.spyOn(blackjack._player, 'isBlackjacked').mockReturnValue(false);
      dealerBlackjackedSpy = jest.spyOn(blackjack._dealer, 'isBlackjacked').mockReturnValue(false);
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
      const spy = jest.spyOn(blackjack._deck.cardStack, 'toForeground');

      dealBtnElem.click();

      expect(spy).toHaveBeenCalled();
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

    it('should enable reset button', async () => {
      dealBtnElem.click();

      expect(resetBtnElem.disabled).toBe(true);

      await flushPromises();

      expect(resetBtnElem.disabled).toBe(false);
    });

    it('should show popup if both player and dealer have got a blackjack', async () => {
      playerBlackjackedSpy.mockReturnValue(true);
      dealerBlackjackedSpy.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Push);
    });

    it('should show popup if player has got a blackjack', async () => {
      playerBlackjackedSpy.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerBlackjack);
    });

    it('should show popup if dealer has got a blackjack', async () => {
      dealerBlackjackedSpy.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.DealerBlackjack);
    });

    it(`should reveal dealer's second card if a blackjack occurs`, async () => {
      playerBlackjackedSpy.mockReturnValue(true);

      dealBtnElem.click();

      await flushPromises();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
    });

    it('should not enable hit and stand buttons if blackjack occurs', async () => {
      playerBlackjackedSpy.mockReturnValue(true);

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

    it(`should move deck's card stack to background`, () => {
      const spy = jest.spyOn(blackjack._deck.cardStack, 'toBackground');

      resetBtnElem.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should empty player and dealer cards', async () => {
      blackjack._dragCardFromDeck(blackjack._player);
      blackjack._dragCardFromDeck(blackjack._dealer);

      expect(playerElem.childElementCount).toBe(1);
      expect(dealerElem.childElementCount).toBe(1);

      const spy = jest.spyOn(HandCardStack.prototype, 'empty');

      resetBtnElem.click();

      await flushPromises();

      expect(spy).toHaveBeenCalledTimes(2);
      expect(playerElem.childElementCount).toBe(0);
      expect(dealerElem.childElementCount).toBe(0);
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
    let playerBustedSpy;

    beforeEach(() => {
      playerBustedSpy = jest.spyOn(blackjack._player, 'isBusted');
      revealDealerSecondCardSpy.mockImplementation(jest.fn);

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
      playerBustedSpy.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
    });

    it('should show popup if player is busted', async () => {
      playerBustedSpy.mockReturnValue(true);

      hitBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerLost);
    });

    it('should enable reset button if player is busted', async () => {
      playerBustedSpy.mockReturnValue(true);

      hitBtnElem.click();

      expect(resetBtnElem.disabled).toBe(true);

      await flushPromises();

      expect(resetBtnElem.disabled).toBe(false);
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
    let playerValueSpy;
    let dealerValueSpy;
    let dealerIsBustedSpy;

    beforeEach(() => {
      playerValueSpy = jest.spyOn(blackjack._player, 'getValue');
      dealerValueSpy = jest.spyOn(blackjack._dealer, 'getValue');
      dealerIsBustedSpy = jest.spyOn(blackjack._dealer, 'isBusted').mockReturnValue(false);

      revealDealerSecondCardSpy.mockImplementation(jest.fn);

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
      blackjack._deck.shuffle();

      standBtnElem.click();

      await flushPromises();

      expect(dealerElem.childElementCount).toBeGreaterThanOrEqual(2);
      expect(blackjack._dealer.getValue()).toBeGreaterThanOrEqual(17);
    });

    it('should show popup if dealer is busted', async () => {
      dealerIsBustedSpy.mockReturnValue(true);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerWon);
    });

    it(`should show popup if player's score is greater then dealer's`, async () => {
      playerValueSpy.mockReturnValue(18);
      dealerValueSpy.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerWon);
    });

    it(`should show popup if player's score equals dealer's`, async () => {
      playerValueSpy.mockReturnValue(17);
      dealerValueSpy.mockReturnValue(17);

      standBtnElem.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Push);
    });

    it(`should show popup if player's score is less then dealer's`, async () => {
      playerValueSpy.mockReturnValue(4);
      dealerValueSpy.mockReturnValue(17);

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
