import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function isPasswordValid(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}