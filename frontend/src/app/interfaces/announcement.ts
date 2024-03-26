import BasicUser from "./basic-user";

export default interface Announcement {
    id: number,
    date: string,
    title: string,
    message: string,
    author: BasicUser
}