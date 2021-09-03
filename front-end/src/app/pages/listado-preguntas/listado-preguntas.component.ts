import { Answer } from './../../../models/answer.interface';
import { BackendService } from './../../../services/backend.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-listado-preguntas',
  templateUrl: './listado-preguntas.component.html',
  styleUrls: ['./listado-preguntas.component.css']
})
export class ListadoPreguntasComponent implements OnInit {
  @Input() newValues: any;
  values: any = [];
  displayedColumns: string[] = ['id_pregunta', 'texto_pregunta', 'respuesta_correcta', 'respuestas', 'editar', 'eliminar'];
  displayedColumns2: string[] = ['id_respuesta', 'id_pregunta', 'descripcion_respuesta', 'editarRespuesta'];
  questions: any = [];
  answers: any = [];
  questionAnswers: any = [];
  hayRespuestas: boolean = false;
  editar: boolean = false;
  editRespuesta: boolean = false;
  question: any;
  questionId: any;
  answersForEdit: any = [];

  constructor(private router: Router, private backendService: BackendService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.backendService.getQuestions().subscribe(
      response => {
        this.questions = response;
      },
      error => {
        console.log("Error: ", error);
      }
    )

    this.backendService.getAnswers().subscribe(
      response => {
        this.answers = response;
      },
      error => {
        console.log("Error: ", error);
      }
    )
  }

  openDialogForEdit(newValues: any): void {
    this.editar = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: `¿Desea editar la pregunta seleccionada?`
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editar = result;
      if(this.editar){
        this.editarEnLaBaseDeDatos(newValues);
      }
    });
  }

  openDialogForEditAnswers(newValues: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: `¿Desea editar las respuestas de la pregunta seleccionada?`
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editar = result;
      if(this.editar){
        this.editarRespuestaEnLaBaseDeDatos(newValues);
      }
    });
  }

  editarPregunta(id: any) {
    this.questionId = id;
    this.editar = true;
    this.hayRespuestas = false;
    this.editRespuesta = false;

    this.question = this.questions.find((q: any) => q.id_pregunta == id);
  }

  editarEnLaBaseDeDatos(newValues: any) {
    this.editar = false;
    this.hayRespuestas = false;
    this.editRespuesta = false;

    this.backendService.editQuestion(this.questionId, newValues).subscribe(
      response => {
        console.log("Se editó la pregunta");
      },
      error => {
        this.editar = false;
        console.log("Error: ", error);
      }
    ) 
    window.location.reload();
  }

  editarRespuestas(idPregunta: any) {
    this.questionId = idPregunta;
    this.editRespuesta = true;
  }

  editarRespuestaEnLaBaseDeDatos(newValuesForAnswer: any) {
    console.log(newValuesForAnswer);
    let ids = this.questionAnswers.map((a: any) => a.id_respuesta);
    let answersToEdit = {
      answers: newValuesForAnswer.answers,
      ids: ids,
      respuesta_correcta: newValuesForAnswer.question
    }

    this.editar = false;
    this.editRespuesta = false;
    this.hayRespuestas = false;

    this.backendService.editAnswers(this.questionId, answersToEdit).subscribe(
      response => {
        console.log("Se editó la pregunta con las nuevas respuestas");
      },
      error => {
        this.editar = false;
        console.log("Error: ", error);
      }
    ) 
    window.location.reload();
  }

  openDialogForDelete(id: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: `¿Desea eliminar la pregunta seleccionada?`
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editar = result;
      if(this.editar){
        this.eliminarPregunta(id);
      }
    });
  }

  eliminarPregunta(id: any) {
    this.backendService.deleteQuestion(id).subscribe(
      response => {
        console.log("Se eliminó la pregunta");
      },
      error => {
        console.log("Error: ", error);
      }
    )
    window.location.reload();
  }

  verRespuestas(id: any) {
    this.editRespuesta = false;
    this.hayRespuestas = true;
    this.editar = false;
    this.questionAnswers = this.answers.filter((ans: any) => ans.id_pregunta === id);
    this.question = this.questions.find((q: any) => q.id_pregunta == id);

    this.values = {
      answers: this.questionAnswers,
      correctAnswer: this.question.respuesta_correcta
    }
  }

  mostrarNuevasRespuestas(respuestas: any) {
    this.answers = respuestas;
    this.hayRespuestas = false;
    this.editar = false;
    this.editRespuesta = false;
  }
}
