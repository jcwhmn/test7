import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILocationMySuffix } from '@/shared/model/location-my-suffix.model';

import LocationMySuffixService from './location-my-suffix.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class LocationMySuffix extends Vue {
  @Inject('locationService') private locationService: () => LocationMySuffixService;
  private removeId: number = null;

  public locations: ILocationMySuffix[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLocationMySuffixs();
  }

  public clear(): void {
    this.retrieveAllLocationMySuffixs();
  }

  public retrieveAllLocationMySuffixs(): void {
    this.isFetching = true;

    this.locationService()
      .retrieve()
      .then(
        res => {
          this.locations = res.data;
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

  public prepareRemove(instance: ILocationMySuffix): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLocationMySuffix(): void {
    this.locationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A LocationMySuffix is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllLocationMySuffixs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
