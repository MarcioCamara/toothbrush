import { DebugElement, NgModule, Type } from '@angular/core';
import { ComponentFixture, TestBedStatic } from '@angular/core/testing';
declare type ComponentBedOptions = Pick<NgModule, 'providers' | 'declarations' | 'imports'>;
export interface ComponentBed<T> {
    bed: TestBedStatic;
    fixture: ComponentFixture<T>;
    nativeElement: HTMLElement;
    debugElement: DebugElement;
    component: T;
}
export declare function createComponentBed<T>(component: Type<T>, options?: ComponentBedOptions): ComponentBed<T>;
export {};
