import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons'

// const icons = {
//   Alarm,
//   App,
//   Bookmark,
//   Calendar3,
// };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BootstrapIconsModule.pick(allIcons)
  ],
  exports: [
    BootstrapIconsModule
  ],
})
export class IconsModule { }
