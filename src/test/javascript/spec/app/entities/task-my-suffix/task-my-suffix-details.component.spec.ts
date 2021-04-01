/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TaskMySuffixDetailComponent from '@/entities/task-my-suffix/task-my-suffix-details.vue';
import TaskMySuffixClass from '@/entities/task-my-suffix/task-my-suffix-details.component';
import TaskMySuffixService from '@/entities/task-my-suffix/task-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TaskMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<TaskMySuffixClass>;
    let comp: TaskMySuffixClass;
    let taskServiceStub: SinonStubbedInstance<TaskMySuffixService>;

    beforeEach(() => {
      taskServiceStub = sinon.createStubInstance<TaskMySuffixService>(TaskMySuffixService);

      wrapper = shallowMount<TaskMySuffixClass>(TaskMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { taskService: () => taskServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTaskMySuffix = { id: 123 };
        taskServiceStub.find.resolves(foundTaskMySuffix);

        // WHEN
        comp.retrieveTaskMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.task).toBe(foundTaskMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTaskMySuffix = { id: 123 };
        taskServiceStub.find.resolves(foundTaskMySuffix);

        // WHEN
        comp.beforeRouteEnter({ params: { taskId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.task).toBe(foundTaskMySuffix);
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
