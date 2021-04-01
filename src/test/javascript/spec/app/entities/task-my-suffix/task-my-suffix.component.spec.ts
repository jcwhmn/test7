/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TaskMySuffixComponent from '@/entities/task-my-suffix/task-my-suffix.vue';
import TaskMySuffixClass from '@/entities/task-my-suffix/task-my-suffix.component';
import TaskMySuffixService from '@/entities/task-my-suffix/task-my-suffix.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
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
  describe('TaskMySuffix Management Component', () => {
    let wrapper: Wrapper<TaskMySuffixClass>;
    let comp: TaskMySuffixClass;
    let taskServiceStub: SinonStubbedInstance<TaskMySuffixService>;

    beforeEach(() => {
      taskServiceStub = sinon.createStubInstance<TaskMySuffixService>(TaskMySuffixService);
      taskServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TaskMySuffixClass>(TaskMySuffixComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          taskService: () => taskServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      taskServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTaskMySuffixs();
      await comp.$nextTick();

      // THEN
      expect(taskServiceStub.retrieve.called).toBeTruthy();
      expect(comp.tasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      taskServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeTaskMySuffix();
      await comp.$nextTick();

      // THEN
      expect(taskServiceStub.delete.called).toBeTruthy();
      expect(taskServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
