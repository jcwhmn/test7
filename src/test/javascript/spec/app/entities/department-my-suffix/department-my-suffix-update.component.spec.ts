/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import DepartmentMySuffixUpdateComponent from '@/entities/department-my-suffix/department-my-suffix-update.vue';
import DepartmentMySuffixClass from '@/entities/department-my-suffix/department-my-suffix-update.component';
import DepartmentMySuffixService from '@/entities/department-my-suffix/department-my-suffix.service';

import LocationMySuffixService from '@/entities/location-my-suffix/location-my-suffix.service';

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
  describe('DepartmentMySuffix Management Update Component', () => {
    let wrapper: Wrapper<DepartmentMySuffixClass>;
    let comp: DepartmentMySuffixClass;
    let departmentServiceStub: SinonStubbedInstance<DepartmentMySuffixService>;

    beforeEach(() => {
      departmentServiceStub = sinon.createStubInstance<DepartmentMySuffixService>(DepartmentMySuffixService);

      wrapper = shallowMount<DepartmentMySuffixClass>(DepartmentMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          departmentService: () => departmentServiceStub,

          locationService: () => new LocationMySuffixService(),

          employeeService: () => new EmployeeMySuffixService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.department = entity;
        departmentServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(departmentServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.department = entity;
        departmentServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(departmentServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundDepartmentMySuffix = { id: 123 };
        departmentServiceStub.find.resolves(foundDepartmentMySuffix);
        departmentServiceStub.retrieve.resolves([foundDepartmentMySuffix]);

        // WHEN
        comp.beforeRouteEnter({ params: { departmentId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.department).toBe(foundDepartmentMySuffix);
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
