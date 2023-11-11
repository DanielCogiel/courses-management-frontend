import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Role, { roles } from "../../data-access/role/role.enum";

@Component({
  selector: 'app-role-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-badge.component.html',
  styleUrls: ['./role-badge.component.scss']
})
export class RoleBadgeComponent {
  @Input() role?: Role;
  readonly roles = roles;
  get roleLabel() {
    return this.roles.find(role => role.role === this.role)?.name;
  }
  get badgeClass() {
    switch(this.role) {
      case Role.REGULAR:
        return 'green';
      case Role.CREATOR:
        return 'blue';
      case Role.ADMIN:
        return 'gold';
      default:
        return undefined
    }
  }
}
