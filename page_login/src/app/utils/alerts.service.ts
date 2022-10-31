import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  back: string = "#2d2d2d"
  color: string = "#34bcbe"

  constructor () { }

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3500,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    background: this.back,
    color: this.color
  })

  sucess(title: any, text: any) {
    this.Toast.fire({
      title: title,
      text: text,
      icon: "success",
    });
  };


  info(title: any, text: any) {
    this.Toast.fire({
      title: title,
      text: text,
      icon: "info",
    });
  };


  error(title: any, text: any) {
    this.Toast.fire({
      icon: "error",
      title: title,
      text: text,
    })
  };


  question(title: any, text: any) {
    this.Toast.fire({
      title: title,
      text: text,
      icon: "question",
    });
  };


  warning(title: any, text: any) {
    this.Toast.fire({
      title: title,
      text: text,
      icon: "warning",
    });
  };

  //using only the text
  sucessT(text: any) {
    this.Toast.fire({
      text: text,
      icon: "success",
    });
  };


  infoT(text: any) {
    this.Toast.fire({
      text: text,
      icon: "info",
    });
  };


  errorT(text: any) {
    this.Toast.fire({
      icon: "error",
      text: text,
    })
  };


  questionT(text: any) {
    this.Toast.fire({
      text: text,
      icon: "question",
    });
  };


  warningT(text: any) {
    this.Toast.fire({
      text: text,
      icon: "warning",
    });
  };

}
