import {CardServiceInterface} from "../ports/services";
import {CardEntity} from "../domain/CardEntity";
import {CardRepositoryInterface} from "../ports/repositories";

export class CardService implements CardServiceInterface {

    private repository: CardRepositoryInterface;

    constructor(repository: CardRepositoryInterface) {
        this.repository = repository;
    }

    async getCard(id: string): Promise<CardEntity> {
        try {
            return await this.repository.getCard(id);
        } catch (error) {
            throw error;
        }
    }

    async saveCard(cardData: CardEntity): Promise<string> {
        try {
            return await this.repository.saveCard(cardData);
        } catch (error) {
            throw error;
        }
    }

}