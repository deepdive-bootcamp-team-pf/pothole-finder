import * as argon2 from 'argon2'
import crypto from 'crypto'

export function setActivationToken (): string {
    return crypto.randomBytes(16).toString('hex')
}

export async function setHash (password: string): Promise<string> {
    return await argon2.hash(
        password,
        {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            hashLength: 32
        })
}

export async function validatePassword (hash: string, password: string): Promise<boolean> {
    return await argon2.verify(
        hash,
        password,
        {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            hashLength: 32
        })
}