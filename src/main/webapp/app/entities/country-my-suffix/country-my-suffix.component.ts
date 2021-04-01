import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICountryMySuffix } from '@/shared/model/country-my-suffix.model';

import CountryMySuffixService from './country-my-suffix.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class CountryMySuffix extends Vue {
  @Inject('countryService') private countryService: () => CountryMySuffixService;
  private removeId: number = null;

  public countries: ICountryMySuffix[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCountryMySuffixs();
  }

  public clear(): void {
    this.retrieveAllCountryMySuffixs();
  }

  public retrieveAllCountryMySuffixs(): void {
    this.isFetching = true;

    this.countryService()
      .retrieve()
      .then(
        res => {
          this.countries = res.data;
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

  public prepareRemove(instance: ICountryMySuffix): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCountryMySuffix(): void {
    this.countryService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A CountryMySuffix is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCountryMySuffixs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
