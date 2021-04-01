/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import EmployeeMySuffixDetailComponent from '@/entities/employee-my-suffix/employee-my-suffix-details.vue';
import EmployeeMySuffixClass from '@/entities/employee-my-suffix/employee-my-suffix-details.component';
import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('EmployeeMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<EmployeeMySuffixClass>;
    let comp: EmployeeMySuffixClass;
    let employeeServiceStub: SinonStubbedInstance<EmployeeMySuffixService>;

    beforeEach(() => {
      employeeServiceStub = sinon.createStubInstance<EmployeeMySuffixService>(EmployeeMySuffixService);

      wrapper = shallowMount<EmployeeMySuffixClass>(EmployeeMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { employeeService: () => employeeServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEmployeeMySuffix = { id: 123 };
        employeeServiceStub.find.resolves(foundEmployeeMySuffix);

        // WHEN
        comp.retrieveEmployeeMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.employee).toBe(foundEmployeeMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEmployeeMySuffix = { id: 123 };
        employeeServiceStub.find.resolves(foundEmployeeMySuffix);

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
