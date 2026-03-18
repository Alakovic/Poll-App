import { Component , inject} from '@angular/core';
import { SurveyService } from '../../services/survey_service';
import { SurveyCardBoard } from '../survey-card-board/survey-card-board';

@Component({
  selector: 'app-survey-overview',
  imports: [SurveyCardBoard],
  templateUrl: './survey-overview.html',
  styleUrl: './survey-overview.scss',
})
export class SurveyOverview {

  surveyService = inject(SurveyService);

  surveys = this.surveyService.surveyList;
}
