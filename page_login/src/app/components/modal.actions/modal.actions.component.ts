import { AlertsService } from './../../utils/alerts.service';
import { Consulta } from './../../../../../CRUD/src/model/consulta.model';
import { Agenda } from './../../models/agenda';
import { Endpoints2Service } from './../../service/endpoints2.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EndpointsService } from 'src/app/service/endpoints.service';
import { EndpointsConsultasService } from 'src/app/service/endpoints.consultas.service';
import { MatTable } from '@angular/material/table';

@Component({
	selector: 'app-modal.actions',
	templateUrl: './modal.actions.component.html',
	styleUrls: ['./modal.actions.component.scss']
})
export class ModalActionsComponent implements OnInit {
	@ViewChild(MatTable) table!: MatTable<Agenda>;

	data!: Agenda
	id: string = ""
	requestType: string = ""

	today: any = Date.now();
	nome: any = "";
	email: any = "";
	telefone: any = "";
	prioridade: any = "";
	agenda: any = "";
	date!: Date;

	priorid: string = ""
	color: string = ""
	selecteDate: any = "";
	disabled:string="disabled"

	prioridades: any[] = [
		{ value: "Emergência", color: "#ff0000" },
		{ value: "Urgência", color: "#eeff00" },
		{ value: "Pouco Urgente", color: "#00ff40" },
		{ value: "Não Urgente", color: "#0000ff" },
	]

	constructor (
		@Inject(MAT_DIALOG_DATA) data: any,
		private consultas: EndpointsConsultasService,
		private endpoints2: Endpoints2Service,
		private alert:AlertsService
	) {
		this.id = data.id;
		this.requestType = data.type
		this.table= data.table
	}

	ngOnInit(): void {
		this.consultas.getConsultaById(this.id).subscribe(
			data => {
				this.data = data
				this.initProperties();
			},
			erro => {
				console.log(erro)
			}
		);
	}

	initProperties() {
		this.nome = this.data.nomeUser;
		this.email = this.data.emailUser;
		this.telefone = this.data.telefoneUser;
		this.agenda = this.data.agenda;
		this.prioridade = this.prioridade;
	}

	selectPriorid(value: any) {
		this.priorid = value;
		this.prioridades.map(it => {
			if (it.value == value) {
				this.color = it.color;
			}
		});
	}

	selectDate(value: Date) {
		this.selecteDate = value;
	}


	method(){
		if(this.requestType.startsWith("edit")){
			this.editarConsulta();
		}else{
			this.deletarConsulta(	)
		}
	}

	editarConsulta() {
		let agenda = this.selecteDate;
		if (this.selecteDate == null || undefined) {
			agenda = this.data.agenda;
		}

		console.log(agenda)
		const consulta = {
			"nomeMedico": this.data.nomeMedico,
			"emailMedico": this.data.emailMedico,
			"nomeUser": this.data.nomeUser,
			"emailUser": this.data.emailUser,
			"telefoneUser": this.data.telefoneUser,
			"agenda": agenda,
			"prioridade": this.priorid
		};
		console.table(consulta)
		this.consultas.updateConsulta(this.id, consulta).subscribe(
			data => {
				console.log(data);
			},
			erro => {
				console.log(erro)
			}
		)
	}

	deletarConsulta() {
		const id = this.id;
		this.consultas.deleteConsulta(id).subscribe(
			data => {
				console.log(data);
				this.alert.sucessT(data.message)
				this.table.renderRows();
			},
			erro => {
				console.log(erro)
			}
		)
	}
}
