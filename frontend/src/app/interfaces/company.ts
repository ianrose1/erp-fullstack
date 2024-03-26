import BasicUser from "./basic-user";
import { Team } from "./team";

export default interface Company {
    id: number,
    name: string,
    description: string,
    teams: [Team],
    users: [BasicUser]
}