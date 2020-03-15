import Staff, { StaffImpl } from './staff';
export default interface Recruitment {
	recruitmentId: number;
	title: string;
	description: string;
	status: boolean;
}
export class RecruitmentImpl implements Recruitment {
	recruitmentId = -1;
	title = '';
	description = '';
	status = true;
}