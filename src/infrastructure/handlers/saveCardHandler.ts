import {CardService} from "../../core/services/cardService";
import {SaveCardResource} from "../../core/resources/saveCardResource";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {saveCardValidator} from "../validators/saveCardValidator";
import {CardRepository} from "../database/cardRepository";

const cardRepository = new CardRepository()
const cardService = new CardService(cardRepository)

export async function saveCardHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    try {

        const body = JSON.parse(event.body!)

        const {error} = saveCardValidator.validate({
            authorization: event.headers.authorization,
            ...body
        });
        if (error) {
            return {
                statusCode: 400,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({error: error.message})
            };
        }

        const token: string = await cardService.saveCard(body)
        return {
            statusCode: 201,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(SaveCardResource.toJson(token)),
        };

    } catch (e: any) {
        return {
            statusCode: 500,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({error: e.message,},),
        };
    }
};
