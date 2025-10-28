import bcrypt from "bcrypt";

export const hashValue= async(value: string,saltRounds: number=10): Promise<string>=>{
    const hashedValue= await bcrypt.hash(value,saltRounds);
    return hashedValue;
}

export const compareValue = async (value: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(value, hashed);
}