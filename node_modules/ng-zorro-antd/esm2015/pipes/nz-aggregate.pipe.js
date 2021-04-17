/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
import { sum } from 'ng-zorro-antd/core/util';
export class NzAggregatePipe {
    transform(value, method) {
        if (!Array.isArray(value)) {
            return value;
        }
        if (value.length === 0) {
            return undefined;
        }
        switch (method) {
            case 'sum':
                return sum(value);
            case 'avg':
                return sum(value) / value.length;
            case 'max':
                return Math.max(...value);
            case 'min':
                return Math.min(...value);
            default:
                throw Error(`Invalid Pipe Arguments: Aggregate pipe doesn't support this type`);
        }
    }
}
NzAggregatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzAggregate'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotYWdncmVnYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BpcGVzL256LWFnZ3JlZ2F0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQU85QyxNQUFNLE9BQU8sZUFBZTtJQUMxQixTQUFTLENBQUMsS0FBZSxFQUFFLE1BQXVCO1FBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsS0FBSyxLQUFLO2dCQUNSLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDbkMsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQzVCLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUM1QjtnQkFDRSxNQUFNLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1NBQ25GO0lBQ0gsQ0FBQzs7O1lBekJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsYUFBYTthQUNwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHN1bSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuZXhwb3J0IHR5cGUgQWdncmVnYXRlTWV0aG9kID0gJ3N1bScgfCAnbWF4JyB8ICdtaW4nIHwgJ2F2Zyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ256QWdncmVnYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBOekFnZ3JlZ2F0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXJbXSwgbWV0aG9kOiBBZ2dyZWdhdGVNZXRob2QpOiB1bmRlZmluZWQgfCBudW1iZXIge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdzdW0nOlxuICAgICAgICByZXR1cm4gc3VtKHZhbHVlKTtcbiAgICAgIGNhc2UgJ2F2Zyc6XG4gICAgICAgIHJldHVybiBzdW0odmFsdWUpIC8gdmFsdWUubGVuZ3RoO1xuICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLnZhbHVlKTtcbiAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgIHJldHVybiBNYXRoLm1pbiguLi52YWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBQaXBlIEFyZ3VtZW50czogQWdncmVnYXRlIHBpcGUgZG9lc24ndCBzdXBwb3J0IHRoaXMgdHlwZWApO1xuICAgIH1cbiAgfVxufVxuIl19