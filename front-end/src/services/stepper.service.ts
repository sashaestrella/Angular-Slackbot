import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class StepperService {
    questionForm: any;
    answersForm: any;
    questionError: any;
    messageError: string = '';
}