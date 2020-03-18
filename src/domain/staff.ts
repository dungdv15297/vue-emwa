import Depart, { DepartImpl } from './depart';
import Position, { PositionImpl } from './position';
import Account, { AccountImpl } from './account';
import LeaveRequest from './leave-request';
import Recruitment from './recruitment';
import Report from './depart';
import { StaffResult } from '@/response/staff-response';

export default interface Staff extends StaffResult{
	depart: Depart;
	position: Position;
  }
export class StaffImpl extends StaffResult implements Staff {
	depart = new DepartImpl();
	position = new PositionImpl();
}