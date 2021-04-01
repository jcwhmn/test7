/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import JobHistoryMySuffixComponent from '@/entities/job-history-my-suffix/job-history-my-suffix.vue';
import JobHistoryMySuffixClass from '@/entities/job-history-my-suffix/job-history-my-suffix.component';
import JobHistoryMySuffixService from '@/entities/job-history-my-suffix/job-history-my-suffix.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('JobHistoryMySuffix Management Component', () => {
    let wrapper: Wrapper<JobHistoryMySuffixClass>;
    let comp: JobHistoryMySuffixClass;
    let jobHistoryServiceStub: SinonStubbedInstance<JobHistoryMySuffixService>;

    beforeEach(() => {
      jobHistoryServiceStub = sinon.createStubInstance<JobHistoryMySuffixService>(JobHistoryMySuffixService);
      jobHistoryServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<JobHistoryMySuffixClass>(JobHistoryMySuffixComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          jobHistoryService: () => jobHistoryServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      jobHistoryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllJobHistoryMySuffixs();
      await comp.$nextTick();

      // THEN
      expect(jobHistoryServiceStub.retrieve.called).toBeTruthy();
      expect(comp.jobHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      jobHistoryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(jobHistoryServiceStub.retrieve.called).toBeTruthy();
      expect(comp.jobHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      jobHistoryServiceStub.retrieve.reset();
      jobHistoryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(jobHistoryServiceStub.retrieve.callCount).toEqual(2);
      expect(comp.page).toEqual(1);
      expect(comp.jobHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      jobHistoryServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeJobHistoryMySuffix();
      await comp.$nextTick();

      // THEN
      expect(jobHistoryServiceStub.delete.called).toBeTruthy();
      expect(jobHistoryServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
