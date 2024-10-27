
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum GrantMatchResponseType {
    open = "open",
    accepted = "accepted",
    rejected = "rejected"
}

export class GrantMatch {
    tenantId: string;
    grantId: string;
    feedback: string;
    response: GrantMatchResponseType;
    grant?: Nullable<Grant>;
}

export abstract class IMutation {
    abstract respond(tenantId: string, grantId: string, feedback: string, response: GrantMatchResponseType): Nullable<GrantMatch> | Promise<Nullable<GrantMatch>>;
}

export class Grant {
    id: string;
    name: string;
    averageAmount: number;
}

export abstract class IQuery {
    abstract grants(): Nullable<Grant[]> | Promise<Nullable<Grant[]>>;

    abstract tenants(): Nullable<Tenant[]> | Promise<Nullable<Tenant[]>>;

    abstract tenant(id: string): Tenant | Promise<Tenant>;
}

export class Tenant {
    id: string;
    openGrants?: Nullable<GrantMatch[]>;
    acceptedGrants?: Nullable<GrantMatch[]>;
    rejectedGrants?: Nullable<GrantMatch[]>;
}

type Nullable<T> = T | null;
