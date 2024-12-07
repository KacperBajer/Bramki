export type User = {
    id: number
    firstname: string
    lastname: string
    email: string
    role: string
    class: string
    cards: Card[]
}
export type Card = {
    id: number,
    type: 'UHF' | 'RFID'
}
export type Controller = {
    id: number
    name: string
    type: 'barrier' | 'gate'
    mode: 'in' | 'out'
}
export type Logs = {
    id: number
    action: string
    status: 'success' | 'failed'
    comment: string
    userid: number
    firstname: string
    lastname: string
    date: string
}