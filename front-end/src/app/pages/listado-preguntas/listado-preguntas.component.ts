import { Router } from '@angular/router';
import { BackendService } from './../../../services/backend.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { StepperService } from 'src/services/stepper.service';

@Component({
  selector: 'app-listado-preguntas',
  templateUrl: './listado-preguntas.component.html',
  styleUrls: ['./listado-preguntas.component.css']
})
export class ListadoPreguntasComponent implements OnInit {
  @Input() newValues: any;

  values: any = [];
  displayedColumns: string[] = ['id_pregunta', 'texto_pregunta', 'respuesta_correcta', 'respuestas', 'eliminar'];
  questions: any = [];
  answers: any = [];
  questionAnswers: any = [];
  hayRespuestas: boolean = false;
  editar: boolean = false;
  question: any;
  questionId: any;
  loadingVisible: boolean = false;

  constructor(private backendService: BackendService, public dialog: MatDialog, private router: Router, private stepperService: StepperService) { }

  ngOnInit(): void {
    this.getQuestionsAndAnswers();
  }

  getQuestionsAndAnswers() {
    this.loadingVisible = true;
    this.backendService.getQuestions().subscribe(
      response => {
        this.questions = response;
      },
      error => {
        this.loadingVisible = false;
        this.stepperService.messageError = error.error;
        this.router.navigate(['/error']);
      }
    )

    this.backendService.getAnswers().subscribe(
      response => {
        this.loadingVisible = false;
        this.answers = response;
      },
      error => {
        this.loadingVisible = false;
        this.stepperService.messageError = error.error;
        this.router.navigate(['/error']);
      }
    )
  }

  openDialogForEdit(newValues: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: `¿Desea editar la pregunta seleccionada?`
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editar = result;
      if(this.editar){
        this.editarPreguntaEnLaBaseDeDatos(newValues);
        this.editarPregunta(newValues);
      }
    });
  }

  editarPregunta(newValues: any) {
    let quest = this.questions.find((q: any) => q.id_pregunta == this.question.id_pregunta);
    quest.descripcion_pregunta = newValues.descripcion_pregunta;
  }
  
  editarPreguntaEnLaBaseDeDatos(newValues: any) {
    this.editar = false;
    this.hayRespuestas = false;

    this.backendService.editQuestion(this.questionId, newValues).subscribe(
      response => {
        console.log("Se editó la pregunta");
      },
      error => {
        this.editar = false;
        this.stepperService.messageError = error.error;
        this.router.navigate(['/error']);
      }
    ) 
  }

  openDialogForEditAnswers(newValues: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: `¿Desea editar las respuestas de la pregunta seleccionada?`
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editar = result;
      if(this.editar){
        this.editarRespuestaEnLaBaseDeDatos(newValues);
        this.editarRespuestas(this.question.id_pregunta,newValues);
      }
    });
  }

  editarRespuestas(idPregunta: any, newValues: any) {
    this.questionId = idPregunta;
    let quest = this.questions.find((q: any) => q.id_pregunta == this.questionId);
    let answersQuest = this.answers.filter((a: any) => a.id_pregunta == this.questionId);

    answersQuest[0].descripcion_respuesta = newValues.answers[0].descripcion_respuesta;
    answersQuest[1].descripcion_respuesta = newValues.answers[1].descripcion_respuesta;
    answersQuest[2].descripcion_respuesta = newValues.answers[2].descripcion_respuesta;
    answersQuest[3].descripcion_respuesta = newValues.answers[3].descripcion_respuesta;
    quest.respuesta_correcta = newValues.question;
  }

  editarRespuestaEnLaBaseDeDatos(newValuesForAnswer: any) {
    let ids = this.questionAnswers.map((a: any) => a.id_respuesta);

    let answersToEdit = {
      answers: newValuesForAnswer.answers,
      ids: ids,
      respuesta_correcta: newValuesForAnswer.question
    }

    this.editar = false;
    this.hayRespuestas = false;

    this.backendService.editAnswers(this.questionId, answersToEdit).subscribe(
      response => {
        console.log("Se editó la pregunta con las nuevas respuestas");
      },
      error => {
        this.editar = false;
        this.stepperService.messageError = error.error;
        this.router.navigate(['/error']);
      }
    ) 
  }

  openDialogForDelete(id: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: `¿Desea eliminar la pregunta seleccionada?`
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editar = result;
      if(this.editar){ 
        this.eliminarPreguntaEnLaBaseDeDatos(id);
        this.questions = this.questions.filter((q: any) => q.id_pregunta != id);
      }
    });
  }

  eliminarPreguntaEnLaBaseDeDatos(id: any) {
    this.editar = false;
    this.hayRespuestas = false;
    
    this.backendService.deleteQuestion(id).subscribe(
      response => {
        console.log("Se eliminó la pregunta");
      },
      error => {
        this.stepperService.messageError = error.error;
        this.router.navigate(['/error']);
      }
    )
  }

  verRespuestas(id: any) {
    this.hayRespuestas = this.hayRespuestas ? false : true;
    this.question = this.questions.find((q: any) => q.id_pregunta == id);
    this.questionAnswers = this.answers.filter((a: any) => a.id_pregunta == this.question.id_pregunta);

    this.values = {
      answers: this.questionAnswers,
      correctAnswer: this.question.respuesta_correcta
    }
    
    this.questionId = id;
  }
}
