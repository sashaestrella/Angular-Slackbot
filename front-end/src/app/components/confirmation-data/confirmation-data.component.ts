import { StepperService } from 'src/services/stepper.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-data',
  templateUrl: './confirmation-data.component.html',
  styleUrls: ['./confirmation-data.component.css']
})
export class ConfirmationDataComponent implements OnInit {
  @Input() stepper: any;

  constructor(public stepperService: StepperService) { }

  ngOnInit(): void {
  }

}
