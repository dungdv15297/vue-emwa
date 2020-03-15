import Staff, { StaffImpl } from './staff';

export default interface Account {
    accountId: number;
    staff: Staff;
    username: string;
    password: string;
    createDate: string;
    role: number;
  }
  export class AccountImpl implements Account {
    accountId = -1;
    staff = new StaffImpl();
    username = '';
    password = '';
    createDate = '';
    role = 0;
  }