import { LoadingService } from './../utils/loading.service';
import { MAil } from '../models/email.model';
import { MICRO1 } from '../../environments/environment';
import { Token } from '../models/token.model';
import { LoginModel } from 'src/app/models/LoginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/environments/environment';
import { MICRO2 } from 'src/environments/environment.prod';
import { finalize, Observable } from "rxjs";
import { USER } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor (
    private http: HttpClient,
  ) { }

  fazerLogin(login: LoginModel): Observable<Token> {
    return this.http.post<Token>(`${API_PATH}${MICRO1}/login`, login);
  }

  getAll(): Observable<USER[]> {
    return this.http.get<USER[]>(`${API_PATH}${MICRO1}/users`)
                      .pipe();
  }


  enviarEmail(mail: MAil): Observable<any> {
    return this.http.post<any>(`${API_PATH}${MICRO2}/index`, mail);
  }

}
