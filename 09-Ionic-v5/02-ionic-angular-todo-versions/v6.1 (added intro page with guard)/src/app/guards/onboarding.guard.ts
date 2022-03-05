import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor (private dataService: DataService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) //: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      const isComplete = await this.dataService.getIsIntroWatchedAsync();

      console.log('Testing isComplete: ' + isComplete);

      if (!isComplete) {
        this.router.navigateByUrl('/intro');
      }

      return isComplete;
  }

}
