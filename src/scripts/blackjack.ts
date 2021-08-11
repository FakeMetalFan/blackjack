import Buttons from 'buttons/buttons';
import Deck from 'cardHolders/deck';
import Hand from 'cardHolders/hand';
import Players from 'cardHolders/players';
import PopupText from 'constants/popupText';
import Popup from 'popup';

class Blackjack {
  constructor(
    private buttons: Buttons,
    private popup: Popup,
    private deck: Deck,
    private dealer: Hand,
    private players: Players
  ) {
    this.buttons.deal.attachHandler(() => {
      this.deal();
    });
    this.buttons.reset.attachHandler(() => {
      this.reset();
    });
    this.buttons.hit.attachHandler(() => {
      this.hit();
    });
    this.buttons.stand.attachHandler(() => {
      this.stand();
    });

    (async () => {
      await (await (await this.deck.intro()).shuffle()).shuffle();

      this.buttons.deal.enable();
    })();
  }

  private async deal() {
    this.popup.hide();
    this.deck.foreground = '';
    this.buttons.disableAll();

    // eslint-disable-next-line no-restricted-syntax
    for (const hand of this.players.hands) {
      /* eslint-disable no-await-in-loop */
      await (await this.dealCard(hand)).dealCard(hand);
    }

    await (await this.dealCard(this.dealer)).dealCard(this.dealer, false);

    if (this.players.haveBlackjack() || this.dealer.hasBlackjack()) {
      await this.dealer.topCard.show();
      this.popup.show(PopupText.Blackjack);
    } else {
      this.players.current.setActive();
      this.buttons.hit.enable();
      this.buttons.stand.enable();
    }

    this.buttons.reset.enable();
  }

  private async reset() {
    this.popup.hide();
    this.players.setInactive();
    this.buttons.disableAll();

    this.deck.foreground = '1';
    this.players.hands.concat(this.dealer).forEach((hand) => {
      hand.cards.forEach((card, index) => {
        const { x, y } = card.getRect();
        const { x: dx, y: dy } = this.deck.getRect();

        // eslint-disable-next-line no-param-reassign
        card.foreground = this.deck.count + hand.count + index;

        this.deck.push(
          card
            .hide()
            .setTransform(x - dx, y - dy)
            .toggleClass('dealt')
        );
      });

      hand.empty();
    });

    await (await this.deck.shuffle()).shuffle();

    this.players.reset();
    this.buttons.deal.enable();
  }

  private async hit() {
    this.buttons.disableAll();

    await this.dealCard(this.players.current);

    if (this.players.current.hasBust()) {
      this.players.setNext();
    }

    if (this.players.current) {
      this.players.current.setActive();
      this.buttons.enableAllExceptDeal();
    } else {
      this.stand();
    }
  }

  private async stand() {
    this.buttons.disableAll();
    this.players.setNext();

    if (this.players.current) {
      this.players.current.setActive();
      this.buttons.enableAllExceptDeal();
    } else {
      await this.dealer.topCard.show();

      while (this.dealer.getScore() < 17) {
        await this.dealCard(this.dealer);
      }

      const dealerScore = this.dealer.getScore();
      const playersTopScore = this.players.getTopScore();

      if (this.players.haveBust()) {
        this.popup.show(PopupText.Defeat);
      } else if (this.dealer.hasBust() || dealerScore < playersTopScore) {
        this.popup.show(PopupText.Victory);
      } else if (playersTopScore < dealerScore) {
        this.popup.show(PopupText.Defeat);
      } else {
        this.popup.show(PopupText.Push);
      }

      this.buttons.reset.enable();
    }
  }

  private async dealCard(hand: Hand, shouldShowFace = true) {
    const { x, y } = this.deck.getOffsetTop();
    const { x: dx, y: dy } = hand.getRect();

    await hand
      .push(this.deck.pop().setTransform(x - dx, y - dy))
      .dragCard(shouldShowFace);

    return this;
  }
}

export default Blackjack;
