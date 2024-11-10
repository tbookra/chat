export type User = {
    _id: string | null;
    userName: string;
    socketId?: string;
} | null
export type Message = {
    text:string;
    textId: string;
    timestamp: string;
    sender: "guest" | "host";
    watched: boolean
}