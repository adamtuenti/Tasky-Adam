import { Component, OnInit } from '@angular/core';

import { Publicaciones } from 'src/app/models/publicaciones';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})



export class HomePage implements OnInit {

  publicaciones: Publicaciones[]=[];

  constructor(private publicacionesService: PublicacionesService,
              //private emailComposer: EmailComposer
              ) { }

  ngOnInit() {
    this.publicacionesService.getPublicaciones().subscribe(res => this.publicaciones = res);
    // this.emailComposer.isAvailable().then((available: boolean) =>{
    // if(available) {
   // this.sendMail();
    // }
    // });

   


  }

//   sendMail(){

//     this.emailComposer.open({
//       to: 'hwong@espol.edu.ec',
//     })
//     let email = {
//       to: 'hwong@espol.edu.ec',
//       cc: 'adanavarrete15@gmail.com',
//      // bcc: ['john@doe.com', 'jane@doe.com'],
//       // attachments: [
//       //   'file://img/logo.png',
//       //   'res://icon.png',
//       //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
//       //   'file://README.pdf'
//       // ],
//       subject: 'Cordova Icons',
//       body: 'How are you? Nice greetings from Leipzig',
//       isHtml: true
//     };
//     // Send a text message using default options
//     this.emailComposer.open(email);
//     console.log('hola');
//     console.log(email)
// }

}
