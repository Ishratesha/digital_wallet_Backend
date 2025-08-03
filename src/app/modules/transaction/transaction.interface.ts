export interface ITransaction {
  sender?: string; // user id
  receiver?: string; // user id
  amount: number;
  type: 'ADD_MONEY' | 'WITHDRAW' | 'SEND_MONEY' | 'CASH_IN' | 'CASH_OUT';
  timestamp?: Date;
}
