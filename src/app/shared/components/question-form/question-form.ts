import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey_service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  imports: [ReactiveFormsModule],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
})
export class QuestionForm {
  @Input() index!: number;
  @Input() group!: FormGroup;
  @Output() remove = new EventEmitter<number>();

  surveyService = inject(SurveyService);
  maxAnswers = 6;
  minAnswers = 2;

  
  answersArray() {
    return this.group.get('answers') as FormArray;
  }

  addAnswer() {
    if (this.answersArray().length < this.maxAnswers) {
      this.answersArray().push(
        new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      );
    }
  }

  getError(controlName: string): string | null {
    const control = this.group.get(controlName);
    if (!control || !control.touched || !control.invalid) return null;
    if (control.hasError('required')) return 'Required';
    return null;
  }

  removeAnswer(answerIndex: number) {
    if (this.answersArray().length > this.minAnswers) {
      this.answersArray().removeAt(answerIndex);
    }
  }

  removeQuestion() {
    this.remove.emit(this.index);
  }
}
