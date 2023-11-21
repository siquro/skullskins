export interface IItem {
    price: number,
    imageURL: string,
    appId: number,
    assetId: string,
    marketHashName: string,
    quantity: number
    steamLink: string
    tags: string

}
export interface ICart {
    items: Array<IItem>
}
export interface IUser {
    userName: string
    avatarURL: string
    email?: string
    tradeOfferLink?: string
}
export interface VerifyEmailDTO {
    email: string
}
export interface UpdateTradeURLDTO {
    tradeURL: string
}

export interface IShopList {
    items: Array<IItem>
}

interface IPurchaseItem {
    assetId: string
    price: number
}
export interface CreateOrderDTO {
    items: Array<IPurchaseItem>
}


export interface CreateRedirectUrlDto {
    full_name: string,
    street_address: string
    city: string
    country: string
    zip_code: string
    state: string
    remote_ip?: string
}

export interface InitiatePaymentDto extends CreateRedirectUrlDto {
    cardholder_name: string,
    card_number: string,
    expires: string,
    cvc: string,
    phone: string,
    phone_code: string
}
