import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  doctor:string = "assets/img/doctor.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
