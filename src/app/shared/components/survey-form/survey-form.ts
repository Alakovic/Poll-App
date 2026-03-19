import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './survey-form.html',
  styleUrls: ['./survey-form.scss'],
})
export class SurveyForm {}
