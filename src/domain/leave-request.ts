import Staff, { StaffImpl } from './staff';


export default interface LeaveRequest {
  lrId: number;
  staff: Staff;
  lrStart: string;
  lrEnd: string;
  leaderId: number;
  reason: string;
  createTime: string;
  status: number;
}
export class LeaveRequestImpl implements LeaveRequest {
  lrId = -1;
  staff = new StaffImpl();
  lrStart = '';
  lrEnd = '';
  leaderId = -1;
  reason = '';
  createTime = '';
  status = -1;
}