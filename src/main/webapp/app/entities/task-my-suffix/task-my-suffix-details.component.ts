import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITaskMySuffix } from '@/shared/model/task-my-suffix.model';
import TaskMySuffixService from './task-my-suffix.service';

@Component
export default class TaskMySuffixDetails extends Vue {
  @Inject('taskService') private taskService: () => TaskMySuffixService;
  public task: ITaskMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taskId) {
        vm.retrieveTaskMySuffix(to.params.taskId);
      }
    });
  }

  public retrieveTaskMySuffix(taskId) {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
