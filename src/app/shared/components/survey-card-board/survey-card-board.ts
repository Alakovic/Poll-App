import { Component, inject ,Input} from '@angular/core';
import { SurveyService } from '../../services/survey_service';
import { Survey } from '../../interfaces/survey_interface';

@Component({
  selector: 'app-survey-card-board',
  imports: [],
  templateUrl: './survey-card-board.html',
  styleUrl: './survey-card-board.scss',
})
export class SurveyCardBoard {

   @Input() survey!: Survey;

  surveyService = inject(SurveyService);
}
