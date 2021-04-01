/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import JobMySuffixDetailComponent from '@/entities/job-my-suffix/job-my-suffix-details.vue';
import JobMySuffixClass from '@/entities/job-my-suffix/job-my-suffix-details.component';
import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('JobMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<JobMySuffixClass>;
    let comp: JobMySuffixClass;
    let jobServiceStub: SinonStubbedInstance<JobMySuffixService>;

    beforeEach(() => {
      jobServiceStub = sinon.createStubInstance<JobMySuffixService>(JobMySuffixService);

      wrapper = shallowMount<JobMySuffixClass>(JobMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { jobService: () => jobServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundJobMySuffix = { id: 123 };
        jobServiceStub.find.resolves(foundJobMySuffix);

        // WHEN
        comp.retrieveJobMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.job).toBe(foundJobMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundJobMySuffix = { id: 123 };
        jobServiceStub.find.resolves(foundJobMySuffix);

        // WHEN
        comp.beforeRouteEnter({ params: { jobId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.job).toBe(foundJobMySuffix);
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
