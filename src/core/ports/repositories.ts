import {CardEntity} from "../domain/CardEntity";

export interface CardRepositoryInterface {

    getCard(token: string): Promise<CardEntity>

    saveCard(cardData: CardEntity): Promise<string>

}