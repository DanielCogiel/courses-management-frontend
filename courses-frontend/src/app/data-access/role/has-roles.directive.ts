import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoleService } from "./role.service";

@Directive({
  selector: '[hasRoles]',
  standalone: true
})
export class HasRolesDirective {
  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _roleService: RoleService
  ) {}
  @Input() set hasRoles(roles: string[] | string) {
    let shouldCreateView = false;

    if (typeof roles === 'string') {
      shouldCreateView = roles === this._roleService.getRole();
    } else {
      shouldCreateView = roles.includes(this._roleService.getRole() as string);
    }

    if (shouldCreateView)
      this._viewContainer.createEmbeddedView(this._templateRef);
    else
      this._viewContainer.clear();
  }
}
