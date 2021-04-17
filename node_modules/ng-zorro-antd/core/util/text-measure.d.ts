export interface MeasureResult {
    finished: boolean;
    node: Node | null;
}
export declare function pxToNumber(value: string | null): number;
export declare function measure(originEle: HTMLElement, rows: number, contentNodes: Node[], fixedContent: HTMLElement[], ellipsisStr: string, suffixStr?: string): {
    contentNodes: Node[];
    text: string;
    ellipsis: boolean;
};
