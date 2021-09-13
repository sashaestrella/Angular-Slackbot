/* Components */
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { AnswerFormComponent } from './components/answer-form/answer-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { ConfirmationDataComponent } from './components/confirmation-data/confirmation-data.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListadoPreguntasComponent } from './pages/listado-preguntas/listado-preguntas.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RankingComponent } from './pages/ranking/ranking.component';


/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionFormComponent,
    AnswerFormComponent,
    ConfirmationDataComponent,
    FooterComponent,
    ErrorComponent,
    NavbarComponent,
    ListadoPreguntasComponent,
    DialogComponent,
    AnimatedBackgroundComponent,
    LoadingComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ChartsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
