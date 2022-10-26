import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/utils/alerts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo:string = "assets/img/logo.png"
  open:boolean=false

  constructor(
    private alert:AlertsService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("tk")
    this.alert.sucessT("usuario deslogado com sucesso!")
  }

}
