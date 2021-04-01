/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CountryMySuffixComponent from '@/entities/country-my-suffix/country-my-suffix.vue';
import CountryMySuffixClass from '@/entities/country-my-suffix/country-my-suffix.component';
import CountryMySuffixService from '@/entities/country-my-suffix/country-my-suffix.service';

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
  describe('CountryMySuffix Management Component', () => {
    let wrapper: Wrapper<CountryMySuffixClass>;
    let comp: CountryMySuffixClass;
    let countryServiceStub: SinonStubbedInstance<CountryMySuffixService>;

    beforeEach(() => {
      countryServiceStub = sinon.createStubInstance<CountryMySuffixService>(CountryMySuffixService);
      countryServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CountryMySuffixClass>(CountryMySuffixComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          countryService: () => countryServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      countryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCountryMySuffixs();
      await comp.$nextTick();

      // THEN
      expect(countryServiceStub.retrieve.called).toBeTruthy();
      expect(comp.countries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      countryServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCountryMySuffix();
      await comp.$nextTick();

      // THEN
      expect(countryServiceStub.delete.called).toBeTruthy();
      expect(countryServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
