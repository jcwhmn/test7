import { Component, Vue, Inject } from 'vue-property-decorator';

import CountryMySuffixService from '@/entities/country-my-suffix/country-my-suffix.service';
import { ICountryMySuffix } from '@/shared/model/country-my-suffix.model';

import { ILocationMySuffix, LocationMySuffix } from '@/shared/model/location-my-suffix.model';
import LocationMySuffixService from './location-my-suffix.service';

const validations: any = {
  location: {
    streetAddress: {},
    postalCode: {},
    city: {},
    stateProvince: {},
  },
};

@Component({
  validations,
})
export default class LocationMySuffixUpdate extends Vue {
  @Inject('locationService') private locationService: () => LocationMySuffixService;
  public location: ILocationMySuffix = new LocationMySuffix();

  @Inject('countryService') private countryService: () => CountryMySuffixService;

  public countries: ICountryMySuffix[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationId) {
        vm.retrieveLocationMySuffix(to.params.locationId);
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
    if (this.location.id) {
      this.locationService()
        .update(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A LocationMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.locationService()
        .create(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A LocationMySuffix is created with identifier ' + param.id;
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

  public retrieveLocationMySuffix(locationId): void {
    this.locationService()
      .find(locationId)
      .then(res => {
        this.location = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.countryService()
      .retrieve()
      .then(res => {
        this.countries = res.data;
      });
  }
}
