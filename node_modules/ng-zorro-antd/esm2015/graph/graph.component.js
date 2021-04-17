/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, QueryList, TemplateRef, ViewChildren, ViewEncapsulation } from '@angular/core';
import { buildGraph } from 'dagre-compound';
import { forkJoin, ReplaySubject, Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { calculateTransform } from './core/utils';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { cancelRequestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzGraphData } from './data-source/graph-data-source';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphGroupNodeDirective } from './graph-group-node.directive';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphZoomDirective } from './graph-zoom.directive';
import { nzTypeDefinition, NZ_GRAPH_LAYOUT_SETTING } from './interface';
/** Checks whether an object is a data source. */
export function isDataSource(value) {
    // Check if the value is a DataSource by observing if it has a connect function. Cannot
    // be checked as an `instanceof DataSource` since people could create their own sources
    // that match the interface, but don't extend DataSource.
    return value && typeof value.connect === 'function';
}
export class NzGraphComponent {
    constructor(cdr, elementRef, noAnimation, nzGraphZoom) {
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.noAnimation = noAnimation;
        this.nzGraphZoom = nzGraphZoom;
        this.nzRankDirection = 'LR';
        this.nzAutoSize = false;
        this.nzGraphInitialized = new EventEmitter();
        this.nzGraphRendered = new EventEmitter();
        this.nzNodeClick = new EventEmitter();
        this.requestId = -1;
        this.transformStyle = '';
        this.graphRenderedSubject$ = new ReplaySubject(1);
        this.renderInfo = { labelHeight: 0 };
        this.mapOfNodeAttr = {};
        this.mapOfEdgeAttr = {};
        this.zoom = 1;
        this.typedNodes = nzTypeDefinition();
        this.layoutSetting = NZ_GRAPH_LAYOUT_SETTING;
        this.destroy$ = new Subject();
        this.nodeTrackByFun = (_, node) => node.name;
        this.edgeTrackByFun = (_, edge) => `${edge.v}-${edge.w}`;
        this.subGraphTransform = (node) => {
            const x = node.x - node.coreBox.width / 2.0;
            const y = node.y - node.height / 2.0 + node.paddingTop;
            return `translate(${x}, ${y})`;
        };
        this.coreTransform = (node) => {
            return `translate(0, ${node.parentNodeName ? node.labelHeight : 0})`;
        };
    }
    ngOnInit() {
        this.graphRenderedSubject$.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            // Only zooming is not set, move graph to center
            if (!this.nzGraphZoom) {
                this.fitCenter();
            }
            this.nzGraphInitialized.emit(this);
        });
    }
    ngOnChanges(changes) {
        const { nzAutoFit, nzRankDirection, nzGraphData, nzGraphLayoutConfig } = changes;
        if (nzGraphLayoutConfig) {
            this.layoutSetting = this.mergeConfig(nzGraphLayoutConfig.currentValue);
            // Object.assign(this.layoutSetting, this.nzGraphLayoutSetting || {});
        }
        if (nzGraphData) {
            if (this.dataSource !== this.nzGraphData) {
                this._switchDataSource(this.nzGraphData);
            }
        }
        if ((nzAutoFit && !nzAutoFit.firstChange) || (nzRankDirection && !nzRankDirection.firstChange)) {
            // Render graph
            if (this.dataSource.dataSource) {
                this.drawGraph(this.dataSource.dataSource, {
                    rankDirection: this.nzRankDirection,
                    expanded: this.dataSource.expansionModel.selected || []
                }).then(() => {
                    this.cdr.markForCheck();
                });
            }
        }
        this.cdr.markForCheck();
    }
    ngAfterViewInit() { }
    ngAfterContentChecked() {
        if (this.dataSource && !this._dataSubscription) {
            this.observeRenderChanges();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
            this.dataSource.disconnect();
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        cancelRequestAnimationFrame(this.requestId);
    }
    /**
     * Emit event
     */
    clickNode(node) {
        this.nzNodeClick.emit(node);
    }
    /**
     * Move graph to center and scale automatically
     */
    fitCenter() {
        const { x, y, k } = calculateTransform(this.elementRef.nativeElement.querySelector('svg'), this.elementRef.nativeElement.querySelector('svg > g'));
        if (k) {
            this.zoom = k;
            this.transformStyle = `translate(${x}, ${y})scale(${k})`;
        }
        this.cdr.markForCheck();
    }
    /**
     * re-Draw graph
     * @param data
     * @param options
     * @param needResize
     */
    drawGraph(data, options, needResize = false) {
        return new Promise(resolve => {
            this.requestId = requestAnimationFrame(() => {
                const renderInfo = this.buildGraphInfo(data, options);
                // TODO
                // Need better performance
                this.renderInfo = renderInfo;
                this.cdr.markForCheck();
                this.requestId = requestAnimationFrame(() => {
                    var _a;
                    this.drawNodes(!((_a = this.noAnimation) === null || _a === void 0 ? void 0 : _a.nzNoAnimation)).then(() => {
                        // Update element
                        this.cdr.markForCheck();
                        if (needResize) {
                            this.resizeNodeSize().then(() => {
                                const dataSource = this.dataSource.dataSource;
                                this.drawGraph(dataSource, options, false).then(() => resolve());
                            });
                        }
                        else {
                            this.graphRenderedSubject$.next();
                            this.nzGraphRendered.emit(this);
                            resolve();
                        }
                    });
                });
            });
            this.cdr.markForCheck();
        });
    }
    /**
     * Redraw all nodes
     * @param animate
     */
    drawNodes(animate = true) {
        return new Promise(resolve => {
            if (animate) {
                this.makeNodesAnimation().subscribe(() => {
                    resolve();
                });
            }
            else {
                this.listOfNodeComponent.map(node => {
                    node.makeNoAnimation();
                });
                resolve();
            }
        });
    }
    resizeNodeSize() {
        return new Promise(resolve => {
            var _a;
            const dataSource = this.dataSource.dataSource;
            let scale = ((_a = this.nzGraphZoom) === null || _a === void 0 ? void 0 : _a.nzZoom) || this.zoom || 1;
            this.listOfNodeElement.forEach(nodeEle => {
                var _a;
                const contentEle = nodeEle.nativeElement;
                if (contentEle) {
                    let width;
                    let height;
                    // Check if foreignObject is set
                    const clientRect = (_a = contentEle.querySelector('foreignObject > :first-child')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                    if (clientRect) {
                        width = clientRect.width;
                        height = clientRect.height;
                    }
                    else {
                        const bBoxRect = contentEle.getBBox();
                        width = bBoxRect.width;
                        height = bBoxRect.height;
                        // getBBox will return actual value
                        scale = 1;
                    }
                    // Element id type is string
                    const node = dataSource.nodes.find(n => `${n.id}` === nodeEle.nativeElement.id);
                    if (node && width && height) {
                        node.height = height / scale;
                        node.width = width / scale;
                    }
                }
            });
            resolve();
        });
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    _switchDataSource(dataSource) {
        if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
            this.nzGraphData.disconnect();
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        this.dataSource = dataSource;
        this.observeRenderChanges();
    }
    /** Set up a subscription for the data provided by the data source. */
    observeRenderChanges() {
        let dataStream;
        let graphOptions = {
            rankDirection: this.nzRankDirection
        };
        if (isDataSource(this.dataSource)) {
            dataStream = this.dataSource.connect();
        }
        if (dataStream) {
            this._dataSubscription = dataStream.pipe(takeUntil(this.destroy$)).subscribe(data => {
                graphOptions = {
                    rankDirection: this.nzRankDirection,
                    expanded: this.nzGraphData.expansionModel.selected
                };
                this.drawGraph(data, graphOptions, this.nzAutoSize).then(() => {
                    this.cdr.detectChanges();
                });
            });
        }
        else {
            throw Error(`A valid data source must be provided.`);
        }
    }
    /**
     * Get renderInfo and prepare some data
     * @param data
     * @param options
     * @private
     */
    buildGraphInfo(data, options) {
        this.parseInfo(data);
        const renderInfo = buildGraph(data, options, this.layoutSetting);
        const dig = (nodes) => {
            nodes.forEach(node => {
                if (node.type === 1 && this.mapOfNodeAttr.hasOwnProperty(node.name)) {
                    Object.assign(node, this.mapOfNodeAttr[node.name]);
                }
                else if (node.type === 0) {
                    node.edges.forEach(edge => {
                        if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
                            Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
                        }
                    });
                    dig(node.nodes);
                }
            });
        };
        dig(renderInfo.nodes);
        // Assign data to edges of root graph
        renderInfo.edges.forEach(edge => {
            if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
                Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
            }
        });
        return renderInfo;
    }
    /**
     * Play with animation
     * @private
     */
    makeNodesAnimation() {
        return forkJoin(...this.listOfNodeComponent.map(node => node.makeAnimation())).pipe(finalize(() => {
            this.cdr.detectChanges();
        }));
    }
    parseInfo(data) {
        data.nodes.forEach(n => {
            this.mapOfNodeAttr[n.id] = n;
        });
        data.edges.forEach(e => {
            this.mapOfEdgeAttr[`${e.v}-${e.w}`] = e;
        });
    }
    /**
     * Merge config with user inputs
     * @param config
     * @private
     */
    mergeConfig(config) {
        const graphMeta = (config === null || config === void 0 ? void 0 : config.layout) || {};
        const subSceneMeta = (config === null || config === void 0 ? void 0 : config.subScene) || {};
        const defaultNodeMeta = (config === null || config === void 0 ? void 0 : config.defaultNode) || {};
        const defaultCompoundNodeMeta = (config === null || config === void 0 ? void 0 : config.defaultCompoundNode) || {};
        const bridge = NZ_GRAPH_LAYOUT_SETTING.nodeSize.bridge;
        const graph = { meta: Object.assign(Object.assign({}, NZ_GRAPH_LAYOUT_SETTING.graph.meta), graphMeta) };
        const subScene = {
            meta: Object.assign(Object.assign({}, NZ_GRAPH_LAYOUT_SETTING.subScene.meta), subSceneMeta)
        };
        const nodeSize = {
            meta: Object.assign(Object.assign({}, NZ_GRAPH_LAYOUT_SETTING.nodeSize.meta), defaultCompoundNodeMeta),
            node: Object.assign(Object.assign({}, NZ_GRAPH_LAYOUT_SETTING.nodeSize.node), defaultNodeMeta),
            bridge
        };
        return { graph, subScene, nodeSize };
    }
}
NzGraphComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-graph',
                exportAs: 'nzGraph',
                template: `
    <ng-content></ng-content>
    <svg width="100%" height="100%">
      <svg:defs nz-graph-defs></svg:defs>
      <svg:g [attr.transform]="transformStyle">
        <ng-container
          [ngTemplateOutlet]="groupTemplate"
          [ngTemplateOutletContext]="{ renderNode: renderInfo, type: 'root' }"
        ></ng-container>
      </svg:g>
    </svg>

    <ng-template #groupTemplate let-renderNode="renderNode" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderNode) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderNode)">
          <svg:g class="nz-graph-edges">
            <ng-container *ngFor="let edge of renderNode.edges; trackBy: edgeTrackByFun">
              <g class="nz-graph-edge" nz-graph-edge [edge]="edge" [customTemplate]="customGraphEdgeTemplate"></g>
            </ng-container>
          </svg:g>

          <svg:g class="nz-graph-nodes">
            <ng-container *ngFor="let node of typedNodes(renderNode.nodes); trackBy: nodeTrackByFun">
              <g
                *ngIf="node.type === 1"
                class="nz-graph-node"
                nz-graph-node
                [node]="node"
                [customTemplate]="nodeTemplate"
                (nodeClick)="clickNode($event)"
              ></g>
              <g
                *ngIf="node.type === 0"
                class="nz-graph-node"
                nz-graph-node
                [node]="node"
                [customTemplate]="groupNodeTemplate"
                (nodeClick)="clickNode($event)"
              ></g>
              <ng-container
                *ngIf="node.expanded"
                [ngTemplateOutlet]="groupTemplate"
                [ngTemplateOutletContext]="{ renderNode: node, type: 'sub' }"
              ></ng-container>
            </ng-container>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `,
                host: {
                    '[class.nz-graph]': 'true',
                    '[class.nz-graph-auto-size]': 'nzAutoSize'
                }
            },] }
];
NzGraphComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] },
    { type: NzGraphZoomDirective, decorators: [{ type: Optional }] }
];
NzGraphComponent.propDecorators = {
    listOfNodeElement: [{ type: ViewChildren, args: [NzGraphNodeComponent, { read: ElementRef },] }],
    listOfNodeComponent: [{ type: ViewChildren, args: [NzGraphNodeComponent,] }],
    nodeTemplate: [{ type: ContentChild, args: [NzGraphNodeDirective, { static: true, read: TemplateRef },] }],
    groupNodeTemplate: [{ type: ContentChild, args: [NzGraphGroupNodeDirective, { static: true, read: TemplateRef },] }],
    customGraphEdgeTemplate: [{ type: ContentChild, args: [NzGraphEdgeDirective, { static: true, read: TemplateRef },] }],
    nzGraphData: [{ type: Input }],
    nzRankDirection: [{ type: Input }],
    nzGraphLayoutConfig: [{ type: Input }],
    nzAutoSize: [{ type: Input }],
    nzGraphInitialized: [{ type: Output }],
    nzGraphRendered: [{ type: Output }],
    nzNodeClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzGraphComponent.prototype, "nzAutoSize", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9ncmFwaC9ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUlMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUVULFdBQVcsRUFDWCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsUUFBUSxFQUFjLGFBQWEsRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FB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USxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpRFQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGtCQUFrQixFQUFFLE1BQU07b0JBQzFCLDRCQUE0QixFQUFFLFlBQVk7aUJBQzNDO2FBQ0Y7OztZQXRIQyxpQkFBaUI7WUFHakIsVUFBVTtZQXNCSCxzQkFBc0IsdUJBeUoxQixJQUFJLFlBQUksUUFBUTtZQS9JWixvQkFBb0IsdUJBZ0p4QixRQUFROzs7Z0NBekRWLFlBQVksU0FBQyxvQkFBb0IsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7a0NBQ3ZELFlBQVksU0FBQyxvQkFBb0I7MkJBRWpDLFlBQVksU0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtnQ0FHdEUsWUFBWSxTQUFDLHlCQUF5QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO3NDQUczRSxZQUFZLFNBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7MEJBT3RFLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxLQUFLO3lCQUNMLEtBQUs7aUNBRUwsTUFBTTs4QkFDTixNQUFNOzBCQUNOLE1BQU07O0FBSmtCO0lBQWYsWUFBWSxFQUFFOztvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBidWlsZEdyYXBoIH0gZnJvbSAnZGFncmUtY29tcG91bmQnO1xuXG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaW5hbGl6ZSwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FsY3VsYXRlVHJhbnNmb3JtIH0gZnJvbSAnLi9jb3JlL3V0aWxzJztcblxuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3BvbHlmaWxsJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpHcmFwaERhdGEgfSBmcm9tICcuL2RhdGEtc291cmNlL2dyYXBoLWRhdGEtc291cmNlJztcbmltcG9ydCB7IE56R3JhcGhFZGdlRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmFwaC1lZGdlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekdyYXBoR3JvdXBOb2RlRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmFwaC1ncm91cC1ub2RlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekdyYXBoTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vZ3JhcGgtbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpHcmFwaE5vZGVEaXJlY3RpdmUgfSBmcm9tICcuL2dyYXBoLW5vZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56R3JhcGhab29tRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmFwaC16b29tLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1xuICBOekdyYXBoRGF0YURlZixcbiAgTnpHcmFwaEVkZ2UsXG4gIE56R3JhcGhFZGdlRGVmLFxuICBOekdyYXBoR3JvdXBOb2RlLFxuICBOekdyYXBoTGF5b3V0Q29uZmlnLFxuICBOekdyYXBoTm9kZSxcbiAgTnpHcmFwaE5vZGVEZWYsXG4gIE56R3JhcGhPcHRpb24sXG4gIE56TGF5b3V0U2V0dGluZyxcbiAgTnpSYW5rRGlyZWN0aW9uLFxuICBuelR5cGVEZWZpbml0aW9uLFxuICBOWl9HUkFQSF9MQVlPVVRfU0VUVElOR1xufSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbi8qKiBDaGVja3Mgd2hldGhlciBhbiBvYmplY3QgaXMgYSBkYXRhIHNvdXJjZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGFTb3VyY2UodmFsdWU6IE56U2FmZUFueSk6IHZhbHVlIGlzIE56R3JhcGhEYXRhIHtcbiAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgRGF0YVNvdXJjZSBieSBvYnNlcnZpbmcgaWYgaXQgaGFzIGEgY29ubmVjdCBmdW5jdGlvbi4gQ2Fubm90XG4gIC8vIGJlIGNoZWNrZWQgYXMgYW4gYGluc3RhbmNlb2YgRGF0YVNvdXJjZWAgc2luY2UgcGVvcGxlIGNvdWxkIGNyZWF0ZSB0aGVpciBvd24gc291cmNlc1xuICAvLyB0aGF0IG1hdGNoIHRoZSBpbnRlcmZhY2UsIGJ1dCBkb24ndCBleHRlbmQgRGF0YVNvdXJjZS5cbiAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5jb25uZWN0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotZ3JhcGgnLFxuICBleHBvcnRBczogJ256R3JhcGgnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgIDxzdmc6ZGVmcyBuei1ncmFwaC1kZWZzPjwvc3ZnOmRlZnM+XG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVN0eWxlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJncm91cFRlbXBsYXRlXCJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyByZW5kZXJOb2RlOiByZW5kZXJJbmZvLCB0eXBlOiAncm9vdCcgfVwiXG4gICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc+XG5cbiAgICA8bmctdGVtcGxhdGUgI2dyb3VwVGVtcGxhdGUgbGV0LXJlbmRlck5vZGU9XCJyZW5kZXJOb2RlXCIgbGV0LXR5cGU9XCJ0eXBlXCI+XG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInR5cGUgPT09ICdzdWInID8gc3ViR3JhcGhUcmFuc2Zvcm0ocmVuZGVyTm9kZSkgOiBudWxsXCI+XG4gICAgICAgIDxzdmc6ZyBjbGFzcz1cImNvcmVcIiBbYXR0ci50cmFuc2Zvcm1dPVwiY29yZVRyYW5zZm9ybShyZW5kZXJOb2RlKVwiPlxuICAgICAgICAgIDxzdmc6ZyBjbGFzcz1cIm56LWdyYXBoLWVkZ2VzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlZGdlIG9mIHJlbmRlck5vZGUuZWRnZXM7IHRyYWNrQnk6IGVkZ2VUcmFja0J5RnVuXCI+XG4gICAgICAgICAgICAgIDxnIGNsYXNzPVwibnotZ3JhcGgtZWRnZVwiIG56LWdyYXBoLWVkZ2UgW2VkZ2VdPVwiZWRnZVwiIFtjdXN0b21UZW1wbGF0ZV09XCJjdXN0b21HcmFwaEVkZ2VUZW1wbGF0ZVwiPjwvZz5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvc3ZnOmc+XG5cbiAgICAgICAgICA8c3ZnOmcgY2xhc3M9XCJuei1ncmFwaC1ub2Rlc1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbm9kZSBvZiB0eXBlZE5vZGVzKHJlbmRlck5vZGUubm9kZXMpOyB0cmFja0J5OiBub2RlVHJhY2tCeUZ1blwiPlxuICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgICpuZ0lmPVwibm9kZS50eXBlID09PSAxXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm56LWdyYXBoLW5vZGVcIlxuICAgICAgICAgICAgICAgIG56LWdyYXBoLW5vZGVcbiAgICAgICAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwibm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAobm9kZUNsaWNrKT1cImNsaWNrTm9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgPjwvZz5cbiAgICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAgICAqbmdJZj1cIm5vZGUudHlwZSA9PT0gMFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuei1ncmFwaC1ub2RlXCJcbiAgICAgICAgICAgICAgICBuei1ncmFwaC1ub2RlXG4gICAgICAgICAgICAgICAgW25vZGVdPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImdyb3VwTm9kZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAobm9kZUNsaWNrKT1cImNsaWNrTm9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgPjwvZz5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ0lmPVwibm9kZS5leHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiZ3JvdXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgcmVuZGVyTm9kZTogbm9kZSwgdHlwZTogJ3N1YicgfVwiXG4gICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvc3ZnOmc+XG4gICAgICAgIDwvc3ZnOmc+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm56LWdyYXBoXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLm56LWdyYXBoLWF1dG8tc2l6ZV0nOiAnbnpBdXRvU2l6ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekF1dG9TaXplOiBCb29sZWFuSW5wdXQ7XG5cbiAgQFZpZXdDaGlsZHJlbihOekdyYXBoTm9kZUNvbXBvbmVudCwgeyByZWFkOiBFbGVtZW50UmVmIH0pIGxpc3RPZk5vZGVFbGVtZW50ITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkcmVuKE56R3JhcGhOb2RlQ29tcG9uZW50KSBsaXN0T2ZOb2RlQ29tcG9uZW50ITogUXVlcnlMaXN0PE56R3JhcGhOb2RlQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKE56R3JhcGhOb2RlRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgbm9kZVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8e1xuICAgICRpbXBsaWNpdDogTnpHcmFwaE5vZGU7XG4gIH0+O1xuICBAQ29udGVudENoaWxkKE56R3JhcGhHcm91cE5vZGVEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBUZW1wbGF0ZVJlZiB9KSBncm91cE5vZGVUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPHtcbiAgICAkaW1wbGljaXQ6IE56R3JhcGhHcm91cE5vZGU7XG4gIH0+O1xuICBAQ29udGVudENoaWxkKE56R3JhcGhFZGdlRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgY3VzdG9tR3JhcGhFZGdlVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7XG4gICAgJGltcGxpY2l0OiBOekdyYXBoRWRnZTtcbiAgfT47XG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIHN0cmVhbSBjb250YWluaW5nIHRoZSBsYXRlc3QgZGF0YSBhcnJheSB0byByZW5kZXIuXG4gICAqIERhdGEgc291cmNlIGNhbiBiZSBhbiBvYnNlcnZhYmxlIG9mIE56R3JhcGhEYXRhLCBvciBhIE56R3JhcGhEYXRhIHRvIHJlbmRlci5cbiAgICovXG4gIEBJbnB1dCgpIG56R3JhcGhEYXRhITogTnpHcmFwaERhdGE7XG4gIEBJbnB1dCgpIG56UmFua0RpcmVjdGlvbjogTnpSYW5rRGlyZWN0aW9uID0gJ0xSJztcbiAgQElucHV0KCkgbnpHcmFwaExheW91dENvbmZpZz86IE56R3JhcGhMYXlvdXRDb25maWc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekF1dG9TaXplID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56R3JhcGhJbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpHcmFwaENvbXBvbmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56R3JhcGhSZW5kZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpHcmFwaENvbXBvbmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Tm9kZUNsaWNrOiBFdmVudEVtaXR0ZXI8TnpHcmFwaE5vZGUgfCBOekdyYXBoR3JvdXBOb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICByZXF1ZXN0SWQ6IG51bWJlciA9IC0xO1xuICB0cmFuc2Zvcm1TdHlsZSA9ICcnO1xuICBncmFwaFJlbmRlcmVkU3ViamVjdCQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcbiAgcmVuZGVySW5mbzogTnpHcmFwaEdyb3VwTm9kZSA9IHsgbGFiZWxIZWlnaHQ6IDAgfSBhcyBOekdyYXBoR3JvdXBOb2RlO1xuICBtYXBPZk5vZGVBdHRyOiB7IFtrZXk6IHN0cmluZ106IE56R3JhcGhOb2RlRGVmIH0gPSB7fTtcbiAgbWFwT2ZFZGdlQXR0cjogeyBba2V5OiBzdHJpbmddOiBOekdyYXBoRWRnZURlZiB9ID0ge307XG4gIHpvb20gPSAxO1xuXG4gIHB1YmxpYyByZWFkb25seSB0eXBlZE5vZGVzID0gbnpUeXBlRGVmaW5pdGlvbjxBcnJheTxOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU+PigpO1xuICBwcml2YXRlIGRhdGFTb3VyY2U/OiBOekdyYXBoRGF0YTtcbiAgcHJpdmF0ZSBsYXlvdXRTZXR0aW5nOiBOekxheW91dFNldHRpbmcgPSBOWl9HUkFQSF9MQVlPVVRfU0VUVElORztcbiAgLyoqIERhdGEgc3Vic2NyaXB0aW9uICovXG4gIHByaXZhdGUgX2RhdGFTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb24gfCBudWxsO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBub2RlVHJhY2tCeUZ1biA9IChfOiBudW1iZXIsIG5vZGU6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZSkgPT4gbm9kZS5uYW1lO1xuICBlZGdlVHJhY2tCeUZ1biA9IChfOiBudW1iZXIsIGVkZ2U6IE56R3JhcGhFZGdlKSA9PiBgJHtlZGdlLnZ9LSR7ZWRnZS53fWA7XG5cbiAgc3ViR3JhcGhUcmFuc2Zvcm0gPSAobm9kZTogTnpHcmFwaEdyb3VwTm9kZSkgPT4ge1xuICAgIGNvbnN0IHggPSBub2RlLnggLSBub2RlLmNvcmVCb3gud2lkdGggLyAyLjA7XG4gICAgY29uc3QgeSA9IG5vZGUueSAtIG5vZGUuaGVpZ2h0IC8gMi4wICsgbm9kZS5wYWRkaW5nVG9wO1xuICAgIHJldHVybiBgdHJhbnNsYXRlKCR7eH0sICR7eX0pYDtcbiAgfTtcblxuICBjb3JlVHJhbnNmb3JtID0gKG5vZGU6IE56R3JhcGhHcm91cE5vZGUpID0+IHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSgwLCAke25vZGUucGFyZW50Tm9kZU5hbWUgPyBub2RlLmxhYmVsSGVpZ2h0IDogMH0pYDtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSxcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgbnpHcmFwaFpvb20/OiBOekdyYXBoWm9vbURpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ncmFwaFJlbmRlcmVkU3ViamVjdCQucGlwZSh0YWtlKDEpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBPbmx5IHpvb21pbmcgaXMgbm90IHNldCwgbW92ZSBncmFwaCB0byBjZW50ZXJcbiAgICAgIGlmICghdGhpcy5uekdyYXBoWm9vbSkge1xuICAgICAgICB0aGlzLmZpdENlbnRlcigpO1xuICAgICAgfVxuICAgICAgdGhpcy5uekdyYXBoSW5pdGlhbGl6ZWQuZW1pdCh0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56QXV0b0ZpdCwgbnpSYW5rRGlyZWN0aW9uLCBuekdyYXBoRGF0YSwgbnpHcmFwaExheW91dENvbmZpZyB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpHcmFwaExheW91dENvbmZpZykge1xuICAgICAgdGhpcy5sYXlvdXRTZXR0aW5nID0gdGhpcy5tZXJnZUNvbmZpZyhuekdyYXBoTGF5b3V0Q29uZmlnLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAvLyBPYmplY3QuYXNzaWduKHRoaXMubGF5b3V0U2V0dGluZywgdGhpcy5uekdyYXBoTGF5b3V0U2V0dGluZyB8fCB7fSk7XG4gICAgfVxuXG4gICAgaWYgKG56R3JhcGhEYXRhKSB7XG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlICE9PSB0aGlzLm56R3JhcGhEYXRhKSB7XG4gICAgICAgIHRoaXMuX3N3aXRjaERhdGFTb3VyY2UodGhpcy5uekdyYXBoRGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKChuekF1dG9GaXQgJiYgIW56QXV0b0ZpdC5maXJzdENoYW5nZSkgfHwgKG56UmFua0RpcmVjdGlvbiAmJiAhbnpSYW5rRGlyZWN0aW9uLmZpcnN0Q2hhbmdlKSkge1xuICAgICAgLy8gUmVuZGVyIGdyYXBoXG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlIS5kYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMuZHJhd0dyYXBoKHRoaXMuZGF0YVNvdXJjZSEuZGF0YVNvdXJjZSwge1xuICAgICAgICAgIHJhbmtEaXJlY3Rpb246IHRoaXMubnpSYW5rRGlyZWN0aW9uLFxuICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLmRhdGFTb3VyY2UhLmV4cGFuc2lvbk1vZGVsLnNlbGVjdGVkIHx8IFtdXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgIXRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMub2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG5cbiAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHR5cGVvZiB0aGlzLmRhdGFTb3VyY2UuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZGF0YVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZCk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdCBldmVudFxuICAgKi9cbiAgY2xpY2tOb2RlKG5vZGU6IE56R3JhcGhOb2RlIHwgTnpHcmFwaEdyb3VwTm9kZSk6IHZvaWQge1xuICAgIHRoaXMubnpOb2RlQ2xpY2suZW1pdChub2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlIGdyYXBoIHRvIGNlbnRlciBhbmQgc2NhbGUgYXV0b21hdGljYWxseVxuICAgKi9cbiAgZml0Q2VudGVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgeCwgeSwgayB9ID0gY2FsY3VsYXRlVHJhbnNmb3JtKFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3ZnJyksXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzdmcgPiBnJylcbiAgICApITtcbiAgICBpZiAoaykge1xuICAgICAgdGhpcy56b29tID0gaztcbiAgICAgIHRoaXMudHJhbnNmb3JtU3R5bGUgPSBgdHJhbnNsYXRlKCR7eH0sICR7eX0pc2NhbGUoJHtrfSlgO1xuICAgIH1cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZS1EcmF3IGdyYXBoXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBwYXJhbSBuZWVkUmVzaXplXG4gICAqL1xuICBkcmF3R3JhcGgoZGF0YTogTnpHcmFwaERhdGFEZWYsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24sIG5lZWRSZXNpemU6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVuZGVySW5mbyA9IHRoaXMuYnVpbGRHcmFwaEluZm8oZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gTmVlZCBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgdGhpcy5yZW5kZXJJbmZvID0gcmVuZGVySW5mbztcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMucmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRyYXdOb2RlcyghdGhpcy5ub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvbikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgZWxlbWVudFxuICAgICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICBpZiAobmVlZFJlc2l6ZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlc2l6ZU5vZGVTaXplKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YVNvdXJjZTogTnpHcmFwaERhdGFEZWYgPSB0aGlzLmRhdGFTb3VyY2UhLmRhdGFTb3VyY2UhO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0dyYXBoKGRhdGFTb3VyY2UsIG9wdGlvbnMsIGZhbHNlKS50aGVuKCgpID0+IHJlc29sdmUoKSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5ncmFwaFJlbmRlcmVkU3ViamVjdCQubmV4dCgpO1xuICAgICAgICAgICAgICB0aGlzLm56R3JhcGhSZW5kZXJlZC5lbWl0KHRoaXMpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRyYXcgYWxsIG5vZGVzXG4gICAqIEBwYXJhbSBhbmltYXRlXG4gICAqL1xuICBkcmF3Tm9kZXMoYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICB0aGlzLm1ha2VOb2Rlc0FuaW1hdGlvbigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGlzdE9mTm9kZUNvbXBvbmVudC5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgbm9kZS5tYWtlTm9BbmltYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplTm9kZVNpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgZGF0YVNvdXJjZTogTnpHcmFwaERhdGFEZWYgPSB0aGlzLmRhdGFTb3VyY2UhLmRhdGFTb3VyY2UhO1xuICAgICAgbGV0IHNjYWxlID0gdGhpcy5uekdyYXBoWm9vbT8ubnpab29tIHx8IHRoaXMuem9vbSB8fCAxO1xuICAgICAgdGhpcy5saXN0T2ZOb2RlRWxlbWVudC5mb3JFYWNoKG5vZGVFbGUgPT4ge1xuICAgICAgICBjb25zdCBjb250ZW50RWxlID0gbm9kZUVsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAoY29udGVudEVsZSkge1xuICAgICAgICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgICAgICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgICAvLyBDaGVjayBpZiBmb3JlaWduT2JqZWN0IGlzIHNldFxuICAgICAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBjb250ZW50RWxlLnF1ZXJ5U2VsZWN0b3IoJ2ZvcmVpZ25PYmplY3QgPiA6Zmlyc3QtY2hpbGQnKT8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgaWYgKGNsaWVudFJlY3QpIHtcbiAgICAgICAgICAgIHdpZHRoID0gY2xpZW50UmVjdC53aWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBiQm94UmVjdCA9IGNvbnRlbnRFbGUuZ2V0QkJveCgpO1xuICAgICAgICAgICAgd2lkdGggPSBiQm94UmVjdC53aWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IGJCb3hSZWN0LmhlaWdodDtcbiAgICAgICAgICAgIC8vIGdldEJCb3ggd2lsbCByZXR1cm4gYWN0dWFsIHZhbHVlXG4gICAgICAgICAgICBzY2FsZSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEVsZW1lbnQgaWQgdHlwZSBpcyBzdHJpbmdcbiAgICAgICAgICBjb25zdCBub2RlID0gZGF0YVNvdXJjZS5ub2Rlcy5maW5kKG4gPT4gYCR7bi5pZH1gID09PSBub2RlRWxlLm5hdGl2ZUVsZW1lbnQuaWQpO1xuICAgICAgICAgIGlmIChub2RlICYmIHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSBoZWlnaHQgLyBzY2FsZTtcbiAgICAgICAgICAgIG5vZGUud2lkdGggPSB3aWR0aCAvIHNjYWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3dpdGNoIHRvIHRoZSBwcm92aWRlZCBkYXRhIHNvdXJjZSBieSByZXNldHRpbmcgdGhlIGRhdGEgYW5kIHVuc3Vic2NyaWJpbmcgZnJvbSB0aGUgY3VycmVudFxuICAgKiByZW5kZXIgY2hhbmdlIHN1YnNjcmlwdGlvbiBpZiBvbmUgZXhpc3RzLiBJZiB0aGUgZGF0YSBzb3VyY2UgaXMgbnVsbCwgaW50ZXJwcmV0IHRoaXMgYnlcbiAgICogY2xlYXJpbmcgdGhlIG5vZGUgb3V0bGV0LiBPdGhlcndpc2Ugc3RhcnQgbGlzdGVuaW5nIGZvciBuZXcgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgX3N3aXRjaERhdGFTb3VyY2UoZGF0YVNvdXJjZTogTnpHcmFwaERhdGEpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHR5cGVvZiB0aGlzLmRhdGFTb3VyY2UuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5uekdyYXBoRGF0YS5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgdGhpcy5vYnNlcnZlUmVuZGVyQ2hhbmdlcygpO1xuICB9XG5cbiAgLyoqIFNldCB1cCBhIHN1YnNjcmlwdGlvbiBmb3IgdGhlIGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAqL1xuICBwcml2YXRlIG9ic2VydmVSZW5kZXJDaGFuZ2VzKCk6IHZvaWQge1xuICAgIGxldCBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPE56R3JhcGhEYXRhRGVmPiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZ3JhcGhPcHRpb25zOiBOekdyYXBoT3B0aW9uID0ge1xuICAgICAgcmFua0RpcmVjdGlvbjogdGhpcy5uelJhbmtEaXJlY3Rpb25cbiAgICB9O1xuICAgIGlmIChpc0RhdGFTb3VyY2UodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgZGF0YVN0cmVhbSA9IHRoaXMuZGF0YVNvdXJjZS5jb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFTdHJlYW0pIHtcbiAgICAgIHRoaXMuX2RhdGFTdWJzY3JpcHRpb24gPSBkYXRhU3RyZWFtLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIGdyYXBoT3B0aW9ucyA9IHtcbiAgICAgICAgICByYW5rRGlyZWN0aW9uOiB0aGlzLm56UmFua0RpcmVjdGlvbixcbiAgICAgICAgICBleHBhbmRlZDogdGhpcy5uekdyYXBoRGF0YS5leHBhbnNpb25Nb2RlbC5zZWxlY3RlZFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRyYXdHcmFwaChkYXRhLCBncmFwaE9wdGlvbnMsIHRoaXMubnpBdXRvU2l6ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcihgQSB2YWxpZCBkYXRhIHNvdXJjZSBtdXN0IGJlIHByb3ZpZGVkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcmVuZGVySW5mbyBhbmQgcHJlcGFyZSBzb21lIGRhdGFcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgYnVpbGRHcmFwaEluZm8oZGF0YTogTnpHcmFwaERhdGFEZWYsIG9wdGlvbnM6IE56R3JhcGhPcHRpb24pOiBOekdyYXBoR3JvdXBOb2RlIHtcbiAgICB0aGlzLnBhcnNlSW5mbyhkYXRhKTtcbiAgICBjb25zdCByZW5kZXJJbmZvID0gYnVpbGRHcmFwaChkYXRhLCBvcHRpb25zLCB0aGlzLmxheW91dFNldHRpbmcpIGFzIE56R3JhcGhHcm91cE5vZGU7XG4gICAgY29uc3QgZGlnID0gKG5vZGVzOiBBcnJheTxOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU+KTogdm9pZCA9PiB7XG4gICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAxICYmIHRoaXMubWFwT2ZOb2RlQXR0ci5oYXNPd25Qcm9wZXJ0eShub2RlLm5hbWUpKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlLCB0aGlzLm1hcE9mTm9kZUF0dHJbbm9kZS5uYW1lXSk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAwKSB7XG4gICAgICAgICAgKG5vZGUgYXMgTnpHcmFwaEdyb3VwTm9kZSkuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcE9mRWRnZUF0dHIuaGFzT3duUHJvcGVydHkoYCR7ZWRnZS52fS0ke2VkZ2Uud31gKSkge1xuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2UsIHRoaXMubWFwT2ZFZGdlQXR0cltgJHtlZGdlLnZ9LSR7ZWRnZS53fWBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkaWcobm9kZS5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgZGlnKHJlbmRlckluZm8ubm9kZXMpO1xuICAgIC8vIEFzc2lnbiBkYXRhIHRvIGVkZ2VzIG9mIHJvb3QgZ3JhcGhcbiAgICByZW5kZXJJbmZvLmVkZ2VzLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICBpZiAodGhpcy5tYXBPZkVkZ2VBdHRyLmhhc093blByb3BlcnR5KGAke2VkZ2Uudn0tJHtlZGdlLnd9YCkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlLCB0aGlzLm1hcE9mRWRnZUF0dHJbYCR7ZWRnZS52fS0ke2VkZ2Uud31gXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlbmRlckluZm87XG4gIH1cblxuICAvKipcbiAgICogUGxheSB3aXRoIGFuaW1hdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBtYWtlTm9kZXNBbmltYXRpb24oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIGZvcmtKb2luKC4uLnRoaXMubGlzdE9mTm9kZUNvbXBvbmVudC5tYXAobm9kZSA9PiBub2RlLm1ha2VBbmltYXRpb24oKSkpLnBpcGUoXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJbmZvKGRhdGE6IE56R3JhcGhEYXRhRGVmKTogdm9pZCB7XG4gICAgZGF0YS5ub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgdGhpcy5tYXBPZk5vZGVBdHRyW24uaWRdID0gbjtcbiAgICB9KTtcbiAgICBkYXRhLmVkZ2VzLmZvckVhY2goZSA9PiB7XG4gICAgICB0aGlzLm1hcE9mRWRnZUF0dHJbYCR7ZS52fS0ke2Uud31gXSA9IGU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgY29uZmlnIHdpdGggdXNlciBpbnB1dHNcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBtZXJnZUNvbmZpZyhjb25maWc6IE56R3JhcGhMYXlvdXRDb25maWcpOiBOekxheW91dFNldHRpbmcge1xuICAgIGNvbnN0IGdyYXBoTWV0YSA9IGNvbmZpZz8ubGF5b3V0IHx8IHt9O1xuICAgIGNvbnN0IHN1YlNjZW5lTWV0YSA9IGNvbmZpZz8uc3ViU2NlbmUgfHwge307XG4gICAgY29uc3QgZGVmYXVsdE5vZGVNZXRhID0gY29uZmlnPy5kZWZhdWx0Tm9kZSB8fCB7fTtcbiAgICBjb25zdCBkZWZhdWx0Q29tcG91bmROb2RlTWV0YSA9IGNvbmZpZz8uZGVmYXVsdENvbXBvdW5kTm9kZSB8fCB7fTtcbiAgICBjb25zdCBicmlkZ2UgPSBOWl9HUkFQSF9MQVlPVVRfU0VUVElORy5ub2RlU2l6ZS5icmlkZ2U7XG5cbiAgICBjb25zdCBncmFwaDogTnpMYXlvdXRTZXR0aW5nWydncmFwaCddID0geyBtZXRhOiB7IC4uLk5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HLmdyYXBoLm1ldGEsIC4uLmdyYXBoTWV0YSB9IH07XG4gICAgY29uc3Qgc3ViU2NlbmU6IE56TGF5b3V0U2V0dGluZ1snc3ViU2NlbmUnXSA9IHtcbiAgICAgIG1ldGE6IHsgLi4uTlpfR1JBUEhfTEFZT1VUX1NFVFRJTkcuc3ViU2NlbmUubWV0YSwgLi4uc3ViU2NlbmVNZXRhIH1cbiAgICB9O1xuICAgIGNvbnN0IG5vZGVTaXplOiBOekxheW91dFNldHRpbmdbJ25vZGVTaXplJ10gPSB7XG4gICAgICBtZXRhOiB7IC4uLk5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HLm5vZGVTaXplLm1ldGEsIC4uLmRlZmF1bHRDb21wb3VuZE5vZGVNZXRhIH0sXG4gICAgICBub2RlOiB7IC4uLk5aX0dSQVBIX0xBWU9VVF9TRVRUSU5HLm5vZGVTaXplLm5vZGUsIC4uLmRlZmF1bHROb2RlTWV0YSB9LFxuICAgICAgYnJpZGdlXG4gICAgfTtcblxuICAgIHJldHVybiB7IGdyYXBoLCBzdWJTY2VuZSwgbm9kZVNpemUgfTtcbiAgfVxufVxuIl19