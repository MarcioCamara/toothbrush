import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ReplaySubject, Subject } from 'rxjs';
export declare class NzRadioService {
    selected$: ReplaySubject<any>;
    touched$: Subject<void>;
    disabled$: ReplaySubject<boolean>;
    name$: ReplaySubject<string>;
    touch(): void;
    select(value: NzSafeAny): void;
    setDisabled(value: boolean): void;
    setName(value: string): void;
}
