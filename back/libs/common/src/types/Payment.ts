export interface IPurchase {
    type: string
    id: string
    created_on: number
    updated_on: number
    client: Client
    purchase: Purchase
    payment: Payment
    issuer_details: IssuerDetails
    transaction_data: TransactionData
    status: string
    status_history: StatusHistory[]
    viewed_on: number
    company_id: string
    is_test: boolean
    user_id: string
    brand_id: string
    billing_template_id: string
    client_id: any
    send_receipt: boolean
    is_recurring_token: boolean
    recurring_token: string
    skip_capture: boolean
    force_recurring: boolean
    reference_generated: string
    reference: string
    issued: string
    due: number
    refund_availability: string
    refundable_amount: number
    currency_conversion: CurrencyConversion
    payment_method_whitelist: string[]
    success_redirect: string
    failure_redirect: string
    cancel_redirect: string
    success_callback: string
    creator_agent: string
    platform: string
    product: string
    created_from_ip: string
    invoice_url: string
    checkout_url: string
    direct_post_url: string
    marked_as_paid: boolean
    order_id: string
}

export interface Client {
    bank_account: string
    bank_code: string
    email: string
    phone: string
    full_name: string
    personal_code: string
    street_address: string
    country: string
    city: string
    zip_code: string
    state: string
    shipping_street_address: string
    shipping_country: string
    shipping_city: string
    shipping_zip_code: string
    shipping_state: string
    cc: string[]
    bcc: string[]
    legal_name: string
    brand_name: string
    registration_number: string
    tax_number: string
}

export interface Purchase {
    currency: string
    products: Product[]
    total: number
    language: string
    notes: string
    debt: number
    subtotal_override: any
    total_tax_override: any
    total_discount_override: any
    total_override: any
    request_client_details: any[]
    timezone: string
    due_strict: boolean
    email_message: string
}

export interface Product {
    name: string
    quantity: string
    price: number
    discount: number
    tax_percent: string
    category: string
}

export interface Payment {
    is_outgoing: boolean
    payment_type: string
    amount: number
    currency: string
    net_amount: number
    fee_amount: number
    pending_amount: number
    pending_unfreeze_on: number
    description: string
    paid_on: number
    remote_paid_on: number
}

export interface IssuerDetails {
    website: string
    legal_street_address: string
    legal_country: string
    legal_city: string
    legal_zip_code: string
    bank_accounts: BankAccount[]
    legal_name: string
    brand_name: string
    registration_number: string
    tax_number: string
}

export interface BankAccount {
    bank_account: string
    bank_code: string
}

export interface TransactionData {
    payment_method: string
    extra: Extra
    country: string
    attempts: Attempt[]
}

export interface Extra { }

export interface Attempt {
    type: string
    successful: boolean
    payment_method: string
    extra: Extra2
    country: string
    client_ip: string
    processing_time: number
    error: Error
}

export interface Extra2 { }

export interface Error {
    code: string
    message: string
}

export interface StatusHistory {
    status: string
    timestamp: number
    related_object: RelatedObject
}

export interface RelatedObject {
    type: string
    id: string
}

export interface CurrencyConversion {
    original_currency: string
    original_amount: number
    exchange_rate: number
}
