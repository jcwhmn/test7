/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import CountryMySuffixUpdateComponent from '@/entities/country-my-suffix/country-my-suffix-update.vue';
import CountryMySuffixClass from '@/entities/country-my-suffix/country-my-suffix-update.component';
import CountryMySuffixService from '@/entities/country-my-suffix/country-my-suffix.service';

import RegionMySuffixService from '@/entities/region-my-suffix/region-my-suffix.service';

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
  describe('CountryMySuffix Management Update Component', () => {
    let wrapper: Wrapper<CountryMySuffixClass>;
    let comp: CountryMySuffixClass;
    let countryServiceStub: SinonStubbedInstance<CountryMySuffixService>;

    beforeEach(() => {
      countryServiceStub = sinon.createStubInstance<CountryMySuffixService>(CountryMySuffixService);

      wrapper = shallowMount<CountryMySuffixClass>(CountryMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          countryService: () => countryServiceStub,

          regionService: () => new RegionMySuffixService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.country = entity;
        countryServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(countryServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.country = entity;
        countryServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(countryServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCountryMySuffix = { id: 123 };
        countryServiceStub.find.resolves(foundCountryMySuffix);
        countryServiceStub.retrieve.resolves([foundCountryMySuffix]);

        // WHEN
        comp.beforeRouteEnter({ params: { countryId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.country).toBe(foundCountryMySuffix);
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
