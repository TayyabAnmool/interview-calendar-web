import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAvailabilitySlotComponent } from './pages/add-availability-slot/add-availability-slot.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'add-availability', component: AddAvailabilitySlotComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
