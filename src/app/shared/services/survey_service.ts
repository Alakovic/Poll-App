import { Injectable, Signal, signal } from '@angular/core';
import { Question, Survey } from '../interfaces/survey_interface';
import { SurveyCategory } from '../types/category_types';


@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  surveyList = signal<Survey[]>([]);

  constructor() {
    this.surveyList.set(this.surveys);
  }

  surveys = [
    {
      title: "Let's plan the next team event together",
      description:
        'We want to make sure that everyone has a great time at our next team event. Please take a moment to share your preferences and ideas for activities, venues, and dates. Your input will help us create an unforgettable experience for everyone!',
      category: 'Team activities' as SurveyCategory,
      endDate: new Date('2026-03-19'),
    },
    {
      title: 'Fit & wellness survey',
      description:
        'We want to make sure that everyone has a great time at our next team event. Please take a moment to share your preferences and ideas for activities, venues, and dates. Your input will help us create an unforgettable experience for everyone!',
      category: 'Health & Wellness' as SurveyCategory,
      endDate: new Date('2026-03-22'),
    },
    {
      title: 'Gaming habits and favorite games',
      description:
        'We want to make sure that everyone has a great time at our next team event. Please take a moment to share your preferences and ideas for activities, venues, and dates. Your input will help us create an unforgettable experience for everyone!',
      category: 'Gaming & Entertainment' as SurveyCategory,
      endDate: new Date('2026-03-25'),
    },
  ];



  getDaysLeft(endDate: Date): number {
    let today = new Date();
    let timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getNumber(index: number): number {
    return index + 1;
  }

}
