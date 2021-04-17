/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { Minimap } from './core/minimap';
export class NzGraphMinimapComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() { }
    init(containerEle, zoomBehavior) {
        const svgEle = containerEle.nativeElement.querySelector('svg');
        const zoomEle = containerEle.nativeElement.querySelector('svg > g');
        this.minimap = new Minimap(svgEle, zoomEle, zoomBehavior, this.elementRef.nativeElement, 150, 0);
    }
    zoom(transform) {
        if (this.minimap) {
            this.minimap.zoom(transform);
        }
    }
    update() {
        if (this.minimap) {
            this.minimap.update();
        }
    }
}
NzGraphMinimapComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-graph-minimap',
                template: `
    <svg>
      <defs>
        <filter id="minimapDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0"
          ></feColorMatrix>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <rect></rect>
    </svg>
    <canvas class="viewport"></canvas>
    <!-- Additional canvas to use as buffer to avoid flickering between updates -->
    <canvas class="buffer"></canvas>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.nz-graph-minimap]': 'true'
                }
            },] }
];
NzGraphMinimapComponent.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtbWluaW1hcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2dyYXBoLW1pbmltYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR3ZGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQStCekMsTUFBTSxPQUFPLHVCQUF1QjtJQUVsQyxZQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtJQUFHLENBQUM7SUFFM0QsUUFBUSxLQUFVLENBQUM7SUFFbkIsSUFBSSxDQUFDLFlBQXdCLEVBQUUsWUFBZ0Q7UUFDN0UsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVELElBQUksQ0FBQyxTQUEwQjtRQUM3QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7O1lBbERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osMEJBQTBCLEVBQUUsTUFBTTtpQkFDbkM7YUFDRjs7O1lBakM0QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBab29tQmVoYXZpb3IgfSBmcm9tICdkMy16b29tJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBNaW5pbWFwIH0gZnJvbSAnLi9jb3JlL21pbmltYXAnO1xuaW1wb3J0IHsgTnpab29tVHJhbnNmb3JtIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1ncmFwaC1taW5pbWFwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxmaWx0ZXIgaWQ9XCJtaW5pbWFwRHJvcFNoYWRvd1wiIHg9XCItMjAlXCIgeT1cIi0yMCVcIiB3aWR0aD1cIjE1MCVcIiBoZWlnaHQ9XCIxNTAlXCI+XG4gICAgICAgICAgPGZlT2Zmc2V0IHJlc3VsdD1cIm9mZk91dFwiIGluPVwiU291cmNlR3JhcGhpY1wiIGR4PVwiMVwiIGR5PVwiMVwiPjwvZmVPZmZzZXQ+XG4gICAgICAgICAgPGZlQ29sb3JNYXRyaXhcbiAgICAgICAgICAgIHJlc3VsdD1cIm1hdHJpeE91dFwiXG4gICAgICAgICAgICBpbj1cIm9mZk91dFwiXG4gICAgICAgICAgICB0eXBlPVwibWF0cml4XCJcbiAgICAgICAgICAgIHZhbHVlcz1cIjAuMSAwIDAgMCAwIDAgMC4xIDAgMCAwIDAgMCAwLjEgMCAwIDAgMCAwIDAuNSAwXCJcbiAgICAgICAgICA+PC9mZUNvbG9yTWF0cml4PlxuICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciByZXN1bHQ9XCJibHVyT3V0XCIgaW49XCJtYXRyaXhPdXRcIiBzdGREZXZpYXRpb249XCIyXCI+PC9mZUdhdXNzaWFuQmx1cj5cbiAgICAgICAgICA8ZmVCbGVuZCBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJibHVyT3V0XCIgbW9kZT1cIm5vcm1hbFwiPjwvZmVCbGVuZD5cbiAgICAgICAgPC9maWx0ZXI+XG4gICAgICA8L2RlZnM+XG4gICAgICA8cmVjdD48L3JlY3Q+XG4gICAgPC9zdmc+XG4gICAgPGNhbnZhcyBjbGFzcz1cInZpZXdwb3J0XCI+PC9jYW52YXM+XG4gICAgPCEtLSBBZGRpdGlvbmFsIGNhbnZhcyB0byB1c2UgYXMgYnVmZmVyIHRvIGF2b2lkIGZsaWNrZXJpbmcgYmV0d2VlbiB1cGRhdGVzIC0tPlxuICAgIDxjYW52YXMgY2xhc3M9XCJidWZmZXJcIj48L2NhbnZhcz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm56LWdyYXBoLW1pbmltYXBdJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpHcmFwaE1pbmltYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBtaW5pbWFwPzogTWluaW1hcDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgaW5pdChjb250YWluZXJFbGU6IEVsZW1lbnRSZWYsIHpvb21CZWhhdmlvcjogWm9vbUJlaGF2aW9yPE56U2FmZUFueSwgTnpTYWZlQW55Pik6IHZvaWQge1xuICAgIGNvbnN0IHN2Z0VsZSA9IGNvbnRhaW5lckVsZS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuICAgIGNvbnN0IHpvb21FbGUgPSBjb250YWluZXJFbGUubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzdmcgPiBnJyk7XG4gICAgdGhpcy5taW5pbWFwID0gbmV3IE1pbmltYXAoc3ZnRWxlLCB6b29tRWxlLCB6b29tQmVoYXZpb3IsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAxNTAsIDApO1xuICB9XG5cbiAgem9vbSh0cmFuc2Zvcm06IE56Wm9vbVRyYW5zZm9ybSk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1pbmltYXApIHtcbiAgICAgIHRoaXMubWluaW1hcC56b29tKHRyYW5zZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1pbmltYXApIHtcbiAgICAgIHRoaXMubWluaW1hcC51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==