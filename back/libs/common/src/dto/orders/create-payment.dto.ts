interface IPurchaseItem {
    assetId: string
    price: number
}

export interface CreateOrderDTO {
    items: Array<IPurchaseItem>
}
export interface CreatePurchaseDTO extends CreateOrderDTO {
    email: string
    items: Array<IPurchaseItem>
    
}

export interface CreateRedirectUrlDto{
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
export interface S2SPaymentDTO{
    direct_post_url: string
    cardholder_name: string,
    card_number: string,
    expires: string,
    cvc: string,
    remote_ip: string
}
