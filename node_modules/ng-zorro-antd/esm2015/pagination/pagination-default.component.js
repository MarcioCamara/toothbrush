/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Optional, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzPaginationDefaultComponent {
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.nzSize = 'default';
        this.itemRender = null;
        this.showTotal = null;
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 20, 30, 40];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.ranges = [0, 0];
        this.listOfPageItem = [];
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.updateRtlStyle();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.updateRtlStyle();
    }
    updateRtlStyle() {
        if (this.dir === 'rtl') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    jumpPage(index) {
        this.onPageIndexChange(index);
    }
    jumpDiff(diff) {
        this.jumpPage(this.pageIndex + diff);
    }
    trackByPageItem(_, value) {
        return `${value.type}-${value.index}`;
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    onPageSizeChange(size) {
        this.pageSizeChange.next(size);
    }
    getLastIndex(total, pageSize) {
        return Math.ceil(total / pageSize);
    }
    buildIndexes() {
        const lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    }
    getListOfPageItem(pageIndex, lastIndex) {
        const concatWithPrevNext = (listOfPage) => {
            const prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            const nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return [prevItem, ...listOfPage, nextItem];
        };
        const generatePage = (start, end) => {
            const list = [];
            for (let i = start; i <= end; i++) {
                list.push({
                    index: i,
                    type: 'page'
                });
            }
            return list;
        };
        if (lastIndex <= 9) {
            return concatWithPrevNext(generatePage(1, lastIndex));
        }
        else {
            const generateRangeItem = (selected, last) => {
                let listOfRange = [];
                const prevFiveItem = {
                    type: 'prev_5'
                };
                const nextFiveItem = {
                    type: 'next_5'
                };
                const firstPageItem = generatePage(1, 1);
                const lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 4) {
                    listOfRange = [...generatePage(2, 5), nextFiveItem];
                }
                else if (selected < last - 3) {
                    listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
                }
                else {
                    listOfRange = [prevFiveItem, ...generatePage(last - 4, last - 1)];
                }
                return [...firstPageItem, ...listOfRange, ...lastPageItem];
            };
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    }
    ngOnChanges(changes) {
        const { pageIndex, pageSize, total } = changes;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    }
}
NzPaginationDefaultComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-pagination-default',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-template #containerTemplate>
      <li class="ant-pagination-total-text" *ngIf="showTotal">
        <ng-template [ngTemplateOutlet]="showTotal" [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"></ng-template>
      </li>
      <li
        *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
        nz-pagination-item
        [locale]="locale"
        [type]="page.type"
        [index]="page.index"
        [disabled]="!!page.disabled"
        [itemRender]="itemRender"
        [active]="pageIndex === page.index"
        (gotoIndex)="jumpPage($event)"
        (diffIndex)="jumpDiff($event)"
        [direction]="dir"
      ></li>
      <div
        nz-pagination-options
        *ngIf="showQuickJumper || showSizeChanger"
        [total]="total"
        [locale]="locale"
        [disabled]="disabled"
        [nzSize]="nzSize"
        [showSizeChanger]="showSizeChanger"
        [showQuickJumper]="showQuickJumper"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></div>
    </ng-template>
  `
            },] }
];
NzPaginationDefaultComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzPaginationDefaultComponent.propDecorators = {
    template: [{ type: ViewChild, args: ['containerTemplate', { static: true },] }],
    nzSize: [{ type: Input }],
    itemRender: [{ type: Input }],
    showTotal: [{ type: Input }],
    disabled: [{ type: Input }],
    locale: [{ type: Input }],
    showSizeChanger: [{ type: Input }],
    showQuickJumper: [{ type: Input }],
    total: [{ type: Input }],
    pageIndex: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageSizeOptions: [{ type: Input }],
    pageIndexChange: [{ type: Output }],
    pageSizeChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1kZWZhdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLWRlZmF1bHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBRVQsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUE2QzNDLE1BQU0sT0FBTyw0QkFBNEI7SUFxQnZDLFlBQ1UsR0FBc0IsRUFDdEIsUUFBbUIsRUFDbkIsVUFBc0IsRUFDVixjQUE4QjtRQUgxQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF2QjNDLFdBQU0sR0FBd0IsU0FBUyxDQUFDO1FBQ3hDLGVBQVUsR0FBb0QsSUFBSSxDQUFDO1FBQ25FLGNBQVMsR0FBdUUsSUFBSSxDQUFDO1FBQ3JGLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsb0JBQWUs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SUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7WUFoTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NUO2FBQ0Y7OztZQS9EQyxpQkFBaUI7WUFVakIsU0FBUztZQVJULFVBQVU7WUFMUSxjQUFjLHVCQTRGN0IsUUFBUTs7O3VCQXhCVixTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3FCQUMvQyxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLO29CQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsTUFBTTs2QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56UGFnaW5hdGlvbkkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSXRlbVJlbmRlckNvbnRleHQgfSBmcm9tICcuL3BhZ2luYXRpb24udHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1wYWdpbmF0aW9uLWRlZmF1bHQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250YWluZXJUZW1wbGF0ZT5cbiAgICAgIDxsaSBjbGFzcz1cImFudC1wYWdpbmF0aW9uLXRvdGFsLXRleHRcIiAqbmdJZj1cInNob3dUb3RhbFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2hvd1RvdGFsXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0b3RhbCwgcmFuZ2U6IHJhbmdlcyB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgbGlzdE9mUGFnZUl0ZW07IHRyYWNrQnk6IHRyYWNrQnlQYWdlSXRlbVwiXG4gICAgICAgIG56LXBhZ2luYXRpb24taXRlbVxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgIFt0eXBlXT1cInBhZ2UudHlwZVwiXG4gICAgICAgIFtpbmRleF09XCJwYWdlLmluZGV4XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiEhcGFnZS5kaXNhYmxlZFwiXG4gICAgICAgIFtpdGVtUmVuZGVyXT1cIml0ZW1SZW5kZXJcIlxuICAgICAgICBbYWN0aXZlXT1cInBhZ2VJbmRleCA9PT0gcGFnZS5pbmRleFwiXG4gICAgICAgIChnb3RvSW5kZXgpPVwianVtcFBhZ2UoJGV2ZW50KVwiXG4gICAgICAgIChkaWZmSW5kZXgpPVwianVtcERpZmYoJGV2ZW50KVwiXG4gICAgICAgIFtkaXJlY3Rpb25dPVwiZGlyXCJcbiAgICAgID48L2xpPlxuICAgICAgPGRpdlxuICAgICAgICBuei1wYWdpbmF0aW9uLW9wdGlvbnNcbiAgICAgICAgKm5nSWY9XCJzaG93UXVpY2tKdW1wZXIgfHwgc2hvd1NpemVDaGFuZ2VyXCJcbiAgICAgICAgW3RvdGFsXT1cInRvdGFsXCJcbiAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBbbnpTaXplXT1cIm56U2l6ZVwiXG4gICAgICAgIFtzaG93U2l6ZUNoYW5nZXJdPVwic2hvd1NpemVDaGFuZ2VyXCJcbiAgICAgICAgW3Nob3dRdWlja0p1bXBlcl09XCJzaG93UXVpY2tKdW1wZXJcIlxuICAgICAgICBbcGFnZUluZGV4XT1cInBhZ2VJbmRleFwiXG4gICAgICAgIFtwYWdlU2l6ZV09XCJwYWdlU2l6ZVwiXG4gICAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVPcHRpb25zXCJcbiAgICAgICAgKHBhZ2VJbmRleENoYW5nZSk9XCJvblBhZ2VJbmRleENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgKHBhZ2VTaXplQ2hhbmdlKT1cIm9uUGFnZVNpemVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+PC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelBhZ2luYXRpb25EZWZhdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lclRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgdGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBASW5wdXQoKSBuelNpemU6ICdkZWZhdWx0JyB8ICdzbWFsbCcgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIGl0ZW1SZW5kZXI6IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1RvdGFsOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogbnVtYmVyOyByYW5nZTogW251bWJlciwgbnVtYmVyXSB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUhOiBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSBzaG93U2l6ZUNoYW5nZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1F1aWNrSnVtcGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvdGFsID0gMDtcbiAgQElucHV0KCkgcGFnZUluZGV4ID0gMTtcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFsxMCwgMjAsIDMwLCA0MF07XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlSW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2VTaXplQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHJhbmdlcyA9IFswLCAwXTtcbiAgbGlzdE9mUGFnZUl0ZW06IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+ID0gW107XG5cbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7XG4gICAgcmVuZGVyZXIucmVtb3ZlQ2hpbGQocmVuZGVyZXIucGFyZW50Tm9kZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLCBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLnVwZGF0ZVJ0bFN0eWxlKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICAgIHRoaXMudXBkYXRlUnRsU3R5bGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUnRsU3R5bGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1wYWdpbmF0aW9uLXJ0bCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LXBhZ2luYXRpb24tcnRsJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAganVtcFBhZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMub25QYWdlSW5kZXhDaGFuZ2UoaW5kZXgpO1xuICB9XG5cbiAganVtcERpZmYoZGlmZjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5qdW1wUGFnZSh0aGlzLnBhZ2VJbmRleCArIGRpZmYpO1xuICB9XG5cbiAgdHJhY2tCeVBhZ2VJdGVtKF86IG51bWJlciwgdmFsdWU6IFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4pOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt2YWx1ZS50eXBlfS0ke3ZhbHVlLmluZGV4fWA7XG4gIH1cblxuICBvblBhZ2VJbmRleENoYW5nZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlSW5kZXhDaGFuZ2UubmV4dChpbmRleCk7XG4gIH1cblxuICBvblBhZ2VTaXplQ2hhbmdlKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZVNpemVDaGFuZ2UubmV4dChzaXplKTtcbiAgfVxuXG4gIGdldExhc3RJbmRleCh0b3RhbDogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRvdGFsIC8gcGFnZVNpemUpO1xuICB9XG5cbiAgYnVpbGRJbmRleGVzKCk6IHZvaWQge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuZ2V0TGFzdEluZGV4KHRoaXMudG90YWwsIHRoaXMucGFnZVNpemUpO1xuICAgIHRoaXMubGlzdE9mUGFnZUl0ZW0gPSB0aGlzLmdldExpc3RPZlBhZ2VJdGVtKHRoaXMucGFnZUluZGV4LCBsYXN0SW5kZXgpO1xuICB9XG5cbiAgZ2V0TGlzdE9mUGFnZUl0ZW0ocGFnZUluZGV4OiBudW1iZXIsIGxhc3RJbmRleDogbnVtYmVyKTogQXJyYXk8UGFydGlhbDxOelBhZ2luYXRpb25JdGVtQ29tcG9uZW50Pj4ge1xuICAgIGNvbnN0IGNvbmNhdFdpdGhQcmV2TmV4dCA9IChsaXN0T2ZQYWdlOiBBcnJheTxQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+PikgPT4ge1xuICAgICAgY29uc3QgcHJldkl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICdwcmV2JyxcbiAgICAgICAgZGlzYWJsZWQ6IHBhZ2VJbmRleCA9PT0gMVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5leHRJdGVtID0ge1xuICAgICAgICB0eXBlOiAnbmV4dCcsXG4gICAgICAgIGRpc2FibGVkOiBwYWdlSW5kZXggPT09IGxhc3RJbmRleFxuICAgICAgfTtcbiAgICAgIHJldHVybiBbcHJldkl0ZW0sIC4uLmxpc3RPZlBhZ2UsIG5leHRJdGVtXTtcbiAgICB9O1xuICAgIGNvbnN0IGdlbmVyYXRlUGFnZSA9IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+ID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICBsaXN0LnB1c2goe1xuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIHR5cGU6ICdwYWdlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgaWYgKGxhc3RJbmRleCA8PSA5KSB7XG4gICAgICByZXR1cm4gY29uY2F0V2l0aFByZXZOZXh0KGdlbmVyYXRlUGFnZSgxLCBsYXN0SW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2VuZXJhdGVSYW5nZUl0ZW0gPSAoc2VsZWN0ZWQ6IG51bWJlciwgbGFzdDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBsaXN0T2ZSYW5nZSA9IFtdO1xuICAgICAgICBjb25zdCBwcmV2Rml2ZUl0ZW0gPSB7XG4gICAgICAgICAgdHlwZTogJ3ByZXZfNSdcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbmV4dEZpdmVJdGVtID0ge1xuICAgICAgICAgIHR5cGU6ICduZXh0XzUnXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGZpcnN0UGFnZUl0ZW0gPSBnZW5lcmF0ZVBhZ2UoMSwgMSk7XG4gICAgICAgIGNvbnN0IGxhc3RQYWdlSXRlbSA9IGdlbmVyYXRlUGFnZShsYXN0SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgIGlmIChzZWxlY3RlZCA8IDQpIHtcbiAgICAgICAgICBsaXN0T2ZSYW5nZSA9IFsuLi5nZW5lcmF0ZVBhZ2UoMiwgNSksIG5leHRGaXZlSXRlbV07XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgPCBsYXN0IC0gMykge1xuICAgICAgICAgIGxpc3RPZlJhbmdlID0gW3ByZXZGaXZlSXRlbSwgLi4uZ2VuZXJhdGVQYWdlKHNlbGVjdGVkIC0gMiwgc2VsZWN0ZWQgKyAyKSwgbmV4dEZpdmVJdGVtXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0T2ZSYW5nZSA9IFtwcmV2Rml2ZUl0ZW0sIC4uLmdlbmVyYXRlUGFnZShsYXN0IC0gNCwgbGFzdCAtIDEpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLmZpcnN0UGFnZUl0ZW0sIC4uLmxpc3RPZlJhbmdlLCAuLi5sYXN0UGFnZUl0ZW1dO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBjb25jYXRXaXRoUHJldk5leHQoZ2VuZXJhdGVSYW5nZUl0ZW0ocGFnZUluZGV4LCBsYXN0SW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBwYWdlSW5kZXgsIHBhZ2VTaXplLCB0b3RhbCB9ID0gY2hhbmdlcztcbiAgICBpZiAocGFnZUluZGV4IHx8IHBhZ2VTaXplIHx8IHRvdGFsKSB7XG4gICAgICB0aGlzLnJhbmdlcyA9IFsodGhpcy5wYWdlSW5kZXggLSAxKSAqIHRoaXMucGFnZVNpemUgKyAxLCBNYXRoLm1pbih0aGlzLnBhZ2VJbmRleCAqIHRoaXMucGFnZVNpemUsIHRoaXMudG90YWwpXTtcbiAgICAgIHRoaXMuYnVpbGRJbmRleGVzKCk7XG4gICAgfVxuICB9XG59XG4iXX0=