import User from "./user";

export interface Team {
    id: number,
    name: string,
    description: string,
    user: [User]
}
