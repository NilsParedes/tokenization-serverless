import {saveCardHandler} from "../src/infrastructure/handlers/saveCardHandler";

describe('saveCardHandler', () => {

    let authorization = 'pk_test_1234567891234567'

    let cardData = {
        cardNumber: "4906417887846775",
        cvv: "850",
        expirationMonth: "10",
        expirationYear: "2029",
        email: "nils.parsa@gmail.com"
    }

    const context: any = {};

    it('save card successfully', async () => {

        const event: any = {
            headers: {authorization},
            body: JSON.stringify(cardData)
        };

        const result = await saveCardHandler(event, context);
        expect(result.statusCode).toBe(201);
    });

    it('save card without authorization header', async () => {

        const event: any = {
            headers: {},
            body: JSON.stringify(cardData)
        };

        const result = await saveCardHandler(event, context);
        expect(result.statusCode).toBe(400);
    });

    it('Save card with wrong data', async () => {

        const event: any = {
            headers: {},
            body: JSON.stringify({})
        };

        const result = await saveCardHandler(event, context);
        expect(result.statusCode).toBe(400);
    });

});