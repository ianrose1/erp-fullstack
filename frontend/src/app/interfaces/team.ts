import FullUser from "./full-user";

export interface Team {
    id: number,
    name: string,
    description: string,
    user: [FullUser]
}
