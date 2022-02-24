import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pendiente',
  templateUrl: './pendiente.page.html',
  styleUrls: ['./pendiente.page.scss'],
})
export class PendientePage implements OnInit {

  constructor( private authService:AuthService) { }

  ngOnInit() {
  }

   logOutUser(){
    this.authService.logOutUser();
  }

}
