import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Medico } from "./cadastro-medico.model";
import { HttpClient } from '@angular/common/http';


//single source of truth
@Injectable({ providedIn: 'root' })
export class MedicoService {
  private listaMedicosAtualizada = new Subject<Medico[]>();


  private medico: Medico[] = [
    {
		nome: 'Marcia',
  		sobrenome: 'Silva',
 		especialidade: 'geral',
  		fone: '1111-1111',
  		email: 'marcia@email.com',
  		crm: '5435135SP'
	 }
  ]

  constructor(private httpClient: HttpClient) { }

  getMedicos(): void {  }


  adicionarMedico(
	nome: string,
	sobrenome: string,
	especialidade: string,
	fone: string,
	email: string,
	crm: string): void {

    const medico: Medico = { nome, sobrenome, especialidade, fone, email, crm }
    this.medico.push(medico)
    this.listaMedicosAtualizada.next([...this.medico]);
  }
  getListaMedicosAtualizadaObservable() {
    return this.listaMedicosAtualizada.asObservable();
  }
}
