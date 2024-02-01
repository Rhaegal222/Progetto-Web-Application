import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  userList: any[] = [
    ["Cazzo", "Culo", "Tette", ],
    ["asad", "asdas", "sadas"],
    ["Cane", "asff","sadsa"]
  ]

}
