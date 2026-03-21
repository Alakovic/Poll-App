import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuestionForm } from '../question-form/question-form';
import { SurveyService } from '../../services/survey_service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [RouterLink, QuestionForm, ReactiveFormsModule],
  templateUrl: './survey-form.html',
  styleUrls: ['./survey-form.scss'],
})
export class SurveyForm {
  router = inject(Router);
  surveyService = inject(SurveyService);

  ngOnInit() {
    this.addQuestion();
  }

  surveyForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    date: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    questions: new FormArray<FormGroup>([]),
  });

  questionsArray(): FormArray<FormGroup> {
    return this.surveyForm.controls.questions;
  }

  createQuestionGroup() {
    return new FormGroup({
      title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      allowMultiple: new FormControl(false, { nonNullable: true }),
      answers: new FormArray([
        new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      ]),
    });
  }

  addQuestion() {
    this.questionsArray().push(this.createQuestionGroup());
  }

  removeQuestion(index: number) {
    if (this.questionsArray().length > 1) {
      this.questionsArray().removeAt(index);
    }
  }

 

  onSubmit() {
    if (this.surveyForm.valid) {
      this.router.navigate(['']);
    } else {
      console.log('Survey not completed ');
    }
  }
}
