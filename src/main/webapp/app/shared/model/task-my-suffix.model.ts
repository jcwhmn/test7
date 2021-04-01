import { IJobMySuffix } from '@/shared/model/job-my-suffix.model';

export interface ITaskMySuffix {
  id?: number;
  title?: string | null;
  description?: string | null;
  jobs?: IJobMySuffix[] | null;
}

export class TaskMySuffix implements ITaskMySuffix {
  constructor(public id?: number, public title?: string | null, public description?: string | null, public jobs?: IJobMySuffix[] | null) {}
}
