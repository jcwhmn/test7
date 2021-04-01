import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEmployeeMySuffix } from '@/shared/model/employee-my-suffix.model';
import EmployeeMySuffixService from './employee-my-suffix.service';

@Component
export default class EmployeeMySuffixDetails extends Vue {
  @Inject('employeeService') private employeeService: () => EmployeeMySuffixService;
  public employee: IEmployeeMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployeeMySuffix(to.params.employeeId);
      }
    });
  }

  public retrieveEmployeeMySuffix(employeeId) {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
