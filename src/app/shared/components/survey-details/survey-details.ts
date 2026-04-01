import { Component, inject, HostListener } from '@angular/core';
import { SurveyService } from '../../services/survey_service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './survey-details.html',
  styleUrls: ['./survey-details.scss'],
})
export class SurveyDetails {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  surveyService = inject(SurveyService);
  detail = this.surveyService.surveyDetail;
  selectedAnswers: { [questionId: number]: string[] } = {};
  isSubmitted: boolean = false;
  show: boolean = false;
  isDesktop = window.innerWidth > 800;

  ngOnInit(): void {
    let surveyId = Number(this.route.snapshot.paramMap.get('id'));
    if (!surveyId) return;
    this.surveyService.getSurveyWithDetails(surveyId);
  }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > 800;
    if(this.isDesktop) {
      this.show = true;
    }
  }

  onAnswerChange(questionId: number, answer: string, event: any) {
    const checked = event.target.checked;
    if (!this.selectedAnswers[questionId]) {
      this.selectedAnswers[questionId] = [];
    }
    if (checked) {
      this.selectedAnswers[questionId].push(answer);
    } else {
      this.selectedAnswers[questionId] = this.selectedAnswers[questionId].filter(
        (a) => a !== answer,
      );
    }
  }

  isSurveyComplete(): boolean {
    let questions = this.detail().questions;
    return questions.every((q) => {
      let answers = this.selectedAnswers[q.id];
      return answers && answers.length > 0;
    });
  }

  hasResults(): boolean {
    return this.detail().questions.some((q) => q.answers.some((a) => a.votesCount > 0));
  }

  getTotalVotes(question: any): number {
    return question.answers.reduce((sum: number, a: any) => sum + a.votesCount, 0);
  }

  getPercentage(question: any, answer: any): number {
    let totalVotes = this.getTotalVotes(question);
    if (totalVotes === 0) return 0;
    return Math.round((answer.votesCount / totalVotes) * 100);
  }

  async submitSurvey() {
    await this.surveyService.submitSurvey(this.selectedAnswers);
    this.isSubmitted = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }


}
