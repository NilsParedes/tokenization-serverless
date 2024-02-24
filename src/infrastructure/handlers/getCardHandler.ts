import {CardService} from "../../core/services/cardService";
import {GetCardResource} from "../../core/resources/getCardResource";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {getCardValidator} from "../validators/getCardValidator";
import {CardRepository} from "../database/cardRepository";

const cardRepository = new CardRepository()
const cardService = new CardService(cardRepository)

export async function getCardHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    try {

        const {error} = getCardValidator.validate(event.headers);
        if (error) {
            return {
                statusCode: 400,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({error: error.message})
            };
        }

        const card = await cardService.getCard(event.headers.authorization!)
        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(GetCardResource.toJson(card)),
        };

    } catch (e: any) {
        return {
            statusCode: 500,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({error: e.message},),
        };
    }
};