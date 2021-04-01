import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRegionMySuffix } from '@/shared/model/region-my-suffix.model';
import RegionMySuffixService from './region-my-suffix.service';

@Component
export default class RegionMySuffixDetails extends Vue {
  @Inject('regionService') private regionService: () => RegionMySuffixService;
  public region: IRegionMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.regionId) {
        vm.retrieveRegionMySuffix(to.params.regionId);
      }
    });
  }

  public retrieveRegionMySuffix(regionId) {
    this.regionService()
      .find(regionId)
      .then(res => {
        this.region = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
