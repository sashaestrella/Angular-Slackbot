import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class StepperService {
    questionForm: any;
    answersForm: any;
    id: number = 1;
    idRespuesta: number = 0;

    setIdQuestion() {
        this.id++;
    }

    getIdQuestion() {
        return this.id;
    }
}