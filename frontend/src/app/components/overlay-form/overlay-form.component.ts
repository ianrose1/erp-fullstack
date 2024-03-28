import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-overlay-form',
  templateUrl: './overlay-form.component.html',
  styleUrls: ['./overlay-form.component.css']
})
export class OverlayFormComponent implements OnInit{
  @Input() formConfig: any;
  // @Output() formData: any;
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.formConfig.forEach((control: any) => {
      group[control.name] = ['', Validators.required]; // Add more validators as needed
      if(control.type === 'dropdown') {
      }
    });
    this.dynamicForm = this.fb.group(group);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
    // Handle form submission, e.g., save the data
  }
}
