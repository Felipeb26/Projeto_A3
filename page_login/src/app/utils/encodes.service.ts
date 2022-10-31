import { AlertsService } from 'src/app/utils/alerts.service';
import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root'
})
export class EncodesService {

  constructor (private alert: AlertsService) { }


  encodeString(chave: string) {
    if(chave!= null){
      let code = Base64.encode(chave);
      return code;
    }
    return null;
  }

  decodeString(chave: string|null) {
    if(localStorage.getItem("tk") != null){
      let code = Base64.decode(localStorage.getItem("tk")!);
      return code;
    }else{
      this.alert.errorT("necessário estar logado")
      return null;
    }
  }
}
