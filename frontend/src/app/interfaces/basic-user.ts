import Profile from "./profile";

export default interface BasicUser {
    id: number,
    profile: Profile,
    isAdmin: boolean,
    active: boolean,
    status: string
}