import { AlertsService } from './../../utils/alerts.service';
import { LoginService } from 'src/app/service/endpoints.service';
import { LoadingService } from './../../utils/loading.service';
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

  constructor (private _ngZone: NgZone,
    private endpoints: LoginService,
    private alert: AlertsService) { }

  ngOnInit(): void {
  }

  sendMail(mail: { assunto: string, mensagem: string }) {

    const toSend = {
      "para": "felipeb2silva@gmail.com",
      "assunto": mail.assunto,
      "mensagem": mail.mensagem,
      "modelo": "atestado"
    }

    this.endpoints.enviarEmail(toSend).subscribe(
      (data: any) => {
        this.alert.sucessT(data.message)
      },
      (erro: any) => {
        console.log(erro)
      }
    )

  }

}
