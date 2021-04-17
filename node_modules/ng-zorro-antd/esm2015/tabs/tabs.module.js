/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabAddButtonComponent } from './tab-add-button.component';
import { NzTabBodyComponent } from './tab-body.component';
import { NzTabCloseButtonComponent } from './tab-close-button.component';
import { NzTabLinkDirective, NzTabLinkTemplateDirective } from './tab-link.directive';
import { NzTabNavBarComponent } from './tab-nav-bar.component';
import { NzTabNavItemDirective } from './tab-nav-item.directive';
import { NzTabNavOperationComponent } from './tab-nav-operation.component';
import { NzTabScrollListDirective } from './tab-scroll-list.directive';
import { NzTabComponent } from './tab.component';
import { NzTabDirective } from './tab.directive';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
import { NzTabSetComponent } from './tabset.component';
const DIRECTIVES = [
    NzTabSetComponent,
    NzTabComponent,
    NzTabNavBarComponent,
    NzTabNavItemDirective,
    NzTabsInkBarDirective,
    NzTabScrollListDirective,
    NzTabNavOperationComponent,
    NzTabAddButtonComponent,
    NzTabCloseButtonComponent,
    NzTabDirective,
    NzTabBodyComponent,
    NzTabLinkDirective,
    NzTabLinkTemplateDirective
];
export class NzTabsModule {
}
NzTabsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DIRECTIVES],
                exports: [DIRECTIVES],
                imports: [
                    BidiModule,
                    CommonModule,
                    ObserversModule,
                    NzIconModule,
                    NzOutletModule,
                    PlatformModule,
                    A11yModule,
                    CdkScrollableModule,
                    NzDropDownModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RhYnMvdGFicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RCxNQUFNLFVBQVUsR0FBRztJQUNqQixpQkFBaUI7SUFDakIsY0FBYztJQUNkLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIscUJBQXFCO0lBQ3JCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLHlCQUF5QjtJQUN6QixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQiwwQkFBMEI7Q0FDM0IsQ0FBQztBQWlCRixNQUFNLE9BQU8sWUFBWTs7O1lBZnhCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckIsT0FBTyxFQUFFO29CQUNQLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixlQUFlO29CQUNmLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxjQUFjO29CQUNkLFVBQVU7b0JBQ1YsbUJBQW1CO29CQUNuQixnQkFBZ0I7aUJBQ2pCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPYnNlcnZlcnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENka1Njcm9sbGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpEcm9wRG93bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZHJvcGRvd24nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuaW1wb3J0IHsgTnpUYWJBZGRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3RhYi1hZGQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYkJvZHlDb21wb25lbnQgfSBmcm9tICcuL3RhYi1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYkNsb3NlQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi90YWItY2xvc2UtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYkxpbmtEaXJlY3RpdmUsIE56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUYWJOYXZCYXJDb21wb25lbnQgfSBmcm9tICcuL3RhYi1uYXYtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYk5hdkl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYi1uYXYtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUYWJOYXZPcGVyYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3RhYi1uYXYtb3BlcmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYlNjcm9sbExpc3REaXJlY3RpdmUgfSBmcm9tICcuL3RhYi1zY3JvbGwtbGlzdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUYWJzSW5rQmFyRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJzLWluay1iYXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56VGFiU2V0Q29tcG9uZW50IH0gZnJvbSAnLi90YWJzZXQuY29tcG9uZW50JztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgTnpUYWJTZXRDb21wb25lbnQsXG4gIE56VGFiQ29tcG9uZW50LFxuICBOelRhYk5hdkJhckNvbXBvbmVudCxcbiAgTnpUYWJOYXZJdGVtRGlyZWN0aXZlLFxuICBOelRhYnNJbmtCYXJEaXJlY3RpdmUsXG4gIE56VGFiU2Nyb2xsTGlzdERpcmVjdGl2ZSxcbiAgTnpUYWJOYXZPcGVyYXRpb25Db21wb25lbnQsXG4gIE56VGFiQWRkQnV0dG9uQ29tcG9uZW50LFxuICBOelRhYkNsb3NlQnV0dG9uQ29tcG9uZW50LFxuICBOelRhYkRpcmVjdGl2ZSxcbiAgTnpUYWJCb2R5Q29tcG9uZW50LFxuICBOelRhYkxpbmtEaXJlY3RpdmUsXG4gIE56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVNdLFxuICBpbXBvcnRzOiBbXG4gICAgQmlkaU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT2JzZXJ2ZXJzTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek91dGxldE1vZHVsZSxcbiAgICBQbGF0Zm9ybU1vZHVsZSxcbiAgICBBMTF5TW9kdWxlLFxuICAgIENka1Njcm9sbGFibGVNb2R1bGUsXG4gICAgTnpEcm9wRG93bk1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56VGFic01vZHVsZSB7fVxuIl19