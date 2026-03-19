import { Routes } from '@angular/router';
import { LandingPage } from './shared/components/landing-page/landing-page';
import { SurveyForm } from './shared/components/survey-form/survey-form';

export const routes: Routes = [
    {
       path: '',
       component: LandingPage   
    },
    {
      path: 'survey-form' ,
      component: SurveyForm
    }
    ];