import { ILocationMySuffix } from '@/shared/model/location-my-suffix.model';
import { IEmployeeMySuffix } from '@/shared/model/employee-my-suffix.model';

export interface IDepartmentMySuffix {
  id?: number;
  departmentName?: string;
  location?: ILocationMySuffix | null;
  employees?: IEmployeeMySuffix[] | null;
}

export class DepartmentMySuffix implements IDepartmentMySuffix {
  constructor(
    public id?: number,
    public departmentName?: string,
    public location?: ILocationMySuffix | null,
    public employees?: IEmployeeMySuffix[] | null
  ) {}
}
