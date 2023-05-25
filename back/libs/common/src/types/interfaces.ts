import { Request } from "express"


export interface IUser {
    userName: string
    steamId: string
    avatarURL: string //хроним среденго размера
    email?: string
    tradeOfferLink?: string
}
export interface ISteamItem {
    id: string;
    market_hash_name: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
    tag: Array<string>; //котеория предмета
    appId: number //идентификатор игры
    steamLink: string
}
export interface IOrder {
    id: string;
    userId: string;
    items: ISteamItem[];
    totalPrice: number;
    createdAt: Date;
}
export enum PaymentStatus {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    FAIL = "FAIL"
}
export interface ITransaction {
    id: string;
    order: IOrder;
    amount: number;
    status: PaymentStatus;
    createdAt: Date;
}
export interface IRequest extends Request {
    steamId: string;
}