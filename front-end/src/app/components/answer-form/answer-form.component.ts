import { BackendService } from './../../../services/backend.service';
import { Answer } from './../../../models/answer.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepperService } from 'src/services/stepper.service';
import { Router } from '@angular/router';
import { isThisTypeNode } from 'typescript/lib/tsserverlibrary';

@Component({
  selector: 'answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {

  constructor(private router: Router, private stepperService: StepperService, private backendService: BackendService) { }

  @Input() values: any;
  @Input() agregar: boolean = false;
  @Output() newValues: EventEmitter<any> = new EventEmitter<any>();
  answerForm!: FormGroup;

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      textoRespuesta1: new FormControl('', Validators.required),
      textoRespuesta2: new FormControl('', Validators.required),
      textoRespuesta3: new FormControl('', Validators.required),
      textoRespuesta4: new FormControl('', Validators.required)
    })

    if(this.values !== undefined && this.agregar == false) {
      this.answerForm.patchValue({
        textoRespuesta1: this.values[0].descripcion_respuesta,
        textoRespuesta2: this.values[1].descripcion_respuesta,
        textoRespuesta3: this.values[2].descripcion_respuesta,
        textoRespuesta4: this.values[3].descripcion_respuesta
      })
    }
  }

  public get f() {
    return this.answerForm.controls;
  }

  editarEnLaBaseDeDatos() {
    let answer: Answer = {
      descripcion_respuesta: this.f.textoRespuesta1.value,
    }
    let answer2: Answer = {
      descripcion_respuesta: this.f.textoRespuesta2.value,
    }
    let answer3: Answer = {
      descripcion_respuesta: this.f.textoRespuesta3.value,
    }
    let answer4: Answer = {
      descripcion_respuesta: this.f.textoRespuesta4.value,
    }

    let answers = [answer, answer2, answer3, answer4];
    this.newValues.emit(answers);
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
        },
        error => {
          this.stepperService.showError = true;
          this.router.navigate(['/error']);
        }
      ) 
    } 

    let answers = {
      respuesta1: formValue.textoRespuesta1,
      respuesta2: formValue.textoRespuesta2,
      respuesta3: formValue.textoRespuesta3,
      respuesta4: formValue.textoRespuesta4
    }

    this.newValues.emit(answers);
  }

}
