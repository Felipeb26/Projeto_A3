export interface USER {
    id?: string,
    nome: string,
    email: string,
    senha: string,
    agenda: Date
    role: Number,
    crm?: string,
    especialidade?: string
}