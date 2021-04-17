/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { Directive, ElementRef, Host, Input, Optional, Renderer2 } from '@angular/core';
import { isNotNil } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzRowDirective } from './row.directive';
export class NzColDirective {
    constructor(elementRef, nzRowDirective, renderer, directionality) {
        this.elementRef = elementRef;
        this.nzRowDirective = nzRowDirective;
        this.renderer = renderer;
        this.directionality = directionality;
        this.classMap = {};
        this.destroy$ = new Subject();
        this.hostFlexStyle = null;
        this.dir = 'ltr';
        this.nzFlex = null;
        this.nzSpan = null;
        this.nzOrder = null;
        this.nzOffset = null;
        this.nzPush = null;
        this.nzPull = null;
        this.nzXs = null;
        this.nzSm = null;
        this.nzMd = null;
        this.nzLg = null;
        this.nzXl = null;
        this.nzXXl = null;
    }
    setHostClassMap() {
        const hostClassMap = Object.assign({ ['ant-col']: true, [`ant-col-${this.nzSpan}`]: isNotNil(this.nzSpan), [`ant-col-order-${this.nzOrder}`]: isNotNil(this.nzOrder), [`ant-col-offset-${this.nzOffset}`]: isNotNil(this.nzOffset), [`ant-col-pull-${this.nzPull}`]: isNotNil(this.nzPull), [`ant-col-push-${this.nzPush}`]: isNotNil(this.nzPush), ['ant-col-rtl']: this.dir === 'rtl' }, this.generateClass());
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i)) {
                this.renderer.removeClass(this.elementRef.nativeElement, i);
            }
        }
        this.classMap = Object.assign({}, hostClassMap);
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
                this.renderer.addClass(this.elementRef.nativeElement, i);
            }
        }
    }
    setHostFlexStyle() {
        this.hostFlexStyle = this.parseFlex(this.nzFlex);
    }
    parseFlex(flex) {
        if (typeof flex === 'number') {
            return `${flex} ${flex} auto`;
        }
        else if (typeof flex === 'string') {
            if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
                return `0 0 ${flex}`;
            }
        }
        return flex;
    }
    generateClass() {
        const listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
        const listClassMap = {};
        listOfSizeInputName.forEach(name => {
            const sizeName = name.replace('nz', '').toLowerCase();
            if (isNotNil(this[name])) {
                if (typeof this[name] === 'number' || typeof this[name] === 'string') {
                    listClassMap[`ant-col-${sizeName}-${this[name]}`] = true;
                }
                else {
                    const embedded = this[name];
                    const prefixArray = ['span', 'pull', 'push', 'offset', 'order'];
                    prefixArray.forEach(prefix => {
                        const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
                        listClassMap[`ant-col-${sizeName}${prefixClass}${embedded[prefix]}`] = embedded && isNotNil(embedded[prefix]);
                    });
                }
            }
        });
        return listClassMap;
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.setHostClassMap();
        });
        this.setHostClassMap();
        this.setHostFlexStyle();
    }
    ngOnChanges(changes) {
        this.setHostClassMap();
        const { nzFlex } = changes;
        if (nzFlex) {
            this.setHostFlexStyle();
        }
    }
    ngAfterViewInit() {
        if (this.nzRowDirective) {
            this.nzRowDirective.actualGutter$.pipe(takeUntil(this.destroy$)).subscribe(([horizontalGutter, verticalGutter]) => {
                const renderGutter = (name, gutter) => {
                    const nativeElement = this.elementRef.nativeElement;
                    if (gutter !== null) {
                        this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
                    }
                };
                renderGutter('padding-left', horizontalGutter);
                renderGutter('padding-right', horizontalGutter);
                renderGutter('padding-top', verticalGutter);
                renderGutter('padding-bottom', verticalGutter);
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzColDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
                exportAs: 'nzCol',
                host: {
                    '[style.flex]': 'hostFlexStyle'
                }
            },] }
];
NzColDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NzRowDirective, decorators: [{ type: Optional }, { type: Host }] },
    { type: Renderer2 },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzColDirective.propDecorators = {
    nzFlex: [{ type: Input }],
    nzSpan: [{ type: Input }],
    nzOrder: [{ type: Input }],
    nzOffset: [{ type: Input }],
    nzPush: [{ type: Input }],
    nzPull: [{ type: Input }],
    nzXs: [{ type: Input }],
    nzSm: [{ type: Input }],
    nzMd: [{ type: Input }],
    nzLg: [{ type: Input }],
    nzXl: [{ type: Input }],
    nzXXl: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9jb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixJQUFJLEVBQ0osS0FBSyxFQUlMLFFBQVEsRUFDUixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWlCakQsTUFBTSxPQUFPLGNBQWM7SUE4RXpCLFlBQ1UsVUFBc0IsRUFDSCxjQUE4QixFQUNsRCxRQUFtQixFQUNOLGNBQThCO1FBSDFDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDSCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNOLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWpGNUMsYUFBUSxHQUErQixFQUFFLENBQUM7UUFDMUMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBQ3BDLFFBQUcsR0FBYyxLQUFLLENBQUM7UUFDZCxXQUFNLEdBQTJCLElBQUksQ0FBQztRQUN0QyxXQUFNLEdBQTJCLElBQUksQ0FBQztRQUN0QyxZQUFPLEdBQTJCLElBQUksQ0FBQztRQUN2QyxhQUFRLEdBQTJCLElBQUksQ0FBQztRQUN4QyxXQUFNLEdBQTJCLElBQUksQ0FBQztRQUN0QyxXQUFNLEdBQTJCLElB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RUFBRSxjQUFjLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBbklGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0NBQStDO2dCQUN6RCxRQUFRLEVBQUUsT0FBTztnQkFDakIsSUFBSSxFQUFFO29CQUNKLGNBQWMsRUFBRSxlQUFlO2lCQUNoQzthQUNGOzs7WUE5QkMsVUFBVTtZQWNILGNBQWMsdUJBaUdsQixRQUFRLFlBQUksSUFBSTtZQXhHbkIsU0FBUztZQVhTLGNBQWMsdUJBcUg3QixRQUFROzs7cUJBN0VWLEtBQUs7cUJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NsYXNzSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpSb3dEaXJlY3RpdmUgfSBmcm9tICcuL3Jvdy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVtYmVkZGVkUHJvcGVydHkge1xuICBzcGFuPzogbnVtYmVyO1xuICBwdWxsPzogbnVtYmVyO1xuICBwdXNoPzogbnVtYmVyO1xuICBvZmZzZXQ/OiBudW1iZXI7XG4gIG9yZGVyPzogbnVtYmVyO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotY29sXSxuei1jb2wsbnotZm9ybS1jb250cm9sLG56LWZvcm0tbGFiZWwnLFxuICBleHBvcnRBczogJ256Q29sJyxcbiAgaG9zdDoge1xuICAgICdbc3R5bGUuZmxleF0nOiAnaG9zdEZsZXhTdHlsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGNsYXNzTWFwOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgaG9zdEZsZXhTdHlsZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG4gIEBJbnB1dCgpIG56RmxleDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56U3Bhbjogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56T3JkZXI6IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuek9mZnNldDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56UHVzaDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56UHVsbDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56WHM6IHN0cmluZyB8IG51bWJlciB8IEVtYmVkZGVkUHJvcGVydHkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpTbTogc3RyaW5nIHwgbnVtYmVyIHwgRW1iZWRkZWRQcm9wZXJ0eSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuek1kOiBzdHJpbmcgfCBudW1iZXIgfCBFbWJlZGRlZFByb3BlcnR5IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56TGc6IHN0cmluZyB8IG51bWJlciB8IEVtYmVkZGVkUHJvcGVydHkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpYbDogc3RyaW5nIHwgbnVtYmVyIHwgRW1iZWRkZWRQcm9wZXJ0eSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelhYbDogc3RyaW5nIHwgbnVtYmVyIHwgRW1iZWRkZWRQcm9wZXJ0eSB8IG51bGwgPSBudWxsO1xuXG4gIHNldEhvc3RDbGFzc01hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBob3N0Q2xhc3NNYXAgPSB7XG4gICAgICBbJ2FudC1jb2wnXTogdHJ1ZSxcbiAgICAgIFtgYW50LWNvbC0ke3RoaXMubnpTcGFufWBdOiBpc05vdE5pbCh0aGlzLm56U3BhbiksXG4gICAgICBbYGFudC1jb2wtb3JkZXItJHt0aGlzLm56T3JkZXJ9YF06IGlzTm90TmlsKHRoaXMubnpPcmRlciksXG4gICAgICBbYGFudC1jb2wtb2Zmc2V0LSR7dGhpcy5uek9mZnNldH1gXTogaXNOb3ROaWwodGhpcy5uek9mZnNldCksXG4gICAgICBbYGFudC1jb2wtcHVsbC0ke3RoaXMubnpQdWxsfWBdOiBpc05vdE5pbCh0aGlzLm56UHVsbCksXG4gICAgICBbYGFudC1jb2wtcHVzaC0ke3RoaXMubnpQdXNofWBdOiBpc05vdE5pbCh0aGlzLm56UHVzaCksXG4gICAgICBbJ2FudC1jb2wtcnRsJ106IHRoaXMuZGlyID09PSAncnRsJyxcbiAgICAgIC4uLnRoaXMuZ2VuZXJhdGVDbGFzcygpXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5jbGFzc01hcCkge1xuICAgICAgaWYgKHRoaXMuY2xhc3NNYXAuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgaSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2xhc3NNYXAgPSB7IC4uLmhvc3RDbGFzc01hcCB9O1xuICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmNsYXNzTWFwKSB7XG4gICAgICBpZiAodGhpcy5jbGFzc01hcC5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmNsYXNzTWFwW2ldKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldEhvc3RGbGV4U3R5bGUoKTogdm9pZCB7XG4gICAgdGhpcy5ob3N0RmxleFN0eWxlID0gdGhpcy5wYXJzZUZsZXgodGhpcy5uekZsZXgpO1xuICB9XG5cbiAgcGFyc2VGbGV4KGZsZXg6IG51bWJlciB8IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodHlwZW9mIGZsZXggPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gYCR7ZmxleH0gJHtmbGV4fSBhdXRvYDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmbGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKC9eXFxkKyhcXC5cXGQrKT8ocHh8ZW18cmVtfCUpJC8udGVzdChmbGV4KSkge1xuICAgICAgICByZXR1cm4gYDAgMCAke2ZsZXh9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZsZXg7XG4gIH1cblxuICBnZW5lcmF0ZUNsYXNzKCk6IG9iamVjdCB7XG4gICAgY29uc3QgbGlzdE9mU2l6ZUlucHV0TmFtZTogQXJyYXk8a2V5b2YgTnpDb2xEaXJlY3RpdmU+ID0gWyduelhzJywgJ256U20nLCAnbnpNZCcsICduekxnJywgJ256WGwnLCAnbnpYWGwnXTtcbiAgICBjb25zdCBsaXN0Q2xhc3NNYXA6IE5nQ2xhc3NJbnRlcmZhY2UgPSB7fTtcbiAgICBsaXN0T2ZTaXplSW5wdXROYW1lLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICBjb25zdCBzaXplTmFtZSA9IG5hbWUucmVwbGFjZSgnbnonLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChpc05vdE5pbCh0aGlzW25hbWVdKSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNbbmFtZV0gPT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzW25hbWVdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGxpc3RDbGFzc01hcFtgYW50LWNvbC0ke3NpemVOYW1lfS0ke3RoaXNbbmFtZV19YF0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGVtYmVkZGVkID0gdGhpc1tuYW1lXSBhcyBFbWJlZGRlZFByb3BlcnR5O1xuICAgICAgICAgIGNvbnN0IHByZWZpeEFycmF5OiBBcnJheTxrZXlvZiBFbWJlZGRlZFByb3BlcnR5PiA9IFsnc3BhbicsICdwdWxsJywgJ3B1c2gnLCAnb2Zmc2V0JywgJ29yZGVyJ107XG4gICAgICAgICAgcHJlZml4QXJyYXkuZm9yRWFjaChwcmVmaXggPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlZml4Q2xhc3MgPSBwcmVmaXggPT09ICdzcGFuJyA/ICctJyA6IGAtJHtwcmVmaXh9LWA7XG4gICAgICAgICAgICBsaXN0Q2xhc3NNYXBbYGFudC1jb2wtJHtzaXplTmFtZX0ke3ByZWZpeENsYXNzfSR7ZW1iZWRkZWRbcHJlZml4XX1gXSA9IGVtYmVkZGVkICYmIGlzTm90TmlsKGVtYmVkZGVkW3ByZWZpeF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGxpc3RDbGFzc01hcDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHB1YmxpYyBuelJvd0RpcmVjdGl2ZTogTnpSb3dEaXJlY3RpdmUsXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLnNldEhvc3RDbGFzc01hcCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRIb3N0Q2xhc3NNYXAoKTtcbiAgICB0aGlzLnNldEhvc3RGbGV4U3R5bGUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnNldEhvc3RDbGFzc01hcCgpO1xuICAgIGNvbnN0IHsgbnpGbGV4IH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuekZsZXgpIHtcbiAgICAgIHRoaXMuc2V0SG9zdEZsZXhTdHlsZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uelJvd0RpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5uelJvd0RpcmVjdGl2ZS5hY3R1YWxHdXR0ZXIkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKFtob3Jpem9udGFsR3V0dGVyLCB2ZXJ0aWNhbEd1dHRlcl0pID0+IHtcbiAgICAgICAgY29uc3QgcmVuZGVyR3V0dGVyID0gKG5hbWU6IHN0cmluZywgZ3V0dGVyOiBudW1iZXIgfCBudWxsKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGlmIChndXR0ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxlbWVudCwgbmFtZSwgYCR7Z3V0dGVyIC8gMn1weGApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVuZGVyR3V0dGVyKCdwYWRkaW5nLWxlZnQnLCBob3Jpem9udGFsR3V0dGVyKTtcbiAgICAgICAgcmVuZGVyR3V0dGVyKCdwYWRkaW5nLXJpZ2h0JywgaG9yaXpvbnRhbEd1dHRlcik7XG4gICAgICAgIHJlbmRlckd1dHRlcigncGFkZGluZy10b3AnLCB2ZXJ0aWNhbEd1dHRlcik7XG4gICAgICAgIHJlbmRlckd1dHRlcigncGFkZGluZy1ib3R0b20nLCB2ZXJ0aWNhbEd1dHRlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==