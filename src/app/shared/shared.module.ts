import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent],
})
export class SharedModule {}
