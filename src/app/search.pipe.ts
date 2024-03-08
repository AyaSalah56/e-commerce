import { product } from './product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product :product[] , term:string):product[] {
    return product.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
