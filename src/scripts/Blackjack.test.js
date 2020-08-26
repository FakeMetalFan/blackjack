import { Blackjack } from './Blackjack';
import { popupMessage } from './consts';
import { HandCardStack } from './card-stacks';
import { Button } from './buttons/internals/Button';
import { Deck } from './deck/Deck';
import { Buttons } from './buttons/Buttons';
import { Popup } from './Popup';
import { Dealer } from './hands';

jest.mock('./utils/animation', () => ({
  getAnimation: ({ onStart, onProgress, onComplete }) => {
    onStart && onStart();
    onProgress && onProgress(.996);
    onComplete && onComplete();
  },
}));

describe('Blackjack', () => {
  let dealerElem;
  let playerElem;
  let buttonsElem;

  let deckIntroSpy;
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
  const getBtn = name => Array.from(buttonsElem.children).find(({ innerText }) => innerText === name);

  beforeEach(() => {
    deckIntroSpy = jest.spyOn(Deck.prototype, 'intro');
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
    const createElem = () => document.createElement('div');

    dealerElem = createElem();
    playerElem = createElem();
    buttonsElem = createElem();

    blackjack = new Blackjack(
      dealerElem,
      createElem(),
      playerElem,
      createElem(),
      buttonsElem
    );
  });

  afterEach(() => jest.clearAllMocks());

  it(`should run deck's intro`, () => {
    expect(deckIntroSpy).toHaveBeenCalled();
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
    let dealBtn;

    let playerBlackjackedSpy;
    let dealerBlackjackedSpy;

    beforeEach(() => {
      dealBtn = getBtn('Deal');

      playerBlackjackedSpy = jest.spyOn(blackjack._player, 'isBlackjacked').mockReturnValue(false);
      dealerBlackjackedSpy = jest.spyOn(blackjack._dealer, 'isBlackjacked').mockReturnValue(false);
    });

    it('should hide popup', () => {
      dealBtn.click();

      expect(hidePopupSpy).toHaveBeenCalled();
    });

    it('should disable buttons', () => {
      dealBtn.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it(`should move deck's card stack to foreground`, () => {
      const spy = jest.spyOn(blackjack._deck.cardStack, 'toForeground');

      dealBtn.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should shuffle deck', async () => {
      dealBtn.click();

      await flushPromises();

      expect(shuffleDeckSpy).toHaveBeenCalledTimes(2);
    });

    it('should supply both player and dealer with 2 cards', async () => {
      dealBtn.click();

      await flushPromises();

      expect(playerElem.childElementCount).toBe(2);
      expect(dealerElem.childElementCount).toBe(2);
    });

    it('should enable reset button', async () => {
      dealBtn.click();

      const resetBtn = getBtn('Reset');

      expect(resetBtn.disabled).toBe(true);

      await flushPromises();

      expect(resetBtn.disabled).toBe(false);
    });

    it('should show popup if both player and dealer have got a blackjack', async () => {
      playerBlackjackedSpy.mockReturnValue(true);
      dealerBlackjackedSpy.mockReturnValue(true);

      dealBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Push);
    });

    it('should show popup if player has got a blackjack', async () => {
      playerBlackjackedSpy.mockReturnValue(true);

      dealBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerBlackjack);
    });

    it('should show popup if dealer has got a blackjack', async () => {
      dealerBlackjackedSpy.mockReturnValue(true);

      dealBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.DealerBlackjack);
    });

    it(`should reveal dealer's second card if a blackjack occurs`, async () => {
      playerBlackjackedSpy.mockReturnValue(true);

      dealBtn.click();

      await flushPromises();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
    });

    it('should not enable hit and stand buttons if blackjack occurs', async () => {
      playerBlackjackedSpy.mockReturnValue(true);

      dealBtn.click();

      await flushPromises();

      expect(allowHitOrStandSpy).not.toHaveBeenCalled();
    });

    it('should enable hit and stand buttons if no blackjack occurs', async () => {
      dealBtn.click();

      await flushPromises();

      expect(allowHitOrStandSpy).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    let resetBtn;

    beforeEach(() => {
      resetBtn = getBtn('Reset');

      blackjack._buttons.reset.enable();
    });

    it('should hide popup', () => {
      resetBtn.click();

      expect(hidePopupSpy).toHaveBeenCalled();
    });

    it('should disable buttons', () => {
      resetBtn.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it(`should move deck's card stack to background`, () => {
      const spy = jest.spyOn(blackjack._deck.cardStack, 'toBackground');

      resetBtn.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should empty player and dealer cards', async () => {
      const spy = jest.spyOn(HandCardStack.prototype, 'empty');

      // flushing "_moveCardToDeck" animations;
      blackjack._drawCardFromDeck(blackjack._player);
      blackjack._drawCardFromDeck(blackjack._dealer);

      resetBtn.click();

      await flushPromises();

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should shuffle deck', async () => {
      resetBtn.click();

      await flushPromises();

      expect(shuffleDeckSpy).toHaveBeenCalledTimes(2);
    });

    it('should enable deal button', async () => {
      resetBtn.click();

      await flushPromises();

      expect(enableBtnSpy).toHaveBeenCalled();
    });
  });

  describe('hit', () => {
    let hitBtn;

    let playerBustedSpy;

    beforeEach(() => {
      hitBtn = getBtn('Hit');

      playerBustedSpy = jest.spyOn(blackjack._player, 'isBusted');
      revealDealerSecondCardSpy.mockImplementation(jest.fn);

      blackjack._buttons.hit.enable();
    });

    it('should disable buttons', () => {
      hitBtn.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it('should add card to player', async () => {
      hitBtn.click();

      await flushPromises();

      expect(playerElem.childElementCount).toBe(1);
    });

    it(`should reveal dealer's second card if player is busted`, async () => {
      playerBustedSpy.mockReturnValue(true);

      hitBtn.click();

      await flushPromises();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
    });

    it('should show popup if player is busted', async () => {
      playerBustedSpy.mockReturnValue(true);

      hitBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerLost);
    });

    it('should enable reset button if player is busted', async () => {
      playerBustedSpy.mockReturnValue(true);

      hitBtn.click();

      const resetBtn = getBtn('Reset');

      expect(resetBtn.disabled).toBe(true);

      await flushPromises();

      expect(resetBtn.disabled).toBe(false);
    });

    it(`should stand if player's card limit is reached`, async () => {
      const spy = jest.spyOn(blackjack, '_stand');

      jest.spyOn(blackjack._player, 'isCardsLimitReached', 'get').mockReturnValue(true);

      hitBtn.click();

      await flushPromises();

      expect(spy).toHaveBeenCalled();
    });

    it('should enable reset, hit and stand buttons if neither bust nor card limit has occurred', async () => {
      hitBtn.click();

      const resetBtn = getBtn('Reset');

      expect(resetBtn.disabled).toBe(true);

      await flushPromises();

      expect(resetBtn.disabled).toBe(false);
      expect(allowHitOrStandSpy).toHaveBeenCalled();
    });
  });

  describe('stand', () => {
    let standBtn;

    let playerValueSpy;
    let dealerValueSpy;
    let dealerIsBustedSpy;

    beforeEach(() => {
      standBtn = getBtn('Stand');

      playerValueSpy = jest.spyOn(blackjack._player, 'getValue');
      dealerValueSpy = jest.spyOn(blackjack._dealer, 'getValue');
      dealerIsBustedSpy = jest.spyOn(blackjack._dealer, 'isBusted').mockReturnValue(false);

      revealDealerSecondCardSpy.mockImplementation(jest.fn);

      blackjack._buttons.stand.enable();
    });

    it('should disable buttons', () => {
      standBtn.click();

      expect(disableAllButtonsSpy).toHaveBeenCalled();
    });

    it(`should reveal dealer's second card`, () => {
      standBtn.click();

      expect(revealDealerSecondCardSpy).toHaveBeenCalled();
    });

    it('should supply dealer with cards', async () => {
      blackjack._deck.shuffle(); // randomizing dealer's hand;

      standBtn.click();

      await flushPromises();

      expect(dealerElem.childElementCount).toBeGreaterThanOrEqual(2);
      expect(blackjack._dealer.getValue()).toBeGreaterThanOrEqual(17);
    });

    it('should show popup if dealer is busted', async () => {
      dealerIsBustedSpy.mockReturnValue(true);

      standBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerWon);
    });

    it(`should show popup if player's score is greater then dealer's`, async () => {
      playerValueSpy.mockReturnValue(18);
      dealerValueSpy.mockReturnValue(17);

      standBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerWon);
    });

    it(`should show popup if player's score equals dealer's`, async () => {
      playerValueSpy.mockReturnValue(17);
      dealerValueSpy.mockReturnValue(17);

      standBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.Push);
    });

    it(`should show popup if player's score is less then dealer's`, async () => {
      playerValueSpy.mockReturnValue(4);
      dealerValueSpy.mockReturnValue(17);

      standBtn.click();

      await flushPromises();

      expect(showPopupSpy).toHaveBeenCalledWith(popupMessage.PlayerLost);
    });

    it('should enable reset button', async () => {
      standBtn.click();

      const resetBtn = getBtn('Reset');

      expect(resetBtn.disabled).toBe(true);

      await flushPromises();

      expect(resetBtn.disabled).toBe(false);
    });
  });
});
