import { BackendService } from './../../../services/backend.service';
import { Answer } from './../../../models/answer.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepperService } from 'src/services/stepper.service';
import { Router } from '@angular/router';

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
  answers = [
    'a', 'b', 'c', 'd'
  ]

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      textoRespuesta1: new FormControl('', Validators.required),
      textoRespuesta2: new FormControl('', Validators.required),
      textoRespuesta3: new FormControl('', Validators.required),
      textoRespuesta4: new FormControl('', Validators.required),
      respuestaPregunta: new FormControl('', Validators.required)
    })

    if(this.values !== undefined && this.agregar == false) {  
      this.answerForm.patchValue({
        textoRespuesta1: this.values.answers[0].descripcion_respuesta,
        textoRespuesta2: this.values.answers[1].descripcion_respuesta,
        textoRespuesta3: this.values.answers[2].descripcion_respuesta,
        textoRespuesta4: this.values.answers[3].descripcion_respuesta,
        respuestaPregunta: this.values.correctAnswer
      })
    }

    var input = document.getElementById('inputAnswer1')
    var input2 = document.getElementById('inputAnswer2')
    var input3 = document.getElementById('inputAnswer3')
    var input4 = document.getElementById('inputAnswer4')
    if(input && input2 && input3 && input4 ){
      input.style.fontSize = '100%'
      input2.style.fontSize = '100%'
      input3.style.fontSize = '100%'
      input4.style.fontSize = '100%'
    } else if (input) {
      input.style.fontSize = '100%'
    } else if (input2) {
      input2.style.fontSize = '100%'
    } else if (input3) {
      input3.style.fontSize = '100%'
    } else if (input4) {
      input4.style.fontSize = '100%'
    }
  }

  public get f() {
    return this.answerForm.controls;
  }

  editarEnLaBaseDeDatos() {
    let answer1: Answer = {
      descripcion_respuesta: this.f.textoRespuesta1.value
    }
    let answer2: Answer = {
      descripcion_respuesta: this.f.textoRespuesta2.value
    }
    let answer3: Answer = {
      descripcion_respuesta: this.f.textoRespuesta3.value
    }
    let answer4: Answer = {
      descripcion_respuesta: this.f.textoRespuesta4.value
    }

    let valuesForEmit: any = {
      question: this.f.respuestaPregunta.value,
      answers: [answer1, answer2, answer3, answer4]
    }

    this.newValues.emit(valuesForEmit);
  }

  addAnswerToDatabase(formValue: any) {
    this.stepperService.answersForm = formValue;
    this.stepperService.questionForm.respuesta_correcta = formValue.respuestaPregunta;

    let answer1: any = {
      numero_de_pregunta: 1,
      descripcion_respuesta: formValue.textoRespuesta1
    }
    let answer2: any = {
      numero_de_pregunta: 2,
      descripcion_respuesta: formValue.textoRespuesta2
    }
    let answer3: any = {
      numero_de_pregunta: 3,
      descripcion_respuesta: formValue.textoRespuesta3
    }
    let answer4: any = {
      numero_de_pregunta: 4,
      descripcion_respuesta: formValue.textoRespuesta4
    }

    let answers = [answer1, answer2, answer3, answer4];
    let questionPost: any = {
      question: this.stepperService.questionForm,
      answers: answers
    }

    this.backendService.postQuestionAndAnswers(questionPost).subscribe(
      response => {
        console.log("se insertó la pregunta con las respuestas");
        this.newValues.emit(response);
      },
      error => {
        this.router.navigate(['/error']);
      }
    )
  }

  cambio(element: string, textoPregunta: any){ 
    const input = document.getElementById(element);
    if (input != null) {
      if(textoPregunta.length > 0) {
        input.style.borderColor = "rgb(115, 34, 150)"
        input.style.backgroundColor = "rgb(205, 177, 214)"
      } else {
        input.style.backgroundColor = "white"
      }
    } 
  }
}
