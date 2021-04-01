import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';
import { IJobMySuffix } from '@/shared/model/job-my-suffix.model';

import DepartmentMySuffixService from '@/entities/department-my-suffix/department-my-suffix.service';
import { IDepartmentMySuffix } from '@/shared/model/department-my-suffix.model';

import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';
import { IEmployeeMySuffix } from '@/shared/model/employee-my-suffix.model';

import { IJobHistoryMySuffix, JobHistoryMySuffix } from '@/shared/model/job-history-my-suffix.model';
import JobHistoryMySuffixService from './job-history-my-suffix.service';

const validations: any = {
  jobHistory: {
    startDate: {},
    endDate: {},
    language: {},
  },
};

@Component({
  validations,
})
export default class JobHistoryMySuffixUpdate extends Vue {
  @Inject('jobHistoryService') private jobHistoryService: () => JobHistoryMySuffixService;
  public jobHistory: IJobHistoryMySuffix = new JobHistoryMySuffix();

  @Inject('jobService') private jobService: () => JobMySuffixService;

  public jobs: IJobMySuffix[] = [];

  @Inject('departmentService') private departmentService: () => DepartmentMySuffixService;

  public departments: IDepartmentMySuffix[] = [];

  @Inject('employeeService') private employeeService: () => EmployeeMySuffixService;

  public employees: IEmployeeMySuffix[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.jobHistoryId) {
        vm.retrieveJobHistoryMySuffix(to.params.jobHistoryId);
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
  }

  public save(): void {
    this.isSaving = true;
    if (this.jobHistory.id) {
      this.jobHistoryService()
        .update(this.jobHistory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A JobHistoryMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.jobHistoryService()
        .create(this.jobHistory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A JobHistoryMySuffix is created with identifier ' + param.id;
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

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.jobHistory[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.jobHistory[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.jobHistory[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.jobHistory[field] = null;
    }
  }

  public retrieveJobHistoryMySuffix(jobHistoryId): void {
    this.jobHistoryService()
      .find(jobHistoryId)
      .then(res => {
        res.startDate = new Date(res.startDate);
        res.endDate = new Date(res.endDate);
        this.jobHistory = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.jobService()
      .retrieve()
      .then(res => {
        this.jobs = res.data;
      });
    this.departmentService()
      .retrieve()
      .then(res => {
        this.departments = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
