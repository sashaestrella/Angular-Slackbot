import { BackendService } from './../../../services/backend.service';
import { Answer } from './../../../models/answer.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StepperService } from 'src/services/stepper.service';

@Component({
  selector: 'answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {

  constructor(private stepperService: StepperService, private backendService: BackendService) { }

  answerForm!: FormGroup;

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      textoRespuesta1: new FormControl('', Validators.required),
      textoRespuesta2: new FormControl('', Validators.required),
      textoRespuesta3: new FormControl('', Validators.required),
      textoRespuesta4: new FormControl('', Validators.required)
    })
  }

  public get f() {
    return this.answerForm.controls;
  }

  addAnswerToDatabase(formValue: any) {
    this.stepperService.answersForm = formValue;

    for(let i=0; i < 4; i++) {
      let descripRespuesta;
      if(i == 0) {
        descripRespuesta = formValue.textoRespuesta1
      } else if(i == 1) {
        descripRespuesta = formValue.textoRespuesta2
      } else if(i == 2) {
        descripRespuesta = formValue.textoRespuesta3
      }  else {
        descripRespuesta = formValue.textoRespuesta4
      }

      let answer: Answer = {
        descripcion_respuesta: descripRespuesta
      }

      this.backendService.postAnswer(answer).subscribe(
        response => {
          console.log("se agregó la respuesta");
        }
      ) 
    } 
  }

}
