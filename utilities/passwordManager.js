import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPassword
};

export const comparePassword = async ({password, hashedPassword}) => {
    let result = await bcrypt.compare(password, hashedPassword)
    return result
}