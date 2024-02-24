import crypto from "crypto";

export function generateToken(): string {
    const bytes = crypto.randomBytes(16);
    return bytes.toString('base64')
        .replace(/[/+=]/g, '')
        .substring(0, 16);
}

export function luhnCheck(value: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    for (let i = value.length - 1; i >= 0; i--) {
        let digit = parseInt(value.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
}
