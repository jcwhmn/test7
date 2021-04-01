import { Component, Vue, Inject } from 'vue-property-decorator';

import { IDepartmentMySuffix } from '@/shared/model/department-my-suffix.model';
import DepartmentMySuffixService from './department-my-suffix.service';

@Component
export default class DepartmentMySuffixDetails extends Vue {
  @Inject('departmentService') private departmentService: () => DepartmentMySuffixService;
  public department: IDepartmentMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.departmentId) {
        vm.retrieveDepartmentMySuffix(to.params.departmentId);
      }
    });
  }

  public retrieveDepartmentMySuffix(departmentId) {
    this.departmentService()
      .find(departmentId)
      .then(res => {
        this.department = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
