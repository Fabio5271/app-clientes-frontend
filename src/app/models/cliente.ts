export class Cliente {
    id: number;
    nome: string;
    cpf: string;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complEndrc: string;

    constructor(){
        this.id = 0;
        this.nome = "";
        this.cpf = "";
        this.cep = "";
        this.logradouro = "";
        this.bairro = "";
        this.cidade = "";
        this.uf = "";
        this.complEndrc = "";
    }
}
