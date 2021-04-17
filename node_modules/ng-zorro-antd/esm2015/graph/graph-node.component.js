/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { animate, AnimationBuilder, group, query, style } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
export class NzGraphNodeComponent {
    constructor(el, builder, renderer2) {
        this.el = el;
        this.builder = builder;
        this.renderer2 = renderer2;
        this.nodeClick = new EventEmitter();
        this.animationInfo = null;
        this.initialState = true;
        this.animationPlayer = null;
    }
    triggerClick(event) {
        event.preventDefault();
        this.nodeClick.emit(this.node);
    }
    makeAnimation() {
        const cur = this.getAnimationInfo();
        if (this.animationPlayer) {
            this.animationPlayer.destroy();
        }
        let animationFactory;
        const pre = Object.assign({}, this.animationInfo);
        if (this.initialState) {
            animationFactory = this.builder.build([
                style({ transform: `translate(${cur.x}px, ${cur.y}px)` }),
                query('g', [
                    style({
                        width: `${cur.width}px`,
                        height: `${cur.height}px`
                    })
                ])
            ]);
            this.initialState = false;
        }
        else {
            animationFactory = this.builder.build([
                style({ transform: `translate(${pre.x}px, ${pre.y}px)` }),
                query('g', [
                    style({
                        width: `${pre.width}px`,
                        height: `${pre.height}px`
                    })
                ]),
                group([
                    query('g', [
                        animate('150ms ease-out', style({
                            width: `${cur.width}px`,
                            height: `${cur.height}px`
                        }))
                    ]),
                    animate('150ms ease-out', style({ transform: `translate(${cur.x}px, ${cur.y}px)` }))
                ])
            ]);
        }
        this.animationInfo = cur;
        this.animationPlayer = animationFactory.create(this.el.nativeElement);
        this.animationPlayer.play();
        const done$ = new Subject();
        this.animationPlayer.onDone(() => {
            // Need this for canvas for now.
            this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
            done$.next();
            done$.complete();
        });
        return done$.asObservable();
    }
    makeNoAnimation() {
        const cur = this.getAnimationInfo();
        // Need this for canvas for now.
        this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
    }
    getAnimationInfo() {
        const { x, y } = this.nodeTransform();
        return {
            width: this.node.width,
            height: this.node.height,
            x,
            y
        };
    }
    nodeTransform() {
        const x = this.computeCXPositionOfNodeShape() - this.node.width / 2;
        const y = this.node.y - this.node.height / 2;
        return { x, y };
    }
    computeCXPositionOfNodeShape() {
        if (this.node.expanded) {
            return this.node.x;
        }
        return this.node.x - this.node.width / 2 + this.node.coreBox.width / 2;
    }
}
NzGraphNodeComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-graph-node]',
                template: `
    <svg:g>
      <ng-container
        *ngIf="customTemplate"
        [ngTemplateOutlet]="customTemplate"
        [ngTemplateOutletContext]="{ $implicit: node }"
      ></ng-container>
      <ng-container *ngIf="!customTemplate">
        <svg:rect class="nz-graph-node-rect" [attr.width]="node.width" [attr.height]="node.height"></svg:rect>
        <svg:text x="10" y="20">{{ node.id || node.name }}</svg:text>
      </ng-container>
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[id]': 'node.id || node.name',
                    '[class.nz-graph-node-expanded]': 'node.expanded',
                    '[class.nz-graph-group-node]': 'node.type===0',
                    '[class.nz-graph-base-node]': 'node.type===1',
                    '(click)': 'triggerClick($event)'
                }
            },] }
];
NzGraphNodeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: AnimationBuilder },
    { type: Renderer2 }
];
NzGraphNodeComponent.propDecorators = {
    node: [{ type: Input }],
    noAnimation: [{ type: Input }],
    customTemplate: [{ type: Input }],
    nodeClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzGraphNodeComponent.prototype, "noAnimation", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtbm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2dyYXBoLW5vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFxQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFpQzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFtQi9CLFlBQW9CLEVBQWMsRUFBVSxPQUF5QixFQUFVLFNBQW9CO1FBQS9FLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFaaEYsY0FBUyxHQUFpRCxJQUFJLFlBQVksRUFBRSxDQUFDO1FBT2hHLGtCQUFhLEdBQWdCLElBQUksQ0FBQztRQUNsQyxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVaLG9CQUFlLEdBQTJCLElBQUksQ0FBQztJQUUrQyxDQUFDO0lBVnZHLFlBQVksQ0FBQyxLQUFpQjtRQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFTRCxhQUFhO1FBQ1gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEM7UUFDRCxJQUFJLGdCQUFrQyxDQUFDO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLGtCQUFLLElBQUksQ0FBQyxhQUFhLENBQVUsQ0FBQztRQUU5QyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3pELEtBQUssQ0FBQyxHQUFHLEVBQUU7b0JBQ1QsS0FBSyxDQUFDO3dCQUNKLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUk7d0JBQ3ZCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUk7cUJBQzFCLENBQUM7aUJBQ0gsQ0FBQzthQUNILENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzNCO2FBQU07WUFDTCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDcEMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGFBQWEsR0FBSSxDQUFDLENBQUMsT0FBTyxHQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtvQkFDVCxLQUFLLENBQUM7d0JBQ0osS0FBSyxFQUFFLEdBQUcsR0FBSSxDQUFDLEtBQUssSUFBSTt3QkFDeEIsTUFBTSxFQUFFLEdBQUcsR0FBSSxDQUFDLE1BQU0sSUFBSTtxQkFDM0IsQ0FBQztpQkFDSCxDQUFDO2dCQUNGLEtBQUssQ0FBQztvQkFDSixLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUNULE9BQU8sQ0FDTCxnQkFBZ0IsRUFDaEIsS0FBSyxDQUFDOzRCQUNKLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUk7NEJBQ3ZCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUk7eUJBQzFCLENBQUMsQ0FDSDtxQkFDRixDQUFDO29CQUNGLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ3JGLENBQUM7YUFDSCxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUMvQixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLGFBQWEsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3BDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsYUFBYSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QyxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ3hCLENBQUM7WUFDRCxDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw0QkFBNEI7UUFDMUIsSUFBSyxJQUFJLENBQUMsSUFBeUIsQ0FBQyxRQUFRLEVBQUU7WUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7O1lBL0hGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osTUFBTSxFQUFFLHNCQUFzQjtvQkFDOUIsZ0NBQWdDLEVBQUUsZUFBZTtvQkFDakQsNkJBQTZCLEVBQUUsZUFBZTtvQkFDOUMsNEJBQTRCLEVBQUUsZUFBZTtvQkFDN0MsU0FBUyxFQUFFLHNCQUFzQjtpQkFDbEM7YUFDRjs7O1lBbEM0QyxVQUFVO1lBRHJDLGdCQUFnQjtZQUNvRCxTQUFTOzs7bUJBb0M1RixLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSzt3QkFJTCxNQUFNOztBQUxrQjtJQUFmLFlBQVksRUFBRTs7eURBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgQW5pbWF0aW9uRmFjdG9yeSwgQW5pbWF0aW9uUGxheWVyLCBncm91cCwgcXVlcnksIHN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE56R3JhcGhHcm91cE5vZGUsIE56R3JhcGhOb2RlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5pbnRlcmZhY2UgSW5mbyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuei1ncmFwaC1ub2RlXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cImN1c3RvbVRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUgfVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWN1c3RvbVRlbXBsYXRlXCI+XG4gICAgICAgIDxzdmc6cmVjdCBjbGFzcz1cIm56LWdyYXBoLW5vZGUtcmVjdFwiIFthdHRyLndpZHRoXT1cIm5vZGUud2lkdGhcIiBbYXR0ci5oZWlnaHRdPVwibm9kZS5oZWlnaHRcIj48L3N2ZzpyZWN0PlxuICAgICAgICA8c3ZnOnRleHQgeD1cIjEwXCIgeT1cIjIwXCI+e3sgbm9kZS5pZCB8fCBub2RlLm5hbWUgfX08L3N2Zzp0ZXh0PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW2lkXSc6ICdub2RlLmlkIHx8IG5vZGUubmFtZScsXG4gICAgJ1tjbGFzcy5uei1ncmFwaC1ub2RlLWV4cGFuZGVkXSc6ICdub2RlLmV4cGFuZGVkJyxcbiAgICAnW2NsYXNzLm56LWdyYXBoLWdyb3VwLW5vZGVdJzogJ25vZGUudHlwZT09PTAnLFxuICAgICdbY2xhc3MubnotZ3JhcGgtYmFzZS1ub2RlXSc6ICdub2RlLnR5cGU9PT0xJyxcbiAgICAnKGNsaWNrKSc6ICd0cmlnZ2VyQ2xpY2soJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoTm9kZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG5vZGUhOiBOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBub0FuaW1hdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8e1xuICAgICRpbXBsaWNpdDogTnpHcmFwaE5vZGUgfCBOekdyYXBoR3JvdXBOb2RlO1xuICB9PjtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbm9kZUNsaWNrOiBFdmVudEVtaXR0ZXI8TnpHcmFwaE5vZGUgfCBOekdyYXBoR3JvdXBOb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0cmlnZ2VyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMubm9kZUNsaWNrLmVtaXQodGhpcy5ub2RlKTtcbiAgfVxuXG4gIGFuaW1hdGlvbkluZm86IEluZm8gfCBudWxsID0gbnVsbDtcbiAgaW5pdGlhbFN0YXRlID0gdHJ1ZTtcblxuICBwcml2YXRlIGFuaW1hdGlvblBsYXllcjogQW5pbWF0aW9uUGxheWVyIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBidWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLCBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyKSB7fVxuXG4gIG1ha2VBbmltYXRpb24oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgY29uc3QgY3VyID0gdGhpcy5nZXRBbmltYXRpb25JbmZvKCk7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uUGxheWVyKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvblBsYXllci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGxldCBhbmltYXRpb25GYWN0b3J5OiBBbmltYXRpb25GYWN0b3J5O1xuICAgIGNvbnN0IHByZSA9IHsgLi4udGhpcy5hbmltYXRpb25JbmZvIH0gYXMgSW5mbztcblxuICAgIGlmICh0aGlzLmluaXRpYWxTdGF0ZSkge1xuICAgICAgYW5pbWF0aW9uRmFjdG9yeSA9IHRoaXMuYnVpbGRlci5idWlsZChbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7Y3VyLnh9cHgsICR7Y3VyLnl9cHgpYCB9KSxcbiAgICAgICAgcXVlcnkoJ2cnLCBbXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgd2lkdGg6IGAke2N1ci53aWR0aH1weGAsXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2N1ci5oZWlnaHR9cHhgXG4gICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICAgIF0pO1xuICAgICAgdGhpcy5pbml0aWFsU3RhdGUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYW5pbWF0aW9uRmFjdG9yeSA9IHRoaXMuYnVpbGRlci5idWlsZChbXG4gICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7cHJlIS54fXB4LCAke3ByZSEueX1weClgIH0pLFxuICAgICAgICBxdWVyeSgnZycsIFtcbiAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICB3aWR0aDogYCR7cHJlIS53aWR0aH1weGAsXG4gICAgICAgICAgICBoZWlnaHQ6IGAke3ByZSEuaGVpZ2h0fXB4YFxuICAgICAgICAgIH0pXG4gICAgICAgIF0pLFxuICAgICAgICBncm91cChbXG4gICAgICAgICAgcXVlcnkoJ2cnLCBbXG4gICAgICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICAgICAnMTUwbXMgZWFzZS1vdXQnLFxuICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke2N1ci53aWR0aH1weGAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtjdXIuaGVpZ2h0fXB4YFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIGFuaW1hdGUoJzE1MG1zIGVhc2Utb3V0Jywgc3R5bGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtjdXIueH1weCwgJHtjdXIueX1weClgIH0pKVxuICAgICAgICBdKVxuICAgICAgXSk7XG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uSW5mbyA9IGN1cjtcbiAgICB0aGlzLmFuaW1hdGlvblBsYXllciA9IGFuaW1hdGlvbkZhY3RvcnkuY3JlYXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5hbmltYXRpb25QbGF5ZXIucGxheSgpO1xuICAgIGNvbnN0IGRvbmUkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICB0aGlzLmFuaW1hdGlvblBsYXllci5vbkRvbmUoKCkgPT4ge1xuICAgICAgLy8gTmVlZCB0aGlzIGZvciBjYW52YXMgZm9yIG5vdy5cbiAgICAgIHRoaXMucmVuZGVyZXIyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7Y3VyLnh9LCAke2N1ci55fSlgKTtcbiAgICAgIGRvbmUkLm5leHQoKTtcbiAgICAgIGRvbmUkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRvbmUkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbWFrZU5vQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1ciA9IHRoaXMuZ2V0QW5pbWF0aW9uSW5mbygpO1xuICAgIC8vIE5lZWQgdGhpcyBmb3IgY2FudmFzIGZvciBub3cuXG4gICAgdGhpcy5yZW5kZXJlcjIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHtjdXIueH0sICR7Y3VyLnl9KWApO1xuICB9XG5cbiAgZ2V0QW5pbWF0aW9uSW5mbygpOiBJbmZvIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMubm9kZVRyYW5zZm9ybSgpO1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogdGhpcy5ub2RlLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLm5vZGUuaGVpZ2h0LFxuICAgICAgeCxcbiAgICAgIHlcbiAgICB9O1xuICB9XG5cbiAgbm9kZVRyYW5zZm9ybSgpOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHggPSB0aGlzLmNvbXB1dGVDWFBvc2l0aW9uT2ZOb2RlU2hhcGUoKSAtIHRoaXMubm9kZS53aWR0aCAvIDI7XG4gICAgY29uc3QgeSA9IHRoaXMubm9kZS55IC0gdGhpcy5ub2RlLmhlaWdodCAvIDI7XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xuICB9XG5cbiAgY29tcHV0ZUNYUG9zaXRpb25PZk5vZGVTaGFwZSgpOiBudW1iZXIge1xuICAgIGlmICgodGhpcy5ub2RlIGFzIE56R3JhcGhHcm91cE5vZGUpLmV4cGFuZGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLng7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vZGUueCAtIHRoaXMubm9kZS53aWR0aCAvIDIgKyB0aGlzLm5vZGUuY29yZUJveC53aWR0aCAvIDI7XG4gIH1cbn1cbiJdfQ==