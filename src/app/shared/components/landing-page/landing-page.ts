import { Component } from '@angular/core';
import { SurveyDashboard } from '../survey-dashboard/survey-dashboard';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SurveyDashboard],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss'],
})
export class LandingPage {}
