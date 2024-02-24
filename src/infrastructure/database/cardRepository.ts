import {CardRepositoryInterface} from "../../core/ports/repositories";
import {CardEntity} from "../../core/domain/CardEntity";
import {generateToken} from "../../core/helpers/helpers";
import {CardSchema} from "./cardSchema";
import {Database} from "./database";

export class CardRepository implements CardRepositoryInterface {

    private readonly db: Promise<Database>;

    constructor() {
        this.db = Database.getInstance();
    }

    async getCard(token: string): Promise<CardEntity> {

        await this.db;
        const card = await CardSchema.findOne({token: token}).exec();

        if (card) {
            return new CardEntity(
                card.cardNumber!,
                card.cvv!,
                card.expirationMonth!,
                card.expirationYear!,
                card.email!,
                card.token!,
                card.createdAt!,
            );
        }

        throw new Error('card is not available')
    }

    async saveCard(cardData: CardEntity): Promise<string> {

        await this.db;
        const card = await CardSchema.create({
            token: generateToken(),
            cardNumber: cardData.cardNumber,
            cvv: cardData.cvv,
            expirationMonth: cardData.expirationMonth,
            expirationYear: cardData.expirationYear,
            email: cardData.email,
        });

        if (card) {
            return card.token!
        }

        throw new Error('Card not saved')
    }
}