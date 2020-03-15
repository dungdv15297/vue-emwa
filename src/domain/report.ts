import Staff, { StaffImpl } from './staff';
export default interface Report {
    reportId: number;
	staff: Staff;
	type: boolean;
	reason: string;
    bonus: number;
    status: boolean;
  }
  export class ReportImpl implements Report {
    reportId = -1;
	staff = new StaffImpl();
	type = true;
	reason = '';
    bonus = -1;
    status = false;
  }