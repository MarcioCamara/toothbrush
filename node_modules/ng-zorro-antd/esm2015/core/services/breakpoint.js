/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { NzResizeService } from './resize';
import * as i0 from "@angular/core";
import * as i1 from "./resize";
import * as i2 from "@angular/cdk/layout";
export var NzBreakpointEnum;
(function (NzBreakpointEnum) {
    NzBreakpointEnum["xxl"] = "xxl";
    NzBreakpointEnum["xl"] = "xl";
    NzBreakpointEnum["lg"] = "lg";
    NzBreakpointEnum["md"] = "md";
    NzBreakpointEnum["sm"] = "sm";
    NzBreakpointEnum["xs"] = "xs";
})(NzBreakpointEnum || (NzBreakpointEnum = {}));
export const gridResponsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
export const siderResponsiveMap = {
    xs: '(max-width: 479.98px)',
    sm: '(max-width: 575.98px)',
    md: '(max-width: 767.98px)',
    lg: '(max-width: 991.98px)',
    xl: '(max-width: 1199.98px)',
    xxl: '(max-width: 1599.98px)'
};
export class NzBreakpointService {
    constructor(resizeService, mediaMatcher) {
        this.resizeService = resizeService;
        this.mediaMatcher = mediaMatcher;
        this.resizeService.subscribe().subscribe(() => { });
    }
    subscribe(breakpointMap, fullMap) {
        if (fullMap) {
            const get = () => this.matchMedia(breakpointMap, true);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged((x, y) => x[0] === y[0]), map(x => x[1]));
        }
        else {
            const get = () => this.matchMedia(breakpointMap);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
        }
    }
    matchMedia(breakpointMap, fullMap) {
        let bp = NzBreakpointEnum.md;
        const breakpointBooleanMap = {};
        Object.keys(breakpointMap).map(breakpoint => {
            const castBP = breakpoint;
            const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
            breakpointBooleanMap[breakpoint] = matched;
            if (matched) {
                bp = castBP;
            }
        });
        if (fullMap) {
            return [bp, breakpointBooleanMap];
        }
        else {
            return bp;
        }
    }
}
NzBreakpointService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzBreakpointService_Factory() { return new NzBreakpointService(i0.ɵɵinject(i1.NzResizeService), i0.ɵɵinject(i2.MediaMatcher)); }, token: NzBreakpointService, providedIn: "root" });
NzBreakpointService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzBreakpointService.ctorParameters = () => [
    { type: NzResizeService },
    { type: MediaMatcher }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29yZS9zZXJ2aWNlcy9icmVha3BvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUUzQyxNQUFNLENBQU4sSUFBWSxnQkFPWDtBQVBELFdBQVksZ0JBQWdCO0lBQzFCLCtCQUFXLENBQUE7SUFDWCw2QkFBUyxDQUFBO0lBQ1QsNkJBQVMsQ0FBQTtJQUNULDZCQUFTLENBQUE7SUFDVCw2QkFBUyxDQUFBO0lBQ1QsNkJBQVMsQ0FBQTtBQUNYLENBQUMsRUFQVyxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBTzNCO0FBTUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQWtCO0lBQzlDLEVBQUUsRUFBRSxvQkFBb0I7SUFDeEIsRUFBRSxFQUFFLG9CQUFvQjtJQUN4QixFQUFFLEVBQUUsb0JBQW9CO0lBQ3hCLEVBQUUsRUFBRSxvQkFBb0I7SUFDeEIsRUFBRSxFQUFFLHFCQUFxQjtJQUN6QixHQUFHLEVBQUUscUJBQXFCO0NBQzNCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBa0I7SUFDL0MsRUFBRSxFQUFFLHVCQUF1QjtJQUMzQixFQUFFLEVBQUUsdUJBQXVCO0lBQzNCLEVBQUUsRUFBRSx1QkFBdUI7SUFDM0IsRUFBRSxFQUFFLHVCQUF1QjtJQUMzQixFQUFFLEVBQUUsd0JBQXdCO0lBQzVCLEdBQUcsRUFBRSx3QkFBd0I7Q0FDOUIsQ0FBQztBQUtGLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBb0IsYUFBOEIsRUFBVSxZQUEwQjtRQUFsRSxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNwRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBSUQsU0FBUyxDQUFDLGFBQTRCLEVBQUUsT0FBYztRQUNwRCxJQUFJLE9BQU8sRUFBRTtZQUNYLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDUixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsRUFDaEIsb0JBQW9CLENBQUMsQ0FBQyxDQUEyQyxFQUFFLENBQTJDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztTQUNoRztJQUNILENBQUM7SUFJTyxVQUFVLENBQUMsYUFBNEIsRUFBRSxPQUFjO1FBQzdELElBQUksRUFBRSxHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztRQUU3QixNQUFNLG9CQUFvQixHQUFrQyxFQUFFLENBQUM7UUFFL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUMsTUFBTSxNQUFNLEdBQUcsVUFBOEIsQ0FBQztZQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUVoRixvQkFBb0IsQ0FBQyxVQUE4QixDQUFDLEdBQUcsT0FBTyxDQUFDO1lBRS9ELElBQUksT0FBTyxFQUFFO2dCQUNYLEVBQUUsR0FBRyxNQUFNLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLENBQUMsRUFBRSxFQUFFLG9CQUE0QyxDQUFDLENBQUM7U0FDM0Q7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDOzs7O1lBaERGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBbkNRLGVBQWU7WUFMZixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56UmVzaXplU2VydmljZSB9IGZyb20gJy4vcmVzaXplJztcblxuZXhwb3J0IGVudW0gTnpCcmVha3BvaW50RW51bSB7XG4gIHh4bCA9ICd4eGwnLFxuICB4bCA9ICd4bCcsXG4gIGxnID0gJ2xnJyxcbiAgbWQgPSAnbWQnLFxuICBzbSA9ICdzbScsXG4gIHhzID0gJ3hzJ1xufVxuXG5leHBvcnQgdHlwZSBCcmVha3BvaW50TWFwID0geyBba2V5IGluIE56QnJlYWtwb2ludEVudW1dOiBzdHJpbmcgfTtcbmV4cG9ydCB0eXBlIEJyZWFrcG9pbnRCb29sZWFuTWFwID0geyBba2V5IGluIE56QnJlYWtwb2ludEVudW1dOiBib29sZWFuIH07XG5leHBvcnQgdHlwZSBOekJyZWFrcG9pbnRLZXkgPSBrZXlvZiB0eXBlb2YgTnpCcmVha3BvaW50RW51bTtcblxuZXhwb3J0IGNvbnN0IGdyaWRSZXNwb25zaXZlTWFwOiBCcmVha3BvaW50TWFwID0ge1xuICB4czogJyhtYXgtd2lkdGg6IDU3NXB4KScsXG4gIHNtOiAnKG1pbi13aWR0aDogNTc2cHgpJyxcbiAgbWQ6ICcobWluLXdpZHRoOiA3NjhweCknLFxuICBsZzogJyhtaW4td2lkdGg6IDk5MnB4KScsXG4gIHhsOiAnKG1pbi13aWR0aDogMTIwMHB4KScsXG4gIHh4bDogJyhtaW4td2lkdGg6IDE2MDBweCknXG59O1xuXG5leHBvcnQgY29uc3Qgc2lkZXJSZXNwb25zaXZlTWFwOiBCcmVha3BvaW50TWFwID0ge1xuICB4czogJyhtYXgtd2lkdGg6IDQ3OS45OHB4KScsXG4gIHNtOiAnKG1heC13aWR0aDogNTc1Ljk4cHgpJyxcbiAgbWQ6ICcobWF4LXdpZHRoOiA3NjcuOThweCknLFxuICBsZzogJyhtYXgtd2lkdGg6IDk5MS45OHB4KScsXG4gIHhsOiAnKG1heC13aWR0aDogMTE5OS45OHB4KScsXG4gIHh4bDogJyhtYXgtd2lkdGg6IDE1OTkuOThweCknXG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekJyZWFrcG9pbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBOelJlc2l6ZVNlcnZpY2UsIHByaXZhdGUgbWVkaWFNYXRjaGVyOiBNZWRpYU1hdGNoZXIpIHtcbiAgICB0aGlzLnJlc2l6ZVNlcnZpY2Uuc3Vic2NyaWJlKCkuc3Vic2NyaWJlKCgpID0+IHt9KTtcbiAgfVxuXG4gIHN1YnNjcmliZShicmVha3BvaW50TWFwOiBCcmVha3BvaW50TWFwKTogT2JzZXJ2YWJsZTxOekJyZWFrcG9pbnRFbnVtPjtcbiAgc3Vic2NyaWJlKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXAsIGZ1bGxNYXA6IHRydWUpOiBPYnNlcnZhYmxlPEJyZWFrcG9pbnRCb29sZWFuTWFwPjtcbiAgc3Vic2NyaWJlKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXAsIGZ1bGxNYXA/OiB0cnVlKTogT2JzZXJ2YWJsZTxOekJyZWFrcG9pbnRFbnVtIHwgQnJlYWtwb2ludEJvb2xlYW5NYXA+IHtcbiAgICBpZiAoZnVsbE1hcCkge1xuICAgICAgY29uc3QgZ2V0ID0gKCkgPT4gdGhpcy5tYXRjaE1lZGlhKGJyZWFrcG9pbnRNYXAsIHRydWUpO1xuICAgICAgcmV0dXJuIHRoaXMucmVzaXplU2VydmljZS5zdWJzY3JpYmUoKS5waXBlKFxuICAgICAgICBtYXAoZ2V0KSxcbiAgICAgICAgc3RhcnRXaXRoKGdldCgpKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHg6IFtOekJyZWFrcG9pbnRFbnVtLCBCcmVha3BvaW50Qm9vbGVhbk1hcF0sIHk6IFtOekJyZWFrcG9pbnRFbnVtLCBCcmVha3BvaW50Qm9vbGVhbk1hcF0pID0+IHhbMF0gPT09IHlbMF0pLFxuICAgICAgICBtYXAoeCA9PiB4WzFdKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2V0ID0gKCkgPT4gdGhpcy5tYXRjaE1lZGlhKGJyZWFrcG9pbnRNYXApO1xuICAgICAgcmV0dXJuIHRoaXMucmVzaXplU2VydmljZS5zdWJzY3JpYmUoKS5waXBlKG1hcChnZXQpLCBzdGFydFdpdGgoZ2V0KCkpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1hdGNoTWVkaWEoYnJlYWtwb2ludE1hcDogQnJlYWtwb2ludE1hcCk6IE56QnJlYWtwb2ludEVudW07XG4gIHByaXZhdGUgbWF0Y2hNZWRpYShicmVha3BvaW50TWFwOiBCcmVha3BvaW50TWFwLCBmdWxsTWFwOiB0cnVlKTogW056QnJlYWtwb2ludEVudW0sIEJyZWFrcG9pbnRCb29sZWFuTWFwXTtcbiAgcHJpdmF0ZSBtYXRjaE1lZGlhKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXAsIGZ1bGxNYXA/OiB0cnVlKTogTnpCcmVha3BvaW50RW51bSB8IFtOekJyZWFrcG9pbnRFbnVtLCBCcmVha3BvaW50Qm9vbGVhbk1hcF0ge1xuICAgIGxldCBicCA9IE56QnJlYWtwb2ludEVudW0ubWQ7XG5cbiAgICBjb25zdCBicmVha3BvaW50Qm9vbGVhbk1hcDogUGFydGlhbDxCcmVha3BvaW50Qm9vbGVhbk1hcD4gPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKGJyZWFrcG9pbnRNYXApLm1hcChicmVha3BvaW50ID0+IHtcbiAgICAgIGNvbnN0IGNhc3RCUCA9IGJyZWFrcG9pbnQgYXMgTnpCcmVha3BvaW50RW51bTtcbiAgICAgIGNvbnN0IG1hdGNoZWQgPSB0aGlzLm1lZGlhTWF0Y2hlci5tYXRjaE1lZGlhKGdyaWRSZXNwb25zaXZlTWFwW2Nhc3RCUF0pLm1hdGNoZXM7XG5cbiAgICAgIGJyZWFrcG9pbnRCb29sZWFuTWFwW2JyZWFrcG9pbnQgYXMgTnpCcmVha3BvaW50RW51bV0gPSBtYXRjaGVkO1xuXG4gICAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICBicCA9IGNhc3RCUDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChmdWxsTWFwKSB7XG4gICAgICByZXR1cm4gW2JwLCBicmVha3BvaW50Qm9vbGVhbk1hcCBhcyBCcmVha3BvaW50Qm9vbGVhbk1hcF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBicDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==