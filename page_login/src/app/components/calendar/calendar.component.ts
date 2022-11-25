import { CalendarOptions } from '@fullcalendar/angular';
import { Agenda } from './../../models/agenda';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterContentInit {

	@Input() data!: Agenda[]

	options:CalendarOptions ={
		events:this.data,
		headerToolbar: {
			left: "prev,next today"
		}
	}


	constructor () { }
	ngAfterContentInit(): void {
		console.table(this.data)
	}

	ngOnInit(): void {
		console.log(this.data)
	}

}
