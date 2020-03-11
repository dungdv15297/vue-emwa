export default interface Depart {
  departId: number;
  departName: string;
  description: string;
  staffs: any[]
}
export class DepartImpl implements Depart {
  departId = -1;
  departName = '';
  description = '';
  staffs = [];
}