import { IJobMySuffix } from '@/shared/model/job-my-suffix.model';
import { IDepartmentMySuffix } from '@/shared/model/department-my-suffix.model';
import { IEmployeeMySuffix } from '@/shared/model/employee-my-suffix.model';

import { Language } from '@/shared/model/enumerations/language.model';
export interface IJobHistoryMySuffix {
  id?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  language?: Language | null;
  job?: IJobMySuffix | null;
  department?: IDepartmentMySuffix | null;
  employee?: IEmployeeMySuffix | null;
}

export class JobHistoryMySuffix implements IJobHistoryMySuffix {
  constructor(
    public id?: number,
    public startDate?: Date | null,
    public endDate?: Date | null,
    public language?: Language | null,
    public job?: IJobMySuffix | null,
    public department?: IDepartmentMySuffix | null,
    public employee?: IEmployeeMySuffix | null
  ) {}
}
