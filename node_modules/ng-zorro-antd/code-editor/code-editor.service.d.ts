/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { JoinedEditorOptions } from './typings';
export declare class NzCodeEditorService {
    private readonly nzConfigService;
    private document;
    private firstEditorInitialized;
    private loaded$;
    private loadingStatus;
    private option;
    private config;
    option$: BehaviorSubject<JoinedEditorOptions>;
    constructor(nzConfigService: NzConfigService, _document: NzSafeAny);
    private _updateDefaultOption;
    requestToInit(): Observable<JoinedEditorOptions>;
    private loadMonacoScript;
    private onLoad;
    private onInit;
    private getLatestOption;
}
