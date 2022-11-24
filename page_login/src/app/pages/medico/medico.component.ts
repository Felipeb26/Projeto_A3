import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EndpointsConsultasService } from 'src/app/service/endpoints.consultas.service';
import { Agenda } from './../../models/agenda';
import { AlertsService } from './../../utils/alerts.service';
import { EncodesService } from './../../utils/encodes.service';
import { faStethoscope } from "@fortawesome/free-solid-svg-icons"
@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	consultas: Agenda[] = [];
	dataSource!: MatTableDataSource<any>;
	data!: Agenda;
	displayedColumns: string[] = ["nomeUser", "emailUser", "telefoneUser", "agenda", "actions"]
	steto = faStethoscope

	id: string = ""
	nome: string = ""
	email: string = ""
	senha: string = ""
	telefone: string = ""
	crm: string = ""
	especialidade: string = ""

	constructor (
		private route: Router,
		private alert: AlertsService,
		private endpoint: EndpointsConsultasService,
		private encodes: EncodesService,
		private _liveAnnouncer: LiveAnnouncer
	) { }

	ngOnInit(): void {
		const value = this.encodes.decodeString(localStorage.getItem("tk"))

		if (value) {
			const data = this.encodes.decodeString(value)
			if (data) {
				const index = data.indexOf(":{")
				const lastIndex = data.lastIndexOf("},")
				const user = data?.substring(index + 1, lastIndex + 1);
				const userData = JSON.parse(user);

				this.id = userData.id;
				this.nome = userData.nome;
				this.email = userData.email;
				this.senha = userData.senha;
				this.telefone = userData.telefone;
				this.crm = userData.crm;
				this.especialidade = userData.especialidade;
			}
		} else {
			this.alert.infoT("necessario se logar!");
			this.route.navigate(["/login"])
		}
		this.endpoint.getAllConsultas().subscribe(
			data => {
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort
				this.consultas = data;
				console.log(data)
			},
			erro => {
				console.log(erro)
			}
		)
	}

	sortElements(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
