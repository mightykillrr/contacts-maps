export enum Status {
 Inactive,
 Active,
}

export interface Contact {
 id: string;
 first_name: string;
 last_name: string;
 phone: string;
 email?: string;
 status: Status;
}

export type InitialContact = Omit<Contact, 'id'>;
