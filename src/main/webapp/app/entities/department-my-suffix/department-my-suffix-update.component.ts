import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import LocationMySuffixService from '@/entities/location-my-suffix/location-my-suffix.service';
import { ILocationMySuffix } from '@/shared/model/location-my-suffix.model';

import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';
import { IEmployeeMySuffix } from '@/shared/model/employee-my-suffix.model';

import { IDepartmentMySuffix, DepartmentMySuffix } from '@/shared/model/department-my-suffix.model';
import DepartmentMySuffixService from './department-my-suffix.service';

const validations: any = {
  department: {
    departmentName: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class DepartmentMySuffixUpdate extends Vue {
  @Inject('departmentService') private departmentService: () => DepartmentMySuffixService;
  public department: IDepartmentMySuffix = new DepartmentMySuffix();

  @Inject('locationService') private locationService: () => LocationMySuffixService;

  public locations: ILocationMySuffix[] = [];

  @Inject('employeeService') private employeeService: () => EmployeeMySuffixService;

  public employees: IEmployeeMySuffix[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.departmentId) {
        vm.retrieveDepartmentMySuffix(to.params.departmentId);
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
    if (this.department.id) {
      this.departmentService()
        .update(this.department)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A DepartmentMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.departmentService()
        .create(this.department)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A DepartmentMySuffix is created with identifier ' + param.id;
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

  public retrieveDepartmentMySuffix(departmentId): void {
    this.departmentService()
      .find(departmentId)
      .then(res => {
        this.department = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.locationService()
      .retrieve()
      .then(res => {
        this.locations = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
