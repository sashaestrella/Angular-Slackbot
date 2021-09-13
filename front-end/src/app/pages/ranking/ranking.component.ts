import { BackendService } from './../../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUsers, faCheck, faTimes, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { StepperService } from 'src/services/stepper.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  
  constructor(library: FaIconLibrary,private backendService: BackendService,private router: Router, private stepperService: StepperService) {
    library.addIcons(faUsers,faCheck,faTimes,faExclamation);
  }

  usersIcon = faUsers;
  checkIcon = faCheck;
  timesTcon = faTimes;
  exclamationIcon = faExclamation;

  ngOnInit() {
    this.getUsersData();
  }

  /* Bar chart */
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = ['Hoy'];
  barChartType: ChartType  = 'bar';
  barChartLegend = true;
  barChartData: any = [
    {data: [], label: 'Respuestas Correctas'},
    {data: [], label: 'Respuestas Incorrectas'}
  ];
  barChartColors: Color[] = [
    {backgroundColor:["#4BB543","#4BB543","#4BB543","#4BB543","#4BB543","#4BB543","#4BB543"]},
    {backgroundColor:["#F32013","#F32013","#F32013","#F32013","#F32013","#F32013","#F32013"]},
  ];

  /* Doughnut chart  */
  doughnutChartLabels = ['Respuestas correctas', 'Respuestas incorrectas', 'Respuestas sin contestar'];
  doughnutChartData: any = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Color[] = [
    {backgroundColor:["#4BB543","#F32013","#ffff00"]}
  ];

  usersData: any;
  usernames: any = [];
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  unansweredAnswers: number = 0;
  questionsLength: number = 0;

  getUsersData() {
    this.backendService.getUsersAnswers().subscribe(
      response => {
        this.usersData = response
        this.usersCount();
        this.usersAnswers();
        this.setData();
      },
      error => {
        console.log(error.error);
        this.stepperService.messageError = error.error;
        this.router.navigate(['/error']);
      }
    )
  }

  setData() {
    this.doughnutChartData.push(this.usersPorcentaje(this.correctAnswers))
    this.doughnutChartData.push(this.usersPorcentaje(this.incorrectAnswers))
    this.doughnutChartData.push(this.usersPorcentaje(this.unansweredAnswers))

    this.barChartData[0].data.push(this.usersPorcentaje(this.correctAnswers))
    this.barChartData[1].data.push(this.usersPorcentaje(this.incorrectAnswers))
  }

  usersPorcentaje(cantidad: number): string {
    return ((cantidad / 90) * 100).toFixed(2);
  }

  questionsPorcentaje(user: any): string {
    return ((this.userCorrectAnswer(user) / this.questionsLength) * 100).toFixed(2);
  }

  usersCount() {
    let users = this.usersData.map((u: any) => u.username);
    for(let i = users.length - 1; i >= 0; i--){
      if(users.indexOf(users[i]) !== i) {
        users.splice(i, 1);
      }
    }
    this.usernames = users;
  }

  usersAnswers() {
    this.correctAnswers = this.usersData.filter((u: any) => u.respuesta_es_correcta == 1).length;
    this.incorrectAnswers = this.usersData.filter((u: any) => u.respuesta_es_correcta == 0).length;
    this.unansweredAnswers = this.usersData.filter((u: any) => u.respuesta == 'null').length;
    this.getQuestionsLength();
  }

  getQuestionsLength() {
    this.backendService.getQuestions().subscribe(
      response => {
        this.questionsLength = response.length;
      },
      error => {
        console.log(error.error);
        this.stepperService.messageError = error.error;
        this.router.navigate(['/error']);
      }
    )
  }

  userCorrectAnswer(username: string) {
    let user = this.usersData.filter((u: any) => u.username == username); 
    let correctAnswers = user.map((u: any) => u.respuesta_es_correcta);

    return correctAnswers.filter((a: any) => a == 1).length;
  }
}
