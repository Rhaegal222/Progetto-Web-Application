import { CanActivateFn } from '@angular/router';

export const storekeeperGuard: CanActivateFn = (route, state) => {
  return true;
};
