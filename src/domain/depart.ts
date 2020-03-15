import Staff from './staff';

export default interface Depart {
  departId: number;
  departName: string;
  description: string;
  staffs: Staff[]
}
export class DepartImpl implements Depart {
  departId = -1;
  departName = '';
  description = '';
  staffs = [];
}