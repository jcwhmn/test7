/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import EmployeeMySuffixUpdateComponent from '@/entities/employee-my-suffix/employee-my-suffix-update.vue';
import EmployeeMySuffixClass from '@/entities/employee-my-suffix/employee-my-suffix-update.component';
import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';

import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';

import DepartmentMySuffixService from '@/entities/department-my-suffix/department-my-suffix.service';

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
  describe('EmployeeMySuffix Management Update Component', () => {
    let wrapper: Wrapper<EmployeeMySuffixClass>;
    let comp: EmployeeMySuffixClass;
    let employeeServiceStub: SinonStubbedInstance<EmployeeMySuffixService>;

    beforeEach(() => {
      employeeServiceStub = sinon.createStubInstance<EmployeeMySuffixService>(EmployeeMySuffixService);

      wrapper = shallowMount<EmployeeMySuffixClass>(EmployeeMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          employeeService: () => employeeServiceStub,

          jobService: () => new JobMySuffixService(),

          departmentService: () => new DepartmentMySuffixService(),
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
        comp.employee = entity;
        employeeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(employeeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.employee = entity;
        employeeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(employeeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEmployeeMySuffix = { id: 123 };
        employeeServiceStub.find.resolves(foundEmployeeMySuffix);
        employeeServiceStub.retrieve.resolves([foundEmployeeMySuffix]);

        // WHEN
        comp.beforeRouteEnter({ params: { employeeId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.employee).toBe(foundEmployeeMySuffix);
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
