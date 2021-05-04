import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPublicacion'
})
export class FiltroPublicacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
