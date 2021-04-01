import { Component, Vue, Inject } from 'vue-property-decorator';

import { IJobHistoryMySuffix } from '@/shared/model/job-history-my-suffix.model';
import JobHistoryMySuffixService from './job-history-my-suffix.service';

@Component
export default class JobHistoryMySuffixDetails extends Vue {
  @Inject('jobHistoryService') private jobHistoryService: () => JobHistoryMySuffixService;
  public jobHistory: IJobHistoryMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.jobHistoryId) {
        vm.retrieveJobHistoryMySuffix(to.params.jobHistoryId);
      }
    });
  }

  public retrieveJobHistoryMySuffix(jobHistoryId) {
    this.jobHistoryService()
      .find(jobHistoryId)
      .then(res => {
        this.jobHistory = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
