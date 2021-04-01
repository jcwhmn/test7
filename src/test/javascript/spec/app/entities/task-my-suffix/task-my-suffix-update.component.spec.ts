/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import TaskMySuffixUpdateComponent from '@/entities/task-my-suffix/task-my-suffix-update.vue';
import TaskMySuffixClass from '@/entities/task-my-suffix/task-my-suffix-update.component';
import TaskMySuffixService from '@/entities/task-my-suffix/task-my-suffix.service';

import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';

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
  describe('TaskMySuffix Management Update Component', () => {
    let wrapper: Wrapper<TaskMySuffixClass>;
    let comp: TaskMySuffixClass;
    let taskServiceStub: SinonStubbedInstance<TaskMySuffixService>;

    beforeEach(() => {
      taskServiceStub = sinon.createStubInstance<TaskMySuffixService>(TaskMySuffixService);

      wrapper = shallowMount<TaskMySuffixClass>(TaskMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          taskService: () => taskServiceStub,

          jobService: () => new JobMySuffixService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.task = entity;
        taskServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taskServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.task = entity;
        taskServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taskServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTaskMySuffix = { id: 123 };
        taskServiceStub.find.resolves(foundTaskMySuffix);
        taskServiceStub.retrieve.resolves([foundTaskMySuffix]);

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
