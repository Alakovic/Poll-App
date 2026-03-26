import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  router = inject(Router);

  isSurveyDetails(): boolean {
    return this.router.url.startsWith('/survey/');
  }

  isHidden(): boolean {
    return this.router.url === '/survey-form' || this.router.url === '/';
  }

  getLogo(): string {
    if (this.isSurveyDetails()) {
      return './assets/img/icon_purpledark.svg';
    }
    return './assets/img/icon_orange.svg';
  }

}
