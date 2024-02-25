import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReaderResumenService } from './services/reader-resumen.service';
import * as jesus from "../assets/jsons/jesus-es.json";
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'profileCV';
  dataText: any;
  data: any =jesus;
  errors = {
    nombre:false,
    subject:false,
    email:false,
    message:false
  }
  messages={
    nombre:"(El nombre no puede estar vació)",
    subject:"(El asunto no puede estar vació)",
    email:"(El correo no puede estar vació)",
    message:"(El mensaje no puede estar vacío)"
  }
  constructor(
      private serviceText: ReaderResumenService,
    ) {
      
    }

  ngOnInit() {
    var ngInstance=this;
    $(document).ready(function () {
      var name=$("#hero h1").text();
      console.log("cargando javascript profile:::::::"+ name);

      $("form").on('click','#btn-sendEmail',function(event:any)
    	{
        console.log("preparando email:::::");
			var name=$("#name").val();
			var subject=$("#subject").val();
      var email=$("#email").val();
			var message=$("#message").val();
      
      var errorName=$("#errorName");
			var errorSubject=$("#errorSubject");
      var errorEmail=$("#errorEmail");
			var errorMessage=$("#errorMessage");
      
      if(name==""){ngInstance.errors.nombre=true;
                   errorName.text(ngInstance.messages.nombre)}else{
                    ngInstance.errors.nombre=false;
                   errorName.text("")
                   }
      if(subject==""){ngInstance.errors.subject=true;
                    errorSubject.text(ngInstance.messages.subject)}else{
                      ngInstance.errors.subject=false;
                     errorSubject.text("")
                     }
      if(email==""){ngInstance.errors.email=true;
                      errorEmail.text(ngInstance.messages.email)}else{
                        ngInstance.errors.email=false;
                       errorEmail.text("")
                       }
      if(message==""){ngInstance.errors.message=true;
                        errorMessage.text(ngInstance.messages.message)}else{
                          ngInstance.errors.message=false;
                         errorMessage.text("")
                         }
			console.log("enviando a:::::"+email);
        var local="http://localhost:9999/service/sendEmailContact";
        var dominio="https://node150639-env-9117163.fr-1.paas.massivegrid.net/service/sendEmailContact";
        if(ngInstance.errors.nombre==false && ngInstance.errors.subject==false
          && ngInstance.errors.email==false && ngInstance.errors.message==false
          ){
            $.post(dominio+"/"+name+"/"+subject+"/"+email+"/"+message,function(res:any)
            {
              console.log("se envio el mensaje");
              Swal.fire(
                'El email se envió con éxito!',
                '',
                'success'
              );
              $("#name").val("");
              $("#subject").val("");
              $("#email").val("");
              $("#message").val("");
              
              $("#errorName").text("");
              $("#errorSubject").text("");
              $("#errorEmail").text("");
              $("#errorMessage").text("");

              ngInstance.errors = {
                nombre:false,
                subject:false,
                email:false,
                message:false
              }
            });
        }else{
          console.log("Existen errores en los campos");
          Swal.fire(
            'No se pudo enviar el email!',
            'Existen errores en los campos, favor de verificar.',
            'error'
          );
        }
    	});
    });
    
  }
}
