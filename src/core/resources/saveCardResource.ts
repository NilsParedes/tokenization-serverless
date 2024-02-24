export class SaveCardResource {
    static toJson(token: string): any {
        return {
            data: {
                token: token,
            }
        };
    }
}
