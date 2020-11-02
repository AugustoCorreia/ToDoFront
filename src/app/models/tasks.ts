import { ɵDomAdapter } from '@angular/common';

export interface Tasks {
    id?:number;
    title?:string;
    description?:string;
    creationDate?:Date;
    taskDate?:Date;
    status?:number;
    timeSpent?:number;                                                          
}
