export class CardEntity {

    constructor(
        public cardNumber: string,
        public cvv: string,
        public expirationMonth: string,
        public expirationYear: string,
        public email: string,
        public token: string,
        public createdAt: Date
    ) {}

}