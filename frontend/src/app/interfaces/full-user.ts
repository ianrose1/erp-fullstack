import Company from "./company";
import Profile from "./profile";
import { Team } from "./team";

export default interface FullUser {
  id: number,
  profile: Profile,
  isAdmin: boolean,
  active: boolean,
  status: string,
  companies: [Company],
  teams: [Team]
}