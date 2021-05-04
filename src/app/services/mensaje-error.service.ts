import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeErrorService {

  constructor() { }

  AuthErrorCodeSpanish(description: String) {  
    if(description == "email-already-in-use"){
      return "Este correo ya está siendo usado por otro usuario"
    }else if(description == "user-disabled"){
      return "Este usuario ha sido deshabilitado"
    }else if(description == "operation-not-allowed"){
      return "Operación no permitida"
    }else if(description == "invalid-email"){
      return "Correo electrónico no válido"
    }else if(description == "wrong-password"){
      return "Contraseña incorrecta"
    }else if(description == "user-not-found"){
      return "No se encontró cuenta del usuario con el correo especificado"
    }else if(description == "network-request-failed"){
      return "Promblema al intentar conectar al servidor"
    }
    else if(description == "weak-password"){
      return "Contraseña muy débil o no válida"
    }else if(description == "missing-email"){
      return "Hace falta registrar un correo electrónico"
    }else if(description == "internal-error"){
      return "Error interno"
    }else if(description == "invalid-custom-token"){
      return "Token personalizado invalido"
    }else if(description == "too-many-requests"){
      return "Ya se han enviado muchas solicitudes al servidor"
    }else{
      return "Algo salio mal, intentelo de nuevo"
    }        
  }
  
}
