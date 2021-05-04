import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PendienteGuard implements CanActivate {
   id:string=localStorage.getItem('userId');
  // Estado: string =localStorage.getItem('Estado');

   constructor(private router: Router,
    private AFauth: AngularFireAuth,
    private usuarioService: UsuarioService){
    
    }
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
     return this.AFauth.authState.pipe(map( auth =>{
      if(isNullOrUndefined(auth)){
        
        return false;
        //redirigir al login
      }
      else{
        this.router.navigateByUrl('/perfil');
        return false;
      }

    }
    ))
  }
  
}
