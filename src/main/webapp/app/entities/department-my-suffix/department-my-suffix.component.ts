import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDepartmentMySuffix } from '@/shared/model/department-my-suffix.model';

import DepartmentMySuffixService from './department-my-suffix.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class DepartmentMySuffix extends Vue {
  @Inject('departmentService') private departmentService: () => DepartmentMySuffixService;
  private removeId: number = null;

  public departments: IDepartmentMySuffix[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllDepartmentMySuffixs();
  }

  public clear(): void {
    this.retrieveAllDepartmentMySuffixs();
  }

  public retrieveAllDepartmentMySuffixs(): void {
    this.isFetching = true;

    this.departmentService()
      .retrieve()
      .then(
        res => {
          this.departments = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IDepartmentMySuffix): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeDepartmentMySuffix(): void {
    this.departmentService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A DepartmentMySuffix is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllDepartmentMySuffixs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
