export type User = {
    id: number
    username: string
    role: string
}
export type Controller = {
    id: number
    name: string
    type: 'barrier' | 'gate'
    mode: 'in' | 'out'
}