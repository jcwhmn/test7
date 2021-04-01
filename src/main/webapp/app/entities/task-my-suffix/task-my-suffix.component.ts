import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITaskMySuffix } from '@/shared/model/task-my-suffix.model';

import TaskMySuffixService from './task-my-suffix.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TaskMySuffix extends Vue {
  @Inject('taskService') private taskService: () => TaskMySuffixService;
  private removeId: number = null;

  public tasks: ITaskMySuffix[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTaskMySuffixs();
  }

  public clear(): void {
    this.retrieveAllTaskMySuffixs();
  }

  public retrieveAllTaskMySuffixs(): void {
    this.isFetching = true;

    this.taskService()
      .retrieve()
      .then(
        res => {
          this.tasks = res.data;
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

  public prepareRemove(instance: ITaskMySuffix): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTaskMySuffix(): void {
    this.taskService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A TaskMySuffix is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllTaskMySuffixs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
