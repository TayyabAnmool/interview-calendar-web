import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User, UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  isSpinning = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private userService: UserService) { }

  validateForm!: FormGroup;


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      userRole: [null, [Validators.required]],

    });
  }


  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      console.log("In function");
      this.isSpinning = true;
      let userData: User = this.validateForm.value;

      this.userService.addUser(userData).subscribe(res => {
        this.isSpinning = false;
        console.log(res);
        if (res != null && res.id != null) {
          this.notification
            .success(
              'SUCCESS',
              `User Added Successfully!!!`,
              { nzDuration: 5000 }
            );
          this.router.navigateByUrl('/admin/dashboard');
        }

      });
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
