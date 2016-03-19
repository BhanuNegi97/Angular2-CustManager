import { provide } from 'angular2/core';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

export const SERVICE_PROVIDERS: any[] = [
  provide(DataService, { useClass: DataService }),
  provide(AuthService, { useClass: AuthService })
];