import { Component, Vue, Inject } from 'vue-property-decorator';

import TaskMySuffixService from '@/entities/task-my-suffix/task-my-suffix.service';
import { ITaskMySuffix } from '@/shared/model/task-my-suffix.model';

import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';
import { IEmployeeMySuffix } from '@/shared/model/employee-my-suffix.model';

import { IJobMySuffix, JobMySuffix } from '@/shared/model/job-my-suffix.model';
import JobMySuffixService from './job-my-suffix.service';

const validations: any = {
  job: {
    jobTitle: {},
    minSalary: {},
    maxSalary: {},
  },
};

@Component({
  validations,
})
export default class JobMySuffixUpdate extends Vue {
  @Inject('jobService') private jobService: () => JobMySuffixService;
  public job: IJobMySuffix = new JobMySuffix();

  @Inject('taskService') private taskService: () => TaskMySuffixService;

  public tasks: ITaskMySuffix[] = [];

  @Inject('employeeService') private employeeService: () => EmployeeMySuffixService;

  public employees: IEmployeeMySuffix[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.jobId) {
        vm.retrieveJobMySuffix(to.params.jobId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    this.job.tasks = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.job.id) {
      this.jobService()
        .update(this.job)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A JobMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.jobService()
        .create(this.job)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A JobMySuffix is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public retrieveJobMySuffix(jobId): void {
    this.jobService()
      .find(jobId)
      .then(res => {
        this.job = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.taskService()
      .retrieve()
      .then(res => {
        this.tasks = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
