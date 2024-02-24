import {CardEntity} from "../domain/CardEntity";

export class GetCardResource {

    static toJson(card: CardEntity): any {
        return {
            data: {
                card_number: card.cardNumber,
                expiration_month: card.expirationMonth,
                expiration_year: card.expirationYear,
            }
        };
    }
}
