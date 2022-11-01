class Usuarios{
    constructor(id, nome, email, senha,agenda, role, crm, especialidade){
        this.id = id;
        this.nome =nome;
        this.email = email;
        this.agenda = agenda;
        this.senha = senha,
        this.role = role
        this.crm = crm,
        this.especialidade = especialidade
    }
}

module.exports = Usuarios;