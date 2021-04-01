/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import JobMySuffixUpdateComponent from '@/entities/job-my-suffix/job-my-suffix-update.vue';
import JobMySuffixClass from '@/entities/job-my-suffix/job-my-suffix-update.component';
import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';

import TaskMySuffixService from '@/entities/task-my-suffix/task-my-suffix.service';

import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('JobMySuffix Management Update Component', () => {
    let wrapper: Wrapper<JobMySuffixClass>;
    let comp: JobMySuffixClass;
    let jobServiceStub: SinonStubbedInstance<JobMySuffixService>;

    beforeEach(() => {
      jobServiceStub = sinon.createStubInstance<JobMySuffixService>(JobMySuffixService);

      wrapper = shallowMount<JobMySuffixClass>(JobMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          jobService: () => jobServiceStub,

          taskService: () => new TaskMySuffixService(),

          employeeService: () => new EmployeeMySuffixService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.job = entity;
        jobServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.job = entity;
        jobServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundJobMySuffix = { id: 123 };
        jobServiceStub.find.resolves(foundJobMySuffix);
        jobServiceStub.retrieve.resolves([foundJobMySuffix]);

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
