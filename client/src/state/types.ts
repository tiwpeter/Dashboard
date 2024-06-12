// ไฟล์ interfaces.ts
export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface Month {
    id: string;
    month: string; 
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
}

export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
}

export interface GetKpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
}

export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}


export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface MonthlyData {
    month: string;
    revenue: string;
    expenses: string;
  }
  
  export interface DailyData {
    date: string;
    revenue: string;
    expenses: string;
  }
  
  export interface KpiData {
    monthlyData: MonthlyData[];
    dailyData: DailyData[];
  }
  export interface Product {
    
  }

  export interface  Transaction{}


  export interface GetProductsResponse {
    productData: Product[];
  }
  
  export interface GetTransactionsResponse {
    transactionData: Transaction[];
  }
  
  export  interface GetKpisResponse {
    kpiData: KpiData[];
  }