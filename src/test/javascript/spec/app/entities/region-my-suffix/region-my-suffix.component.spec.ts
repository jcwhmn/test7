/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import RegionMySuffixComponent from '@/entities/region-my-suffix/region-my-suffix.vue';
import RegionMySuffixClass from '@/entities/region-my-suffix/region-my-suffix.component';
import RegionMySuffixService from '@/entities/region-my-suffix/region-my-suffix.service';

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
  describe('RegionMySuffix Management Component', () => {
    let wrapper: Wrapper<RegionMySuffixClass>;
    let comp: RegionMySuffixClass;
    let regionServiceStub: SinonStubbedInstance<RegionMySuffixService>;

    beforeEach(() => {
      regionServiceStub = sinon.createStubInstance<RegionMySuffixService>(RegionMySuffixService);
      regionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<RegionMySuffixClass>(RegionMySuffixComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          regionService: () => regionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      regionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllRegionMySuffixs();
      await comp.$nextTick();

      // THEN
      expect(regionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.regions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      regionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeRegionMySuffix();
      await comp.$nextTick();

      // THEN
      expect(regionServiceStub.delete.called).toBeTruthy();
      expect(regionServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
