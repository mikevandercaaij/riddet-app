import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from './alert/alert.module';
import { ConfigModule } from './moduleconfig/config.module';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, AlertModule, ConfigModule],
  exports: [],
  declarations: [],
})
export class UtilUiModule {}
