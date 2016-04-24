export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerSummary {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: IState;
    gender: string;
    latitude: number;
    longitude: number;
    orderCount?: number;
}

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: IState;
    zip: number;
    gender: string;
    latitude: number;
    longitude: number;
    orderCount?: number;
    orders?: IOrder[];
    ordersTotal?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IUserSecurity {
    isAuthenticated: boolean;
    roles: string[]
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface ILogService {
  log(message: string): void;
}