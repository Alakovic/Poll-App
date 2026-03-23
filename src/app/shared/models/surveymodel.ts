import { Survey, Question } from "../interfaces/survey_interface";
import { SurveyCategory } from "../types/category_types";

export class SurveyModel implements Survey {
    id: number;
    title: string;
    description: string;
    category: SurveyCategory;
    endDate?: Date | string;
    questions: Question[];  

    constructor(data:Partial<Survey>={}) {
        this.id = data.id ?? 0;
        this.title = data.title ?? '';
        this.description = data.description ?? '';
        this.category = data.category as SurveyCategory;
        this.endDate = this.parseDate(data.endDate);
        this.questions = data.questions ?? [];
    }

    getCleanAddJson() {
        return {
            title: this.title,
            description: this.description,
            category: this.category,
            endDate: this.endDate,
        }
    }

    parseDate(value: string | Date | undefined): Date | undefined {
        if (!value) return undefined;
        if(value instanceof Date) return value;

        let[day, month, year] = value.split('-');
        return new Date (
            Number(year),
            Number(month) - 1,
            Number(day)
        )
    }

}