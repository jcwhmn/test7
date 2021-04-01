import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';
import { IJobMySuffix } from '@/shared/model/job-my-suffix.model';

import DepartmentMySuffixService from '@/entities/department-my-suffix/department-my-suffix.service';
import { IDepartmentMySuffix } from '@/shared/model/department-my-suffix.model';

import { IEmployeeMySuffix, EmployeeMySuffix } from '@/shared/model/employee-my-suffix.model';
import EmployeeMySuffixService from './employee-my-suffix.service';

const validations: any = {
  employee: {
    firstName: {},
    lastName: {},
    email: {},
    phoneNumber: {},
    hireDate: {},
    salary: {},
    commissionPct: {},
  },
};

@Component({
  validations,
})
export default class EmployeeMySuffixUpdate extends Vue {
  @Inject('employeeService') private employeeService: () => EmployeeMySuffixService;
  public employee: IEmployeeMySuffix = new EmployeeMySuffix();

  @Inject('jobService') private jobService: () => JobMySuffixService;

  public jobs: IJobMySuffix[] = [];

  public employees: IEmployeeMySuffix[] = [];

  @Inject('departmentService') private departmentService: () => DepartmentMySuffixService;

  public departments: IDepartmentMySuffix[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployeeMySuffix(to.params.employeeId);
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
    if (this.employee.id) {
      this.employeeService()
        .update(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A EmployeeMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A EmployeeMySuffix is created with identifier ' + param.id;
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
      this.employee[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.employee[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.employee[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.employee[field] = null;
    }
  }

  public retrieveEmployeeMySuffix(employeeId): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        res.hireDate = new Date(res.hireDate);
        this.employee = res;
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
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
    this.departmentService()
      .retrieve()
      .then(res => {
        this.departments = res.data;
      });
  }
}
