import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agenda } from './../../models/agenda';

@Component({
	selector: 'app-modal.popup',
	templateUrl: './modal.popup.component.html',
	styleUrls: ['./modal.popup.component.scss']
})
export class ModalPopupComponent implements OnInit {

	nome: any = "";
	email: any = "";
	telefone: any = "";
	agenda: any = ""
	prioridade: any = ""
	constructor (@Inject(MAT_DIALOG_DATA) public data: Agenda) {
		this.nome = data.nomeUser;
		this.email = data.emailUser;
		this.telefone = data.telefoneUser;
		this.agenda = data.agenda;
		this.prioridade = data.prioridade;
		console.log(data)
	}

	ngOnInit(): void {
	}

}
