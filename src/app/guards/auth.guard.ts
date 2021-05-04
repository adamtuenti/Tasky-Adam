import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private AFauth: AngularFireAuth){}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.AFauth.authState.pipe(map( auth =>{
        if(isNullOrUndefined(auth)){
          this.router.navigateByUrl('/login');
          return false;
          //redirigir al login
        }else{
          return true;
          //redirigir al home profesor
        }
      }
      ))
      
  
    }
    
  }