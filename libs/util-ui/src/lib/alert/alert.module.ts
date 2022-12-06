import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AlertComponent } from './alert.component'
import { AlertService } from './alert.service'

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, 
    RouterModule, 
    NgbModule, 
  ],
  providers: [AlertService],
  exports: [AlertComponent]
})
export class AlertModule {}