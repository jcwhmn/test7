/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import LocationMySuffixUpdateComponent from '@/entities/location-my-suffix/location-my-suffix-update.vue';
import LocationMySuffixClass from '@/entities/location-my-suffix/location-my-suffix-update.component';
import LocationMySuffixService from '@/entities/location-my-suffix/location-my-suffix.service';

import CountryMySuffixService from '@/entities/country-my-suffix/country-my-suffix.service';

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
  describe('LocationMySuffix Management Update Component', () => {
    let wrapper: Wrapper<LocationMySuffixClass>;
    let comp: LocationMySuffixClass;
    let locationServiceStub: SinonStubbedInstance<LocationMySuffixService>;

    beforeEach(() => {
      locationServiceStub = sinon.createStubInstance<LocationMySuffixService>(LocationMySuffixService);

      wrapper = shallowMount<LocationMySuffixClass>(LocationMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          locationService: () => locationServiceStub,

          countryService: () => new CountryMySuffixService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.location = entity;
        locationServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(locationServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.location = entity;
        locationServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(locationServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLocationMySuffix = { id: 123 };
        locationServiceStub.find.resolves(foundLocationMySuffix);
        locationServiceStub.retrieve.resolves([foundLocationMySuffix]);

        // WHEN
        comp.beforeRouteEnter({ params: { locationId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.location).toBe(foundLocationMySuffix);
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
