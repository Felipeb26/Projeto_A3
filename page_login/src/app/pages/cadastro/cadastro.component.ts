import { USER } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicoService } from 'src/app/service/cadastro-medico.service';
import { LoginService } from 'src/app/service/endpoints.service';
import { AlertsService } from 'src/app/utils/alerts.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {


  user: string = "Paciente"
  disable_crm: string = "disable"
  expand: string ="expand_more"
  check: boolean = false
  CadastroForm!: FormGroup;
  showPassword: boolean = false;
  role: number = 0

  crmInput($event: any) {
    const isCheck = $event.target.checked;
    if (isCheck) {
      this.user = "Medico"
      this.disable_crm = "false"
      this.check = true
    } else {
      this.user = "Paciente"
      this.disable_crm = "disable"
      this.check = false
    }
  }

  constructor (
    private medicoService: MedicoService,
    private formBuilder: FormBuilder,
    private endpoints: LoginService,
    private route: Router,
    private alert: AlertsService) { }

  ngOnInit(): void {
    this.CadastroForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    );
  }


  panelOpenState(){
  const exp = this.expand;
    if(exp.endsWith("less")){
      this.expand = "expand_more"
    }else{
      this.expand = "expand_less"
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  AdicionarMedico(form: NgForm) {
    if (form.invalid) {

      return this.medicoService.adicionarMedico(
        form.value.nome,
        form.value.especialidade,
        form.value.fone,
        form.value.email,
        form.value.crm
      )
    }
    form.resetForm();
  }


  cadastrar(usuario: { nome: string, email: string, cpf: string, telefone: string, senha: string, especialidade: string, crm: string }) {

    if (usuario.crm == null || undefined) {
      this.role = 0
    } else {
      this.role = 1
    }

    const save = {
      "nome": usuario.nome,
      "email": usuario.email,
      "senha": usuario.senha,
      "role": this.role
    }

    this.endpoints.salvarUsuario(save).subscribe(
      (result: USER) => {
        console.log(result)
        this.alert.sucessT(`Usuario ${save.nome} cadastrado!`)
      //   setTimeout(() => 5000);
      //   this.route.navigate([""])
      // },
    },
      (error: any) => {
        const er = error.error.errorList;
        if (er != null || undefined) {
          let erro = new String(er);

          erro = erro.replace("[", "")
          erro = erro.replace("]", "")
          this.alert.errorT(erro)
        }

        console.log(error)
      }
    )

  }
}