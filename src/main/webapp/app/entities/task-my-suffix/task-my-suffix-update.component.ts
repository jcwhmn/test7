import { Component, Vue, Inject } from 'vue-property-decorator';

import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';
import { IJobMySuffix } from '@/shared/model/job-my-suffix.model';

import { ITaskMySuffix, TaskMySuffix } from '@/shared/model/task-my-suffix.model';
import TaskMySuffixService from './task-my-suffix.service';

const validations: any = {
  task: {
    title: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class TaskMySuffixUpdate extends Vue {
  @Inject('taskService') private taskService: () => TaskMySuffixService;
  public task: ITaskMySuffix = new TaskMySuffix();

  @Inject('jobService') private jobService: () => JobMySuffixService;

  public jobs: IJobMySuffix[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taskId) {
        vm.retrieveTaskMySuffix(to.params.taskId);
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
    if (this.task.id) {
      this.taskService()
        .update(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TaskMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.taskService()
        .create(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TaskMySuffix is created with identifier ' + param.id;
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

  public retrieveTaskMySuffix(taskId): void {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
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
  }
}
