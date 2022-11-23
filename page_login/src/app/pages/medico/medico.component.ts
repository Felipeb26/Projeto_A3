import { EndpointsService } from './../../service/endpoints.service';
import { AlertsService } from './../../utils/alerts.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {

	constructor (
		private alert:AlertsService,
		private endpoint:EndpointsService
	) { }

	ngOnInit(): void {
		this.endpoint.getAllConsultas().subscribe(
			data =>{
				console.log(data)
			},
			erro =>{
				console.log(erro)
			}
		)
	}


}
