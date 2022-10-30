import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Medico } from "../models/cadastro-medico.model";


//single source of truth
@Injectable({ providedIn: 'root' })
export class MedicoService {
  private listaMedicosAtualizada = new Subject<Medico[]>();


  private medico: Medico[] = [
    {
      nome: 'Marcia',
      especialidade: 'geral',
      fone: '1111-1111',
      email: 'marcia@email.com',
      crm: '5435135SP'
    }
  ]

  constructor (private httpClient: HttpClient) { }

  getMedicos(): void { }


  adicionarMedico(
    nome: string,
    especialidade: string,
    fone: string,
    email: string,
    crm: string): void {

    const medico: Medico = { nome, especialidade, fone, email, crm }
    this.medico.push(medico)
    this.listaMedicosAtualizada.next([...this.medico]);
  }
  getListaMedicosAtualizadaObservable() {
    return this.listaMedicosAtualizada.asObservable();
  }
}
