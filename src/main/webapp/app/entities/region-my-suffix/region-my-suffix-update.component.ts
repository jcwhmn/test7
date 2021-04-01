import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRegionMySuffix, RegionMySuffix } from '@/shared/model/region-my-suffix.model';
import RegionMySuffixService from './region-my-suffix.service';

const validations: any = {
  region: {
    regionName: {},
  },
};

@Component({
  validations,
})
export default class RegionMySuffixUpdate extends Vue {
  @Inject('regionService') private regionService: () => RegionMySuffixService;
  public region: IRegionMySuffix = new RegionMySuffix();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.regionId) {
        vm.retrieveRegionMySuffix(to.params.regionId);
      }
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
    if (this.region.id) {
      this.regionService()
        .update(this.region)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A RegionMySuffix is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.regionService()
        .create(this.region)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A RegionMySuffix is created with identifier ' + param.id;
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

  public retrieveRegionMySuffix(regionId): void {
    this.regionService()
      .find(regionId)
      .then(res => {
        this.region = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
