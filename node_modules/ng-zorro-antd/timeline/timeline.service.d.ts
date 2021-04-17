import { ReplaySubject } from 'rxjs';
export declare class TimelineService {
    check$: ReplaySubject<unknown>;
    markForCheck(): void;
}
