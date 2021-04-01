import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILocationMySuffix } from '@/shared/model/location-my-suffix.model';
import LocationMySuffixService from './location-my-suffix.service';

@Component
export default class LocationMySuffixDetails extends Vue {
  @Inject('locationService') private locationService: () => LocationMySuffixService;
  public location: ILocationMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationId) {
        vm.retrieveLocationMySuffix(to.params.locationId);
      }
    });
  }

  public retrieveLocationMySuffix(locationId) {
    this.locationService()
      .find(locationId)
      .then(res => {
        this.location = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
