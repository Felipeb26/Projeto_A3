import { AlertsService } from 'src/app/utils/alerts.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/endpoints.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  doctor: string = "assets/img/doctor.jpg"

  constructor (
    private endpoints: LoginService,
  ) { }

  ngOnInit(): void {
    this.endpoints.getAll().subscribe(
      data => console.log(data),
      err => console.log(err))
  }



}
