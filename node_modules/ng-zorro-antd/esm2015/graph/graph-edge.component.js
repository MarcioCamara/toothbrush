/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, TemplateRef } from '@angular/core';
import { curveBasis, line } from 'd3-shape';
import { take } from 'rxjs/operators';
export class NzGraphEdgeComponent {
    constructor(elementRef, ngZone, cdr) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.line = line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveBasis);
        this.el = this.elementRef.nativeElement;
    }
    get id() {
        var _a;
        return ((_a = this.edge) === null || _a === void 0 ? void 0 : _a.id) || `${this.edge.v}--${this.edge.w}`;
    }
    ngOnInit() {
        this.initElementStyle();
    }
    ngOnChanges(changes) {
        const { edge, customTemplate } = changes;
        if (edge) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                // Update path element if customTemplate set
                if (customTemplate) {
                    this.initElementStyle();
                }
                this.setLine();
                this.cdr.markForCheck();
            });
        }
    }
    initElementStyle() {
        this.path = this.el.querySelector('path');
        this.setElementData();
    }
    setLine() {
        this.setPath(this.line(this.edge.points));
    }
    setPath(d) {
        this.path.setAttribute('d', d);
    }
    setElementData() {
        if (!this.path) {
            return;
        }
        this.path.setAttribute('id', this.id);
        this.path.setAttribute('data-edge', this.id);
        this.path.setAttribute('data-v', `${this.edge.v}`);
        this.path.setAttribute('data-w', `${this.edge.w}`);
    }
}
NzGraphEdgeComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-graph-edge]',
                template: `
    <ng-container *ngIf="customTemplate" [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: edge }"></ng-container>
    <svg:g *ngIf="!customTemplate">
      <path class="nz-graph-edge-line" [attr.marker-end]="'url(#edge-end-arrow)'"></path>
      <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="10" *ngIf="edge.label">
        <textPath [attr.href]="'#' + id" startOffset="50%">{{ edge.label }}</textPath>
      </svg:text>
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzGraphEdgeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
NzGraphEdgeComponent.propDecorators = {
    edge: [{ type: Input }],
    customTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtZWRnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2dyYXBoLWVkZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFJTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBZ0J0QyxNQUFNLE9BQU8sb0JBQW9CO0lBaUIvQixZQUFvQixVQUFtQyxFQUFVLE1BQWMsRUFBVSxHQUFzQjtRQUEzRixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUw5RixTQUFJLEdBQUcsSUFBSSxFQUE0QjthQUNyRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNYLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUduQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7SUFiRCxJQUFXLEVBQUU7O1FBQ1gsT0FBTyxPQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLEVBQUUsS0FBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQWFELFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3pDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hELDRDQUE0QztnQkFDNUMsSUFBSSxjQUFjLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUN6QjtnQkFFRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsT0FBTyxDQUFDLENBQVM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7OztZQTFFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7OztHQVFUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUF4QkMsVUFBVTtZQUVWLE1BQU07WUFKTixpQkFBaUI7OzttQkE0QmhCLEtBQUs7NkJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjdXJ2ZUJhc2lzLCBsaW5lIH0gZnJvbSAnZDMtc2hhcGUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56R3JhcGhFZGdlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotZ3JhcGgtZWRnZV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21UZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBlZGdlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8c3ZnOmcgKm5nSWY9XCIhY3VzdG9tVGVtcGxhdGVcIj5cbiAgICAgIDxwYXRoIGNsYXNzPVwibnotZ3JhcGgtZWRnZS1saW5lXCIgW2F0dHIubWFya2VyLWVuZF09XCIndXJsKCNlZGdlLWVuZC1hcnJvdyknXCI+PC9wYXRoPlxuICAgICAgPHN2Zzp0ZXh0IGNsYXNzPVwibnotZ3JhcGgtZWRnZS10ZXh0XCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBkeT1cIjEwXCIgKm5nSWY9XCJlZGdlLmxhYmVsXCI+XG4gICAgICAgIDx0ZXh0UGF0aCBbYXR0ci5ocmVmXT1cIicjJyArIGlkXCIgc3RhcnRPZmZzZXQ9XCI1MCVcIj57eyBlZGdlLmxhYmVsIH19PC90ZXh0UGF0aD5cbiAgICAgIDwvc3ZnOnRleHQ+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpHcmFwaEVkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGVkZ2UhOiBOekdyYXBoRWRnZTtcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7XG4gICAgJGltcGxpY2l0OiBOekdyYXBoRWRnZTtcbiAgfT47XG5cbiAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVkZ2U/LmlkIHx8IGAke3RoaXMuZWRnZS52fS0tJHt0aGlzLmVkZ2Uud31gO1xuICB9XG4gIHByaXZhdGUgZWwhOiBTVkdHRWxlbWVudDtcbiAgcHJpdmF0ZSBwYXRoITogU1ZHUGF0aEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBsaW5lID0gbGluZTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+KClcbiAgICAueChkID0+IGQueClcbiAgICAueShkID0+IGQueSlcbiAgICAuY3VydmUoY3VydmVCYXNpcyk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPFNWR0dFbGVtZW50PiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0RWxlbWVudFN0eWxlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBlZGdlLCBjdXN0b21UZW1wbGF0ZSB9ID0gY2hhbmdlcztcbiAgICBpZiAoZWRnZSkge1xuICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBVcGRhdGUgcGF0aCBlbGVtZW50IGlmIGN1c3RvbVRlbXBsYXRlIHNldFxuICAgICAgICBpZiAoY3VzdG9tVGVtcGxhdGUpIHtcbiAgICAgICAgICB0aGlzLmluaXRFbGVtZW50U3R5bGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0TGluZSgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRFbGVtZW50U3R5bGUoKTogdm9pZCB7XG4gICAgdGhpcy5wYXRoID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCdwYXRoJykhO1xuICAgIHRoaXMuc2V0RWxlbWVudERhdGEoKTtcbiAgfVxuXG4gIHNldExpbmUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRQYXRoKHRoaXMubGluZSh0aGlzLmVkZ2UucG9pbnRzKSEpO1xuICB9XG5cbiAgc2V0UGF0aChkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlKCdkJywgZCk7XG4gIH1cblxuICBzZXRFbGVtZW50RGF0YSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGF0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuaWQpO1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZWRnZScsIHRoaXMuaWQpO1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdicsIGAke3RoaXMuZWRnZS52fWApO1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdycsIGAke3RoaXMuZWRnZS53fWApO1xuICB9XG59XG4iXX0=