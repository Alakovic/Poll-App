import { Injectable, signal } from '@angular/core';
import { Survey } from '../interfaces/survey_interface';
import { SurveyCategory } from '../types/category_types';
import { createClient } from '@supabase/supabase-js';
import { SurveyModel } from '../models/surveymodel';
import { QuestionModel } from '../models/questionmodel';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  supabase = createClient(
    'https://xkhifaaddekbpkgsxqhi.supabase.co',
    'sb_publishable_n2CTOVwdc0OkCrsi_An1sA_Lk8dJ0z7',
  );

  surveyList = signal<Survey[]>([]);
  surveyDetail = signal<Survey>({
    id: 0,
    title: '',
    description: '',
    category: 'Team activities',
    endDate: new Date(),
    questions: [],
  });

  categories: SurveyCategory[] = [
    'Team activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation',
  ];

  surveyListInsertChannel;

  surveyDetailInsertChannel;

  answersInsertChannel;

  constructor() {
    this.getAllSurveys();
    this.surveyListInsertChannel = this.supabase
      .channel('surveys-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'surveys' },
        (payload) => {
          let newSurvey = new SurveyModel(payload.new);
          this.surveyList.update((surveys) => [...surveys, newSurvey]);
          console.log('Change received!', payload);
        },
      )
      .subscribe();

    this.surveyDetailInsertChannel = this.supabase
      .channel('questions-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'questions' },
        (payload) => {
          let newQuestion = new QuestionModel(payload.new);

          this.surveyDetail.update((survey) => {
            if (survey.id === payload.new['survey_id']) {
              return {
                ...survey,
                questions: [...survey.questions, newQuestion],
              };
            }
            return survey;
          });
          console.log('Change received!', payload);
        },
      )
      .subscribe();

      this.answersInsertChannel = this.supabase
      .channel('answers-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'answers' },
        (payload) => {
          let questionId = payload.new['question_id'];
          let answerText = payload.new['text'];

          this.surveyDetail.update((survey) => {
            return {
              ...survey,
              questions: survey.questions.map((question) => {
                if (question.id === questionId) {
                  return {
                    ...question,
                    answers: [...question.answers, answerText],
                  };
                }
                return question;
              }),
            };
          });
          console.log('Change received!', payload);
        },
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.surveyListInsertChannel);
    this.supabase.removeChannel(this.surveyDetailInsertChannel);
    this.supabase.removeChannel(this.answersInsertChannel);
  }

  getDaysLeft(endDate: Date | string | undefined): number {
    if (!endDate) return 0;

    let end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    let today = new Date();
    let timeDiff = end.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getNumber(index: number): number {
    return index + 1;
  }

  async getAllSurveys() {
    let response = await this.supabase.from('surveys').select('*');
    if (response.data) {
      this.surveyList.set(response.data as Survey[]);
    }
  }

  async addSurvey(survey: SurveyModel) {
    let survey_data = survey.getCleanAddJson();
    const { data, error } = await this.supabase
      .from('surveys')
      .insert(survey_data)
      .select()
      .single();

    if (error) {
      console.log(error);
      return;
    }

    let surveyId = data.id;
    for (let question of survey.questions) {
      await this.addQuestion(surveyId, new QuestionModel(question));
    }
  }

  async addQuestion(surveyId: number, question: QuestionModel) {
    let question_data = question.getCleanQuestionJson(surveyId);
    const { data, error } = await this.supabase
      .from('questions')
      .insert(question_data)
      .select()
      .single();

    if (error) {
      console.log(error);
      return;
    }
    let questionId = data.id;
    for (let answer of question.answers) {
      await this.addAnswer(questionId, answer);
    }
  }

  async addAnswer(questionId: number, text: string) {
    let { error } = await this.supabase.from('answers').insert({
      questionId: questionId,
      text: text,
      votesCount: 0,
    });

    if (error) {
      console.log(error);
    }
  }
}
