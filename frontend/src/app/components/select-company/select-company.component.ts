import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent {
  @Output() formValueEmitter: EventEmitter<string> = new EventEmitter<string>();
  companies: string[] = ['FedEx', 'CookSystems', 'Google'];
  defaultCompany = 'Pick an option';
  configForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  // Creates form with companies
  private createForm() {
    this.configForm = this.fb.group({
      selectedCompany: ["", Validators.required]
    });
  }

  // Receives selected company and emits the value
  onSelect() {
    if (this.configForm.valid) {
      const formValue = this.configForm.value;
      this.formValueEmitter.emit(formValue);
      // go to announcements page
      this.router.navigateByUrl('')
    }
  }

}
