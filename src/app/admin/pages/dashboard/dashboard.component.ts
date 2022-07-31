import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvalibalityService } from '../../services/availability/avalibality.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchForm!: FormGroup;
  isSpinning = false;
  candidates: any;
  interviewers: any;
  searchResults: any;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private avalibalityService: AvalibalityService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      candidateId: [null, [Validators.required]],
      interviewerIds: [null, [Validators.required]],
    });
    this.getAllCandidates();
    this.getAllInterviewers();
  }

  getAllCandidates() {
    this.userService.getAllCandidates().subscribe(res => {
      this.isSpinning = false;
      console.log(res);
      this.candidates = res;

    });
  }

  getAllInterviewers() {
    this.userService.getAllInterviewers().subscribe(res => {
      this.isSpinning = false;
      console.log(res);
      this.interviewers = res;

    });
  }

  getString(value: Number): String {
    return value.toString();
  }

  submitForm(): void {

    this.avalibalityService.checkAvalibality(this.searchForm.value).subscribe(res => {
      this.isSpinning = false;
      console.log(res);
      this.searchResults = res;
    });
  }

}
