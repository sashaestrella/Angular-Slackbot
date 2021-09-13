import { StepperService } from 'src/services/stepper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  message: string = '';

  constructor(public stepperService: StepperService) { }

  ngOnInit(): void {
    this.message = this.stepperService.messageError;
  }
}
