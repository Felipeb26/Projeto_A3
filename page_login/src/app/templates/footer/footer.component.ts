import { NgForm } from '@angular/forms';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { faLinkedin, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  //icons
  faLinkedin = faLinkedin
  faFacebook = faFacebook
  faGithub = faGithub
  faMail = faEnvelope

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  constructor (private _ngZone: NgZone) { }

  ngOnInit(): void {
  }

  sendMail(mail: NgForm) {
    console.log(mail)
  }

}
