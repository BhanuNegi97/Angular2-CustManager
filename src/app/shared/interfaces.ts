export interface IPagedResults {
    totalRecords: number;
    results: any[];
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