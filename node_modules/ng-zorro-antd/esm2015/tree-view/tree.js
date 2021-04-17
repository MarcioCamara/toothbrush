/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { CdkTree } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, Host, Input, IterableDiffers, Optional } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { Subject } from 'rxjs';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { takeUntil } from 'rxjs/operators';
// tslint:disable-next-line: component-class-suffix
export class NzTreeView extends CdkTree {
    constructor(differs, changeDetectorRef, noAnimation, directionality) {
        super(differs, changeDetectorRef);
        this.differs = differs;
        this.changeDetectorRef = changeDetectorRef;
        this.noAnimation = noAnimation;
        this.directionality = directionality;
        this.destroy$ = new Subject();
        this.dir = 'ltr';
        this._dataSourceChanged = new Subject();
        this.nzDirectoryTree = false;
        this.nzBlockNode = false;
    }
    get dataSource() {
        return super.dataSource;
    }
    set dataSource(dataSource) {
        super.dataSource = dataSource;
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        if (this.directionality) {
            this.dir = this.directionality.value;
            (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.changeDetectorRef.detectChanges();
            });
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
    renderNodeChanges(data, dataDiffer, viewContainer, parentData) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
        this._dataSourceChanged.next();
    }
}
NzTreeView.decorators = [
    { type: Component, args: [{ template: '' },] }
];
NzTreeView.ctorParameters = () => [
    { type: IterableDiffers },
    { type: ChangeDetectorRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzTreeView.propDecorators = {
    treeControl: [{ type: Input, args: ['nzTreeControl',] }],
    dataSource: [{ type: Input, args: ['nzDataSource',] }],
    nzDirectoryTree: [{ type: Input }],
    nzBlockNode: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeView.prototype, "nzDirectoryTree", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeView.prototype, "nzBlockNode", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsT0FBTyxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsSUFBSSxFQUNKLEtBQUssRUFFTCxlQUFlLEVBR2YsUUFBUSxFQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXpFLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxtREFBbUQ7QUFDbkQsTUFBTSxPQUFPLFVBQWMsU0FBUSxPQUFVO0lBa0IzQyxZQUNZLE9BQXdCLEVBQ3hCLGlCQUFvQyxFQUNuQixXQUFvQyxFQUMzQyxjQUErQjtRQUVuRCxLQUFLLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFMeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDM0MsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBbEI3QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBQ3ZCLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFTaEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFTN0MsQ0FBQztJQWpCRCxJQUNJLFVBQVU7UUFDWixPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLFVBQWlEO1FBQzlELEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFhRCxRQUFROztRQUNOLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztZQUNyQyxNQUFBLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7Z0JBQzVGLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO2dCQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDekMsQ0FBQyxFQUFFO1NBQ0o7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQTRCLEVBQUUsVUFBOEIsRUFBRSxhQUFnQyxFQUFFLFVBQWM7UUFDOUgsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7WUFsREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTs7O1lBZHpCLGVBQWU7WUFMZixpQkFBaUI7WUFXVixzQkFBc0IsdUJBK0IxQixJQUFJLFlBQUksUUFBUTtZQTlDRCxjQUFjLHVCQStDN0IsUUFBUTs7OzBCQWZWLEtBQUssU0FBQyxlQUFlO3lCQUNyQixLQUFLLFNBQUMsY0FBYzs4QkFPcEIsS0FBSzswQkFDTCxLQUFLOztBQURtQjtJQUFmLFlBQVksRUFBRTs7bURBQXlCO0FBQ3hCO0lBQWYsWUFBWSxFQUFFOzsrQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBDZGtUcmVlLCBUcmVlQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEhvc3QsXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHsgdGVtcGxhdGU6ICcnIH0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBOelRyZWVWaWV3PFQ+IGV4dGVuZHMgQ2RrVHJlZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlyZWN0b3J5VHJlZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCbG9ja05vZGU6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgX2RhdGFTb3VyY2VDaGFuZ2VkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgQElucHV0KCduelRyZWVDb250cm9sJykgdHJlZUNvbnRyb2whOiBUcmVlQ29udHJvbDxULCBOelNhZmVBbnk+O1xuICBASW5wdXQoJ256RGF0YVNvdXJjZScpXG4gIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10ge1xuICAgIHJldHVybiBzdXBlci5kYXRhU291cmNlO1xuICB9XG4gIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10pIHtcbiAgICBzdXBlci5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgfVxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXJlY3RvcnlUcmVlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekJsb2NrTm9kZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASG9zdCgpIEBPcHRpb25hbCgpIHB1YmxpYyBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eT86IERpcmVjdGlvbmFsaXR5XG4gICkge1xuICAgIHN1cGVyKGRpZmZlcnMsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICBpZiAodGhpcy5kaXJlY3Rpb25hbGl0eSkge1xuICAgICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcmVuZGVyTm9kZUNoYW5nZXMoZGF0YTogVFtdIHwgUmVhZG9ubHlBcnJheTxUPiwgZGF0YURpZmZlcj86IEl0ZXJhYmxlRGlmZmVyPFQ+LCB2aWV3Q29udGFpbmVyPzogVmlld0NvbnRhaW5lclJlZiwgcGFyZW50RGF0YT86IFQpOiB2b2lkIHtcbiAgICBzdXBlci5yZW5kZXJOb2RlQ2hhbmdlcyhkYXRhLCBkYXRhRGlmZmVyLCB2aWV3Q29udGFpbmVyLCBwYXJlbnREYXRhKTtcbiAgICB0aGlzLl9kYXRhU291cmNlQ2hhbmdlZC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==