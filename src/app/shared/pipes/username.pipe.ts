import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../core/models/user';

@Pipe({
  name: 'username',
})
export class UsernamePipe implements PipeTransform {

  transform(value: User, locale: 'fr' | 'en' = 'fr'): string {
    return locale === 'fr' ?
      `${value.lastName.toUpperCase()} ${value.firstName}` :
      `${value.firstName} ${value.lastName}`;
  }

}
