import { Question } from './../../../models/question.interface';
import { BackendService } from './../../../services/backend.service';
import { StepperService } from './../../../services/stepper.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  constructor(private router: Router, private stepperService: StepperService, private backendService: BackendService) { }

  questionForm!: FormGroup;
  answers = [
    'a', 'b', 'c', 'd'
  ]

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      textoPregunta: new FormControl('', Validators.required),
      respuestaPregunta: new FormControl('', Validators.required)
    })
  }

  public get f() {
    return this.questionForm.controls;
  }


  addQuestionToDatabase(formValue: any) {
    this.stepperService.questionForm = formValue;

    let question: Question = {
      descripcion_pregunta: formValue.textoPregunta,
      respuesta_correcta: formValue.respuestaPregunta
    }
    this.backendService.postQuestion(question).subscribe(
      response => {
        console.log("se agregó la pregunta");
      }
    ) 
  }

}
