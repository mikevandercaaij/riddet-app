import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService } from './alert.service';

@Component({
  selector: 'riddet-app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
  alert!: Alert;
  staticAlertClosed = false;
  subs!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subs = this.alertService.alert$.subscribe((alert) => {
      this.alert = alert;
      this.staticAlertClosed = false;
      // auto close alertbox after some time
      setTimeout(() => (this.staticAlertClosed = true), 6000);
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}