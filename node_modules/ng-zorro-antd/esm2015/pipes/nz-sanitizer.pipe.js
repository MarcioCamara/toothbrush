/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class NzSanitizerPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type = 'html') {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified`);
        }
    }
}
NzSanitizerPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzSanitizer'
            },] }
];
NzSanitizerPipe.ctorParameters = () => [
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc2FuaXRpemVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BpcGVzL256LXNhbml0aXplci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQWlELE1BQU0sMkJBQTJCLENBQUM7QUFReEcsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBc0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFLakQsU0FBUyxDQUFDLEtBQWdCLEVBQUUsT0FBeUIsTUFBTTtRQUN6RCxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssTUFBTTtnQkFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsS0FBSyxPQUFPO2dCQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELEtBQUssYUFBYTtnQkFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlEO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7OztZQXRCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLGFBQWE7YUFDcEI7OztZQVBRLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sLCBTYWZlUmVzb3VyY2VVcmwsIFNhZmVTdHlsZSwgU2FmZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxudHlwZSBEb21TYW5pdGl6ZXJUeXBlID0gJ2h0bWwnIHwgJ3N0eWxlJyB8ICd1cmwnIHwgJ3Jlc291cmNlVXJsJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbnpTYW5pdGl6ZXInXG59KVxuZXhwb3J0IGNsYXNzIE56U2FuaXRpemVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogTnpTYWZlQW55LCB0eXBlOiAnaHRtbCcpOiBTYWZlSHRtbDtcbiAgdHJhbnNmb3JtKHZhbHVlOiBOelNhZmVBbnksIHR5cGU6ICdzdHlsZScpOiBTYWZlU3R5bGU7XG4gIHRyYW5zZm9ybSh2YWx1ZTogTnpTYWZlQW55LCB0eXBlOiAndXJsJyk6IFNhZmVVcmw7XG4gIHRyYW5zZm9ybSh2YWx1ZTogTnpTYWZlQW55LCB0eXBlOiAncmVzb3VyY2VVcmwnKTogU2FmZVJlc291cmNlVXJsO1xuICB0cmFuc2Zvcm0odmFsdWU6IE56U2FmZUFueSwgdHlwZTogRG9tU2FuaXRpemVyVHlwZSA9ICdodG1sJyk6IFNhZmVIdG1sIHwgU2FmZVN0eWxlIHwgU2FmZVVybCB8IFNhZmVSZXNvdXJjZVVybCB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlKTtcbiAgICAgIGNhc2UgJ3N0eWxlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZSk7XG4gICAgICBjYXNlICd1cmwnOlxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh2YWx1ZSk7XG4gICAgICBjYXNlICdyZXNvdXJjZVVybCc6XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNhZmUgdHlwZSBzcGVjaWZpZWRgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==