import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private dataService: DataService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // const isComplete = await this.dataService.isIntroWatched; // accessors do not yet support async/await
    const isComplete = await this.dataService.getIsIntroWatched();

    console.log('Testing isComplete: ' + isComplete);

    if (!isComplete) {
      this.router.navigateByUrl('/intro');
    }

    return isComplete;
  }
}
