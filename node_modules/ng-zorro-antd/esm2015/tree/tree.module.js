/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeDropIndicatorComponent } from './tree-drop-indicator.component';
import { NzTreeIndentComponent } from './tree-indent.component';
import { NzTreeNodeBuiltinCheckboxComponent } from './tree-node-checkbox.component';
import { NzTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { NzTreeNodeTitleComponent } from './tree-node-title.component';
import { NzTreeNodeBuiltinComponent } from './tree-node.component';
import { NzTreeComponent } from './tree.component';
export class NzTreeModule {
}
NzTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule, NzNoAnimationModule, NzHighlightModule, ScrollingModule],
                declarations: [
                    NzTreeComponent,
                    NzTreeNodeBuiltinComponent,
                    NzTreeIndentComponent,
                    NzTreeNodeSwitcherComponent,
                    NzTreeNodeBuiltinCheckboxComponent,
                    NzTreeNodeTitleComponent,
                    NzTreeDropIndicatorComponent
                ],
                exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWVuRCxNQUFNLE9BQU8sWUFBWTs7O1lBYnhCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO2dCQUMxSCxZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZiwwQkFBMEI7b0JBQzFCLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUMzQixrQ0FBa0M7b0JBQ2xDLHdCQUF3QjtvQkFDeEIsNEJBQTRCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsMEJBQTBCLEVBQUUscUJBQXFCLENBQUM7YUFDOUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56SGlnaGxpZ2h0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2hpZ2hsaWdodCc7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuaW1wb3J0IHsgTnpUcmVlRHJvcEluZGljYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1kcm9wLWluZGljYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUcmVlSW5kZW50Q29tcG9uZW50IH0gZnJvbSAnLi90cmVlLWluZGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZUJ1aWx0aW5DaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1ub2RlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRyZWVOb2RlU3dpdGNoZXJDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtbm9kZS1zd2l0Y2hlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLW5vZGUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJlZU5vZGVCdWlsdGluQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLW5vZGUuY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJlZUNvbXBvbmVudCB9IGZyb20gJy4vdHJlZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOek91dGxldE1vZHVsZSwgTnpJY29uTW9kdWxlLCBOek5vQW5pbWF0aW9uTW9kdWxlLCBOekhpZ2hsaWdodE1vZHVsZSwgU2Nyb2xsaW5nTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpUcmVlQ29tcG9uZW50LFxuICAgIE56VHJlZU5vZGVCdWlsdGluQ29tcG9uZW50LFxuICAgIE56VHJlZUluZGVudENvbXBvbmVudCxcbiAgICBOelRyZWVOb2RlU3dpdGNoZXJDb21wb25lbnQsXG4gICAgTnpUcmVlTm9kZUJ1aWx0aW5DaGVja2JveENvbXBvbmVudCxcbiAgICBOelRyZWVOb2RlVGl0bGVDb21wb25lbnQsXG4gICAgTnpUcmVlRHJvcEluZGljYXRvckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbTnpUcmVlQ29tcG9uZW50LCBOelRyZWVOb2RlQnVpbHRpbkNvbXBvbmVudCwgTnpUcmVlSW5kZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVNb2R1bGUge31cbiJdfQ==