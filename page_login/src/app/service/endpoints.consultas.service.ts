import { Agenda } from './../models/agenda';
import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, MICRO1 } from 'src/environments/environment';
import { USER } from '../models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
	providedIn: 'root'
})
export class EndpointsConsultasService {

	@ViewChild("paginator") paginator!: MatPaginator

	constructor (
		private http: HttpClient
	) { }


	getAllConsultas(): Observable<Agenda[]> {
		return this.http.get<Agenda[]>(`${API_PATH}${MICRO1}/consultas`)
	}

}
