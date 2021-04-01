/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EmployeeMySuffixComponent from '@/entities/employee-my-suffix/employee-my-suffix.vue';
import EmployeeMySuffixClass from '@/entities/employee-my-suffix/employee-my-suffix.component';
import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';

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
  describe('EmployeeMySuffix Management Component', () => {
    let wrapper: Wrapper<EmployeeMySuffixClass>;
    let comp: EmployeeMySuffixClass;
    let employeeServiceStub: SinonStubbedInstance<EmployeeMySuffixService>;

    beforeEach(() => {
      employeeServiceStub = sinon.createStubInstance<EmployeeMySuffixService>(EmployeeMySuffixService);
      employeeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EmployeeMySuffixClass>(EmployeeMySuffixComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          employeeService: () => employeeServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      employeeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEmployeeMySuffixs();
      await comp.$nextTick();

      // THEN
      expect(employeeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      employeeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(employeeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      employeeServiceStub.retrieve.reset();
      employeeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(employeeServiceStub.retrieve.callCount).toEqual(2);
      expect(comp.page).toEqual(1);
      expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
      employeeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEmployeeMySuffix();
      await comp.$nextTick();

      // THEN
      expect(employeeServiceStub.delete.called).toBeTruthy();
      expect(employeeServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
