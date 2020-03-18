import { AccountImpl } from '@/domain/account';
export class StaffResult{
    staffId = -1;
    departId = -1;
    positionId = -1;
    departName = '';
    positionName = '';
    staffName = '';
    gender = true;
    address = '';
    phoneNumber = '';
    startDate = '';
    endDate = '';
    email = '';
    avatar = '';
    status = true;
    accounts = null;
    leaveRequests = [];
    recruitments = [];
    reports = [];
}