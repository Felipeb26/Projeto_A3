import { LoadingService } from './../utils/loading.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {
  private activeRequest = 0;
  constructor (
    private load:LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.activeRequest === 0){
      this.load.show();
    }
    this.activeRequest++;


    let token = localStorage.getItem("tk");
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(jwtToken).pipe(
      finalize(() => {
        this.activeRequest--;
        if(this.activeRequest===0){
          this.load.hide();
        }
      })
    )
  }
}
