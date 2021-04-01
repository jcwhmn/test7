import { Component, Vue, Inject } from 'vue-property-decorator';

import RegionMySuffixService from '@/entities/region-my-suffix/region-my-suffix.service';
import { IRegionMySuffix } from '@/shared/model/region-my-suffix.model';

import { ICountryMySuffix, CountryMySuffix } from '@/shared/model/country-my-suffix.model';
import CountryMySuffixService from './country-my-suffix.service';

const validations: any = {
  country: {
    countryName: {},
  },
};

@Component({
  validations,
})
export default class CountryMySuffixUpdate extends Vue {
  @Inject('countryService') private countryService: () => CountryMySuffixService;
  public country: ICountryMySuffix = new CountryMySuffix();

  @Inject('regionService') private regionService: () => RegionMySuffixService;

  public regions: IRegionMySuffix[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.countryId) {
        vm.retrieveCountryMySuffix(to.params.countryId);
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
    if (this.country.id) {
      this.countryService()
        .update(this.country)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A CountryMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.countryService()
        .create(this.country)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A CountryMySuffix is created with identifier ' + param.id;
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

  public retrieveCountryMySuffix(countryId): void {
    this.countryService()
      .find(countryId)
      .then(res => {
        this.country = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.regionService()
      .retrieve()
      .then(res => {
        this.regions = res.data;
      });
  }
}
