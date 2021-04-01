/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import JobHistoryMySuffixDetailComponent from '@/entities/job-history-my-suffix/job-history-my-suffix-details.vue';
import JobHistoryMySuffixClass from '@/entities/job-history-my-suffix/job-history-my-suffix-details.component';
import JobHistoryMySuffixService from '@/entities/job-history-my-suffix/job-history-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('JobHistoryMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<JobHistoryMySuffixClass>;
    let comp: JobHistoryMySuffixClass;
    let jobHistoryServiceStub: SinonStubbedInstance<JobHistoryMySuffixService>;

    beforeEach(() => {
      jobHistoryServiceStub = sinon.createStubInstance<JobHistoryMySuffixService>(JobHistoryMySuffixService);

      wrapper = shallowMount<JobHistoryMySuffixClass>(JobHistoryMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { jobHistoryService: () => jobHistoryServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundJobHistoryMySuffix = { id: 123 };
        jobHistoryServiceStub.find.resolves(foundJobHistoryMySuffix);

        // WHEN
        comp.retrieveJobHistoryMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.jobHistory).toBe(foundJobHistoryMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundJobHistoryMySuffix = { id: 123 };
        jobHistoryServiceStub.find.resolves(foundJobHistoryMySuffix);

        // WHEN
        comp.beforeRouteEnter({ params: { jobHistoryId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.jobHistory).toBe(foundJobHistoryMySuffix);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
