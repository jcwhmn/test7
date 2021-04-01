import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRegionMySuffix } from '@/shared/model/region-my-suffix.model';

import RegionMySuffixService from './region-my-suffix.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class RegionMySuffix extends Vue {
  @Inject('regionService') private regionService: () => RegionMySuffixService;
  private removeId: number = null;

  public regions: IRegionMySuffix[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllRegionMySuffixs();
  }

  public clear(): void {
    this.retrieveAllRegionMySuffixs();
  }

  public retrieveAllRegionMySuffixs(): void {
    this.isFetching = true;

    this.regionService()
      .retrieve()
      .then(
        res => {
          this.regions = res.data;
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

  public prepareRemove(instance: IRegionMySuffix): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeRegionMySuffix(): void {
    this.regionService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A RegionMySuffix is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllRegionMySuffixs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
