export default interface Depart {
  departId: string;
  departName: string;
  description: string;
  staffs: any[]
}
export class DepartImpl implements Depart {
  departId = '';
  departName = '';
  description = '';
  staffs = [];
}