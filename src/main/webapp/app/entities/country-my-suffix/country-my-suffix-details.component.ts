import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICountryMySuffix } from '@/shared/model/country-my-suffix.model';
import CountryMySuffixService from './country-my-suffix.service';

@Component
export default class CountryMySuffixDetails extends Vue {
  @Inject('countryService') private countryService: () => CountryMySuffixService;
  public country: ICountryMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.countryId) {
        vm.retrieveCountryMySuffix(to.params.countryId);
      }
    });
  }

  public retrieveCountryMySuffix(countryId) {
    this.countryService()
      .find(countryId)
      .then(res => {
        this.country = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
