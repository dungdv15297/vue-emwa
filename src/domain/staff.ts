import Depart, { DepartImpl } from './depart';
import Position, { PositionImpl } from './position';
import Account, { AccountImpl } from './account';
import LeaveRequest from './leave-request';
import Recruitment from './recruitment';
import Report from './depart';

export default interface Staff {
  staffId: number;
	depart: Depart;
	position: Position;
	staffName: string;
	gender: boolean;
	address: string;
	phoneNumber: string;
	startDate: string;
	endDate: string;
	email: string;
	avatar: string;
	status: boolean;
	accounts: Account;
	leaveRequests: LeaveRequest[];
	recruitments: Recruitment[];
	reports: Report[];
  }
export class StaffImpl implements Staff {
  staffId = -1;
	depart = new DepartImpl();
	position = new PositionImpl();
	staffName = '';
	gender = true;
	address = '';
	phoneNumber = '';
	startDate = '';
	endDate = '';
	email = '';
	avatar = '';
	status = true;
	accounts = new AccountImpl();
	leaveRequests = [];
	recruitments = [];
	reports = [];
}