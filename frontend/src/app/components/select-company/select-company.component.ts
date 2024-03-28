import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';
import Company from 'src/app/interfaces/company';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit, OnDestroy {
  @Output() formValueEmitter: EventEmitter<string> = new EventEmitter<string>();
  // companies: string[] = ['FedEx', 'CookSystems', 'Google'];
  companies$: Observable<Company[]> = this.userService.companyListObservable();
  companies: Company[] = [];
  defaultCompany = 'Pick an option';
  configForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private navService: NavbarService, private userService: UserService) {
  }


  ngOnInit(): void {
    this.userService.companyListObservable().subscribe((list) => {
      this.companies = list;
    })
    this.createForm();
    this.navService.hide();
  }

  ngOnDestroy(): void {
    this.navService.show();
  }

  // Creates form with companies
  private createForm() {
    this.configForm = this.fb.group({
      selectedCompany: ["", Validators.required]
    });
  }

  // Receives selected company and emits the value
  onSelect() {
    console.log("Form Value: ", this.configForm.value.selectedCompany)
    this.userService.updateCurrentCompanyId(this.configForm.value.selectedCompany);
    this.router.navigate(['']);
    // if (this.configForm.valid) {
    //   const formValue = this.configForm.value;
    //   this.formValueEmitter.emit(formValue);
    //   // go to announcements page
    //   this.router.navigateByUrl('')
    // }
  }

}
