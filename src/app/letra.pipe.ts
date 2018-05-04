import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'diferente'
})

export class LetraPipe implements PipeTransform{
    transform(valor: any, args?: any){
        if(!valor)
            return false;
        return valor.substr(0,3)+'...';
    }
}