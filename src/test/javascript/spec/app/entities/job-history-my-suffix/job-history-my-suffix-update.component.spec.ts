/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import JobHistoryMySuffixUpdateComponent from '@/entities/job-history-my-suffix/job-history-my-suffix-update.vue';
import JobHistoryMySuffixClass from '@/entities/job-history-my-suffix/job-history-my-suffix-update.component';
import JobHistoryMySuffixService from '@/entities/job-history-my-suffix/job-history-my-suffix.service';

import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';

import DepartmentMySuffixService from '@/entities/department-my-suffix/department-my-suffix.service';

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
  describe('JobHistoryMySuffix Management Update Component', () => {
    let wrapper: Wrapper<JobHistoryMySuffixClass>;
    let comp: JobHistoryMySuffixClass;
    let jobHistoryServiceStub: SinonStubbedInstance<JobHistoryMySuffixService>;

    beforeEach(() => {
      jobHistoryServiceStub = sinon.createStubInstance<JobHistoryMySuffixService>(JobHistoryMySuffixService);

      wrapper = shallowMount<JobHistoryMySuffixClass>(JobHistoryMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          jobHistoryService: () => jobHistoryServiceStub,

          jobService: () => new JobMySuffixService(),

          departmentService: () => new DepartmentMySuffixService(),

          employeeService: () => new EmployeeMySuffixService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.jobHistory = entity;
        jobHistoryServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobHistoryServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.jobHistory = entity;
        jobHistoryServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobHistoryServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundJobHistoryMySuffix = { id: 123 };
        jobHistoryServiceStub.find.resolves(foundJobHistoryMySuffix);
        jobHistoryServiceStub.retrieve.resolves([foundJobHistoryMySuffix]);

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
