import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IJobHistoryMySuffix } from '@/shared/model/job-history-my-suffix.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import JobHistoryMySuffixService from './job-history-my-suffix.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class JobHistoryMySuffix extends mixins(JhiDataUtils) {
  @Inject('jobHistoryService') private jobHistoryService: () => JobHistoryMySuffixService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public infiniteId = +new Date();
  public links = {};

  public jobHistories: IJobHistoryMySuffix[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllJobHistoryMySuffixs();
  }

  public clear(): void {
    this.page = 1;
    this.links = {};
    this.infiniteId += 1;
    this.jobHistories = [];
    this.retrieveAllJobHistoryMySuffixs();
  }

  public reset(): void {
    this.page = 1;
    this.infiniteId += 1;
    this.jobHistories = [];
    this.retrieveAllJobHistoryMySuffixs();
  }

  public retrieveAllJobHistoryMySuffixs(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.jobHistoryService()
      .retrieve(paginationQuery)
      .then(
        res => {
          if (res.data && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.jobHistories.push(res.data[i]);
            }
            if (res.headers && res.headers['link']) {
              this.links = this.parseLinks(res.headers['link']);
            }
          }
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
          if (<any>this.$refs.infiniteLoading) {
            (<any>this.$refs.infiniteLoading).stateChanger.loaded();
            if (this.links !== {} && this.page > this.links['last']) {
              (<any>this.$refs.infiniteLoading).stateChanger.complete();
            }
          }
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IJobHistoryMySuffix): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeJobHistoryMySuffix(): void {
    this.jobHistoryService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A JobHistoryMySuffix is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.reset();
        this.closeDialog();
      });
  }

  public loadMore($state): void {
    if (!this.isFetching) {
      this.page++;
      this.transition();
    }
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllJobHistoryMySuffixs();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.reset();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
