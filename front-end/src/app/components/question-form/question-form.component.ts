import { Question } from './../../../models/question.interface';
import { BackendService } from './../../../services/backend.service';
import { StepperService } from './../../../services/stepper.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  constructor(private router: Router, private stepperService: StepperService, private backendService: BackendService) { }

  @Input() values: any;
  @Output() newValues: EventEmitter<any> = new EventEmitter<any>();
  questionForm!: FormGroup;
  answers = [
    'a', 'b', 'c', 'd'
  ]

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      textoPregunta: new FormControl('', Validators.required),
      respuestaPregunta: new FormControl('', Validators.required)
    })

    if(this.values !== undefined) {
      this.questionForm.patchValue({
        textoPregunta: this.values.descripcion_pregunta,
        respuestaPregunta: this.values.respuesta_correcta
      })
    }
  }

  public get f() {
    return this.questionForm.controls;
  }

  editarEnLaBaseDeDatos() {
    let question: Question = {
      descripcion_pregunta: this.f.textoPregunta.value,
      respuesta_correcta: this.f.respuestaPregunta.value
    }
    this.newValues.emit(question);
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
      },
      error => {
        this.router.navigate(['/error']);
      }
    )
    this.stepperService.questionError = formValue.textoPregunta;
  }

}
