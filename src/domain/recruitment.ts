import Staff, { StaffImpl } from './staff';
export default interface Recruitment {
	recruitmentId: number;
	staff: Object;
	title: string;
	description: string;
	status: boolean;
}
export class RecruitmentImpl implements Recruitment {
	recruitmentId = -1;
	title = '';
	staff = {staffId: 3};
	description = '';
	status = true;
}