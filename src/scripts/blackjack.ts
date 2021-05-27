import Buttons from './buttons/buttons';
import Dealer from './card-holders/dealer';
import Deck from './card-holders/deck';
import Hand from './card-holders/hand';
import PopupText from './constants/popup-text';
import Popup from './popup';
import bind from './utils/bind';

class Blackjack {
  constructor(
    private buttons: Buttons,
    private popup: Popup,
    private deck: Deck,
    private dealer: Dealer,
    private player: Hand
  ) {
    this.attachButtonsHandlers();
    this.init();
  }

  @bind
  private async deal() {
    this.popup.hide();
    this.buttons.disableAll();

    await this.supplyHandWithCard(this.player);
    await this.supplyHandWithCard(this.player);
    await this.supplyHandWithCard(this.dealer);
    await this.supplyHandWithCard(this.dealer, false);

    this.buttons.reset.enable();

    this.checkBlackjack();
  }

  @bind
  private async reset() {
    this.popup.hide();
    this.buttons.disableAll();

    this.supplyDeckWithCards();

    this.dealer.empty();
    this.player.empty();

    await this.deck.shuffle();
    await this.deck.shuffle();

    this.buttons.deal.enable();
  }

  @bind
  private async hit() {
    this.buttons.disableAll();

    await this.supplyHandWithCard(this.player);

    if (this.player.hasBust()) {
      this.dealer.revealTopCard();
      this.popup.show(PopupText.PlayerDefeat);
      this.buttons.reset.enable();
    } else if (this.player.hasCardsLimit) {
      this.stand();
    } else {
      this.buttons.reset.enable();
      this.buttons.enableHitAndStand();
    }
  }

  @bind
  private async stand() {
    this.buttons.disableAll();
    this.dealer.revealTopCard();

    await this.supplyDealerWithCards();

    this.conclude();
  }

  private async supplyHandWithCard(hand: Hand, shouldShowFace = true) {
    const { x, y } = this.deck.getOffsetTop();
    const { x: dx, y: dy } = hand.getRect();

    await hand
      .push(this.deck.pop().setTransform(x - dx, y - dy))
      .drag(shouldShowFace);
  }

  private checkBlackjack() {
    if (this.player.hasBlackjack() || this.dealer.hasBlackjack()) {
      this.popup.show(PopupText.Blackjack);
      this.dealer.revealTopCard();
    } else {
      this.buttons.enableHitAndStand();
    }
  }

  private supplyDeckWithCards() {
    [...this.player.cards, ...this.dealer.cards].forEach((card) => {
      const { x, y, width, height } = card.getRect();
      const { x: dx, y: dy } = this.deck.getRect();

      this.deck.push(
        card.hide().setTransform(x - dx + width / 2, y - dy + height / 2)
      );
    });
  }

  private async supplyDealerWithCards() {
    if (this.dealer.canDrawCard() && !this.dealer.hasCardsLimit) {
      await this.supplyHandWithCard(this.dealer);
      await this.supplyDealerWithCards();
    }
  }

  private conclude() {
    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    let text = PopupText.PlayerDefeat;

    if (this.dealer.hasBust() || playerScore > dealerScore) {
      text = PopupText.PlayerVictory;
    } else if (playerScore === dealerScore) {
      text = PopupText.Push;
    }

    this.popup.show(text);
    this.buttons.reset.enable();
  }

  private attachButtonsHandlers() {
    this.buttons.deal.attachHandler(this.deal);
    this.buttons.reset.attachHandler(this.reset);
    this.buttons.hit.attachHandler(this.hit);
    this.buttons.stand.attachHandler(this.stand);
  }

  private init() {
    (async () => {
      await this.deck.intro();
      await this.deck.shuffle();
      await this.deck.shuffle();

      this.buttons.deal.enable();
    })();
  }
}

export default Blackjack;
