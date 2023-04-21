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

export type InitialHistoricalData = Record<DataType, Record<string, number>>;

export enum DataType {
 Cases = 'cases',
 Deaths = 'deaths',
 Recovered = 'recovered',
}

export interface HistoricalData {
 date: string;
 type: DataType;
 value: number;
}

export type ChartData = Array<HistoricalData>;

export enum LineColors {
 Cases = '#E07C24',
 Deaths = '#E6425E',
 Recovered = '#50DBB4',
 Other = '#8D3DAF',
}
