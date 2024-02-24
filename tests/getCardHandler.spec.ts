import {getCardHandler} from "../src/infrastructure/handlers/getCardHandler";
import {saveCardHandler} from "../src/infrastructure/handlers/saveCardHandler";

describe('getCardHandler', () => {

    const context: any = {};

    it('get card', async () => {

        const eventSaveCard: any = {
            headers: {authorization: 'pk_test_1234567891234567'},
            body: JSON.stringify({
                cardNumber: "4906417887846775",
                cvv: "850",
                expirationMonth: "10",
                expirationYear: "2029",
                email: "nils.parsa@gmail.com"
            })
        };

        const resultSaveCard = await saveCardHandler(eventSaveCard, context);
        const token = JSON.parse(resultSaveCard.body).data.token

        const event: any = {
            headers: {authorization: token}
        };

        const result = await getCardHandler(event, context);
        expect(result.statusCode).toBe(200);
    });

    it('get card that does not exist', async () => {

        const event: any = {
            headers: {authorization: 'bf6W3W1vFIbiegQ2'}
        };

        const result = await getCardHandler(event, context);
        expect(result.statusCode).toBe(500);
    });

    it('get card without authorization header', async () => {

        const event: any = {
            headers: {}
        };

        const result = await getCardHandler(event, context);
        expect(result.statusCode).toBe(400);
    });

});