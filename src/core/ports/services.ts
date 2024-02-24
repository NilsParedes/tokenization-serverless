import {CardEntity} from "../domain/CardEntity";

export interface CardServiceInterface {

    getCard(token: string): Promise<CardEntity>

    saveCard(cardData: CardEntity): Promise<string>

}