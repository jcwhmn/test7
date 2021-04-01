/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import LocationMySuffixComponent from '@/entities/location-my-suffix/location-my-suffix.vue';
import LocationMySuffixClass from '@/entities/location-my-suffix/location-my-suffix.component';
import LocationMySuffixService from '@/entities/location-my-suffix/location-my-suffix.service';

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
  describe('LocationMySuffix Management Component', () => {
    let wrapper: Wrapper<LocationMySuffixClass>;
    let comp: LocationMySuffixClass;
    let locationServiceStub: SinonStubbedInstance<LocationMySuffixService>;

    beforeEach(() => {
      locationServiceStub = sinon.createStubInstance<LocationMySuffixService>(LocationMySuffixService);
      locationServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<LocationMySuffixClass>(LocationMySuffixComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          locationService: () => locationServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      locationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllLocationMySuffixs();
      await comp.$nextTick();

      // THEN
      expect(locationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      locationServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeLocationMySuffix();
      await comp.$nextTick();

      // THEN
      expect(locationServiceStub.delete.called).toBeTruthy();
      expect(locationServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
