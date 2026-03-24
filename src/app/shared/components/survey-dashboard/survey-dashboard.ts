import { Component,inject } from '@angular/core';
import { SurveyService } from '../../services/survey_service';
import { SurveyCard } from '../survey-card/survey-card';
import { SurveyOverview } from '../survey-overview/survey-overview';

@Component({
  selector: 'app-survey-dashboard',
  standalone: true,
  imports: [SurveyCard, SurveyOverview],
  templateUrl: './survey-dashboard.html',
  styleUrls: ['./survey-dashboard.scss'],
})
export class SurveyDashboard {
  surveyService = inject(SurveyService);

  surveys = this.surveyService.endingSoonSurveys;
}
