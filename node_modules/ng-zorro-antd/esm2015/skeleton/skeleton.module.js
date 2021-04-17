/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSkeletonElementAvatarComponent, NzSkeletonElementButtonComponent, NzSkeletonElementDirective, NzSkeletonElementImageComponent, NzSkeletonElementInputComponent } from './skeleton-element.component';
import { NzSkeletonComponent } from './skeleton.component';
export class NzSkeletonModule {
}
NzSkeletonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzSkeletonComponent,
                    NzSkeletonElementDirective,
                    NzSkeletonElementButtonComponent,
                    NzSkeletonElementAvatarComponent,
                    NzSkeletonElementImageComponent,
                    NzSkeletonElementInputComponent
                ],
                imports: [BidiModule, CommonModule],
                exports: [
                    NzSkeletonComponent,
                    NzSkeletonElementDirective,
                    NzSkeletonElementButtonComponent,
                    NzSkeletonElementAvatarComponent,
                    NzSkeletonElementImageComponent,
                    NzSkeletonElementInputComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9za2VsZXRvbi9za2VsZXRvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxnQ0FBZ0MsRUFDaEMsZ0NBQWdDLEVBQ2hDLDBCQUEwQixFQUMxQiwrQkFBK0IsRUFDL0IsK0JBQStCLEVBQ2hDLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFxQjNELE1BQU0sT0FBTyxnQkFBZ0I7OztZQW5CNUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixtQkFBbUI7b0JBQ25CLDBCQUEwQjtvQkFDMUIsZ0NBQWdDO29CQUNoQyxnQ0FBZ0M7b0JBQ2hDLCtCQUErQjtvQkFDL0IsK0JBQStCO2lCQUNoQztnQkFDRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO2dCQUNuQyxPQUFPLEVBQUU7b0JBQ1AsbUJBQW1CO29CQUNuQiwwQkFBMEI7b0JBQzFCLGdDQUFnQztvQkFDaEMsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLCtCQUErQjtpQkFDaEM7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE56U2tlbGV0b25FbGVtZW50QXZhdGFyQ29tcG9uZW50LFxuICBOelNrZWxldG9uRWxlbWVudEJ1dHRvbkNvbXBvbmVudCxcbiAgTnpTa2VsZXRvbkVsZW1lbnREaXJlY3RpdmUsXG4gIE56U2tlbGV0b25FbGVtZW50SW1hZ2VDb21wb25lbnQsXG4gIE56U2tlbGV0b25FbGVtZW50SW5wdXRDb21wb25lbnRcbn0gZnJvbSAnLi9za2VsZXRvbi1lbGVtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNrZWxldG9uQ29tcG9uZW50IH0gZnJvbSAnLi9za2VsZXRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOelNrZWxldG9uQ29tcG9uZW50LFxuICAgIE56U2tlbGV0b25FbGVtZW50RGlyZWN0aXZlLFxuICAgIE56U2tlbGV0b25FbGVtZW50QnV0dG9uQ29tcG9uZW50LFxuICAgIE56U2tlbGV0b25FbGVtZW50QXZhdGFyQ29tcG9uZW50LFxuICAgIE56U2tlbGV0b25FbGVtZW50SW1hZ2VDb21wb25lbnQsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnRJbnB1dENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE56U2tlbGV0b25Db21wb25lbnQsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnREaXJlY3RpdmUsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnRCdXR0b25Db21wb25lbnQsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnRBdmF0YXJDb21wb25lbnQsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnRJbWFnZUNvbXBvbmVudCxcbiAgICBOelNrZWxldG9uRWxlbWVudElucHV0Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpTa2VsZXRvbk1vZHVsZSB7fVxuIl19