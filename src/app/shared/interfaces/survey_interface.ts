import { SurveyCategory } from "../types/category_types";


export interface Survey {
    title: string;
    description: string;
    category: SurveyCategory;
    endDate: Date;
}

export interface Question {
    title: string;
    answers: string[];
    allowMultiple: boolean;
}