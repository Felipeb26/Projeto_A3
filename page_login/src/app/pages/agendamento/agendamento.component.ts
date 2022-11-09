import { EncodesService } from './../../utils/encodes.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { USER } from 'src/app/models/usuario.model';
import { EndpointsService } from 'src/app/service/endpoints.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {

  especialidade: string = ""
  especialidades: USER[] = []
  medicos: USER[] = []

  id: string = ""
  nome: string = ""
  medico: string = ""
  especial: string = ""
  data: any

  selectDate: any
  doc: any = ""
  espe: any = ""

  constructor(
    private endpoints: EndpointsService,
    private encodes: EncodesService
  ) { }

  ngOnInit(): void {
    this.decodeToken()
    this.endpoints.getAll().subscribe(
      data => {
        data = data.filter(er => er.crm != null)
        this.especialidades = data
      },
      err => console.log(err)
    );
  }


  agendar(agenda: NgForm) {


    console.log(agenda.value)
  }



  decodeToken() {
    const value = this.encodes.decodeString(localStorage.getItem("tk"))

    if (value) {
      const data = this.encodes.decodeString(value)
      if (data) {
        const index = data.indexOf(":{")
        const lastIndex = data.lastIndexOf("},")
        const user = data?.substring(index + 1, lastIndex + 1);
        const userData = JSON.parse(user);

        this.id = userData.id;
        this.nome = userData.nome.toUpperCase();
      }
    }
  }

  selectEspecialidade(value: any) {
    this.espe = this.especialidades.filter(er => er.id == value).map(ap => ap.especialidade);
    this.medicos = this.especialidades.filter(er => er.id == value);
    this.doc = ""
  }

  selectMedico(value: any) {
    this.doc = this.medicos.filter(er => er.id == value).map(ap => ap.nome);
  }

  showData(value: Date) {
    this.selectDate = value
  }

}
