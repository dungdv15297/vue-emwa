import Staff from './staff';
export default interface Position {
    positionId: number;
    positionName: string;
    description: string;
    staffs: Staff[]
  }
  export class PositionImpl implements Position {
    positionId = -1;
    positionName = '';
    description = '';
    staffs = [];
  }