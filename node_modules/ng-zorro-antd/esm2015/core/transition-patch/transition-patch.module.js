/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { NzTransitionPatchDirective } from './transition-patch.directive';
export class NzTransitionPatchModule {
}
NzTransitionPatchModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                exports: [NzTransitionPatchDirective],
                declarations: [NzTransitionPatchDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi1wYXRjaC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvdHJhbnNpdGlvbi1wYXRjaC90cmFuc2l0aW9uLXBhdGNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQU8xRSxNQUFNLE9BQU8sdUJBQXVCOzs7WUFMbkMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDekIsT0FBTyxFQUFFLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3JDLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO2FBQzNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56VHJhbnNpdGlvblBhdGNoRGlyZWN0aXZlIH0gZnJvbSAnLi90cmFuc2l0aW9uLXBhdGNoLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtOelRyYW5zaXRpb25QYXRjaERpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW056VHJhbnNpdGlvblBhdGNoRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBOelRyYW5zaXRpb25QYXRjaE1vZHVsZSB7fVxuIl19