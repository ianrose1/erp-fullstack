import { Teams } from "./teams";

export interface Projects {
    id: number,
    name: string,
    description: string,
    active: boolean,
    team: [Teams]
}
