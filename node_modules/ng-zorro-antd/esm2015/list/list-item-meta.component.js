/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input, Renderer2, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzListItemMetaDescriptionComponent as DescriptionComponent, NzListItemMetaTitleComponent as TitleComponent } from './list-item-meta-cell';
export class NzListItemMetaComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.avatarStr = '';
        this.renderer.addClass(elementRef.nativeElement, 'ant-list-item-meta');
    }
    set nzAvatar(value) {
        if (value instanceof TemplateRef) {
            this.avatarStr = '';
            this.avatarTpl = value;
        }
        else {
            this.avatarStr = value;
        }
    }
}
NzListItemMetaComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-item-meta, [nz-list-item-meta]',
                exportAs: 'nzListItemMeta',
                template: `
    <!--Old API Start-->
    <nz-list-item-meta-avatar *ngIf="avatarStr" [nzSrc]="avatarStr"></nz-list-item-meta-avatar>
    <nz-list-item-meta-avatar *ngIf="avatarTpl">
      <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
    </nz-list-item-meta-avatar>
    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar"></ng-content>

    <div *ngIf="nzTitle || nzDescription || descriptionComponent || titleComponent" class="ant-list-item-meta-content">
      <!--Old API Start-->
      <nz-list-item-meta-title *ngIf="nzTitle && !titleComponent">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </nz-list-item-meta-title>
      <nz-list-item-meta-description *ngIf="nzDescription && !descriptionComponent">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </nz-list-item-meta-description>
      <!--Old API End-->

      <ng-content select="nz-list-item-meta-title"></ng-content>
      <ng-content select="nz-list-item-meta-description"></ng-content>
    </div>
  `,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
NzListItemMetaComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NzListItemMetaComponent.propDecorators = {
    nzAvatar: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzDescription: [{ type: Input }],
    descriptionComponent: [{ type: ContentChild, args: [DescriptionComponent,] }],
    titleComponent: [{ type: ContentChild, args: [TitleComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLW1ldGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9saXN0L2xpc3QtaXRlbS1tZXRhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsa0NBQWtDLElBQUksb0JBQW9CLEVBQzFELDRCQUE0QixJQUFJLGNBQWMsRUFDL0MsTUFBTSx1QkFBdUIsQ0FBQztBQWlDL0IsTUFBTSxPQUFPLHVCQUF1QjtJQW9CbEMsWUFBbUIsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQW5CdEUsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQW9CYixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDekUsQ0FBQztJQWxCRCxJQUNJLFFBQVEsQ0FBQyxLQUFpQztRQUM1QyxJQUFJLEtBQUssWUFBWSxXQUFXLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO2dCQUNELG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7O1lBekNDLFVBQVU7WUFFVixTQUFTOzs7dUJBNENSLEtBQUs7c0JBVUwsS0FBSzs0QkFFTCxLQUFLO21DQUVMLFlBQVksU0FBQyxvQkFBb0I7NkJBQ2pDLFlBQVksU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOekxpc3RJdGVtTWV0YURlc2NyaXB0aW9uQ29tcG9uZW50IGFzIERlc2NyaXB0aW9uQ29tcG9uZW50LFxuICBOekxpc3RJdGVtTWV0YVRpdGxlQ29tcG9uZW50IGFzIFRpdGxlQ29tcG9uZW50XG59IGZyb20gJy4vbGlzdC1pdGVtLW1ldGEtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QtaXRlbS1tZXRhLCBbbnotbGlzdC1pdGVtLW1ldGFdJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtTWV0YScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLU9sZCBBUEkgU3RhcnQtLT5cbiAgICA8bnotbGlzdC1pdGVtLW1ldGEtYXZhdGFyICpuZ0lmPVwiYXZhdGFyU3RyXCIgW256U3JjXT1cImF2YXRhclN0clwiPjwvbnotbGlzdC1pdGVtLW1ldGEtYXZhdGFyPlxuICAgIDxuei1saXN0LWl0ZW0tbWV0YS1hdmF0YXIgKm5nSWY9XCJhdmF0YXJUcGxcIj5cbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiYXZhdGFyVHBsXCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uei1saXN0LWl0ZW0tbWV0YS1hdmF0YXI+XG4gICAgPCEtLU9sZCBBUEkgRW5kLS0+XG5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1saXN0LWl0ZW0tbWV0YS1hdmF0YXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8ZGl2ICpuZ0lmPVwibnpUaXRsZSB8fCBuekRlc2NyaXB0aW9uIHx8IGRlc2NyaXB0aW9uQ29tcG9uZW50IHx8IHRpdGxlQ29tcG9uZW50XCIgY2xhc3M9XCJhbnQtbGlzdC1pdGVtLW1ldGEtY29udGVudFwiPlxuICAgICAgPCEtLU9sZCBBUEkgU3RhcnQtLT5cbiAgICAgIDxuei1saXN0LWl0ZW0tbWV0YS10aXRsZSAqbmdJZj1cIm56VGl0bGUgJiYgIXRpdGxlQ29tcG9uZW50XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9uei1saXN0LWl0ZW0tbWV0YS10aXRsZT5cbiAgICAgIDxuei1saXN0LWl0ZW0tbWV0YS1kZXNjcmlwdGlvbiAqbmdJZj1cIm56RGVzY3JpcHRpb24gJiYgIWRlc2NyaXB0aW9uQ29tcG9uZW50XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekRlc2NyaXB0aW9uXCI+e3sgbnpEZXNjcmlwdGlvbiB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9uei1saXN0LWl0ZW0tbWV0YS1kZXNjcmlwdGlvbj5cbiAgICAgIDwhLS1PbGQgQVBJIEVuZC0tPlxuXG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1saXN0LWl0ZW0tbWV0YS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtaXRlbS1tZXRhLWRlc2NyaXB0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTnpMaXN0SXRlbU1ldGFDb21wb25lbnQge1xuICBhdmF0YXJTdHIgPSAnJztcbiAgYXZhdGFyVHBsPzogVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgQElucHV0KClcbiAgc2V0IG56QXZhdGFyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICB0aGlzLmF2YXRhclN0ciA9ICcnO1xuICAgICAgdGhpcy5hdmF0YXJUcGwgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdmF0YXJTdHIgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgQElucHV0KCkgbnpEZXNjcmlwdGlvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVzY3JpcHRpb25Db21wb25lbnQpIGRlc2NyaXB0aW9uQ29tcG9uZW50PzogRGVzY3JpcHRpb25Db21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGQoVGl0bGVDb21wb25lbnQpIHRpdGxlQ29tcG9uZW50PzogVGl0bGVDb21wb25lbnQ7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1saXN0LWl0ZW0tbWV0YScpO1xuICB9XG59XG4iXX0=