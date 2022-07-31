import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Availability, AvalibalityService } from '../../services/availability/avalibality.service';
import { User, UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-add-availability-slot',
  templateUrl: './add-availability-slot.component.html',
  styleUrls: ['./add-availability-slot.component.scss']
})
export class AddAvailabilitySlotComponent implements OnInit {


  isSpinning = false;
  allUsers: any;

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private userService: UserService,
    private avalibalityService: AvalibalityService) { }

  validateForm!: FormGroup;


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userId: [null, [Validators.required]],
      hourFrom: [null, [Validators.required, Validators.min(1), Validators.max(23)]],
      hourTo: [null, [Validators.required, Validators.min(2), Validators.max(24)]],
      date: [null, [Validators.required]],

    });
    this.getAllUsers();
  }

  getString(value: Number): String {
    return value.toString();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.isSpinning = false;
      console.log(res);
      this.allUsers = res;

    });
  }


  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      console.log("In function");
      this.isSpinning = true;
      let avalibalityData: Availability = this.validateForm.value;
      if (avalibalityData.hourFrom < avalibalityData.hourTo) {
        this.avalibalityService.addOrUpdatedAvalibality(avalibalityData).subscribe(res => {
          this.isSpinning = false;
          console.log(res);
          if (res != null && res.id != null) {
            this.notification
              .success(
                'SUCCESS',
                `Avalibality Added Successfully!!!`,
                { nzDuration: 5000 }
              );
            this.router.navigateByUrl('/admin/dashboard');
          }

        });
      } else {
        this.notification
          .error(
            'ERROR',
            `From should be less then To!!!`,
            { nzDuration: 5000 }
          );
        this.isSpinning = false;
      }
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
}