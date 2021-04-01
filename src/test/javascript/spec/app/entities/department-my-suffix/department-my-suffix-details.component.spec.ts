/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import DepartmentMySuffixDetailComponent from '@/entities/department-my-suffix/department-my-suffix-details.vue';
import DepartmentMySuffixClass from '@/entities/department-my-suffix/department-my-suffix-details.component';
import DepartmentMySuffixService from '@/entities/department-my-suffix/department-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('DepartmentMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<DepartmentMySuffixClass>;
    let comp: DepartmentMySuffixClass;
    let departmentServiceStub: SinonStubbedInstance<DepartmentMySuffixService>;

    beforeEach(() => {
      departmentServiceStub = sinon.createStubInstance<DepartmentMySuffixService>(DepartmentMySuffixService);

      wrapper = shallowMount<DepartmentMySuffixClass>(DepartmentMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { departmentService: () => departmentServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundDepartmentMySuffix = { id: 123 };
        departmentServiceStub.find.resolves(foundDepartmentMySuffix);

        // WHEN
        comp.retrieveDepartmentMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.department).toBe(foundDepartmentMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundDepartmentMySuffix = { id: 123 };
        departmentServiceStub.find.resolves(foundDepartmentMySuffix);

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
