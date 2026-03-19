import { Component } from '@angular/core';
import { SurveyDashboard } from '../survey-dashboard/survey-dashboard';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SurveyDashboard, RouterLink],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss'],
})
export class LandingPage {}
