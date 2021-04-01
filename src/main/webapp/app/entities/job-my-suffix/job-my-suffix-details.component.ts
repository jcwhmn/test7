import { Component, Vue, Inject } from 'vue-property-decorator';

import { IJobMySuffix } from '@/shared/model/job-my-suffix.model';
import JobMySuffixService from './job-my-suffix.service';

@Component
export default class JobMySuffixDetails extends Vue {
  @Inject('jobService') private jobService: () => JobMySuffixService;
  public job: IJobMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.jobId) {
        vm.retrieveJobMySuffix(to.params.jobId);
      }
    });
  }

  public retrieveJobMySuffix(jobId) {
    this.jobService()
      .find(jobId)
      .then(res => {
        this.job = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
