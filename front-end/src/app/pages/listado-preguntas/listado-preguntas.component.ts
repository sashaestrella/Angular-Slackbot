import { Answer } from './../../../models/answer.interface';
import { BackendService } from './../../../services/backend.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

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
  displayedColumns: string[] = ['id_pregunta', 'texto_pregunta', 'respuesta_correcta', 'respuestas', 'editar', 'eliminar'];
  displayedColumns2: string[] = ['id_respuesta', 'id_pregunta', 'descripcion_respuesta', 'editarRespuesta'];
  dataSource: any = [];
  answers: any = [];
  hayRespuestas: boolean = false;
  editar: boolean = false;
  editRespuesta: boolean = false;
  question: any;
  questionId: any;
  answersForEdit: any = [];

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getQuestions().subscribe(
      response => {
        this.dataSource = response;
      },
      error => {
        console.log("Error: ", error);
      }
    )
  }

  editarPregunta(id: any) {
    this.editRespuesta = false;
    this.questionId = id;
    this.editar = true;
    this.hayRespuestas = false;
    this.question = this.dataSource.find((q: any) => q.id_pregunta == id);
  }

  editarEnLaBaseDeDatos(newValues: any) {
    this.editar = false;
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
    let ids = this.answers.map((a: any) => a.id_respuesta);
    let answersToEdit = {
      answers: newValuesForAnswer,
      ids: ids
    }
    
    this.editRespuesta = false;
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
    this.backendService.getAnswersForQuestion(id).subscribe(
      response => {
        this.answers = response;
      },
      error => {
        this.hayRespuestas = false;
        console.log("Error: ", error);
      }
    )
  }

  mostrarNuevasRespuestas(respuestas: any) {
    this.answers = respuestas;
    this.hayRespuestas = false;
  }
}
