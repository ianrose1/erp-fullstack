import BasicUser from "./basic-user";

export interface Team {
    id: number,
    name: string,
    description: string,
    users: [BasicUser]
    projectLength: number
}
