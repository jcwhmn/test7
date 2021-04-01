/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import RegionMySuffixUpdateComponent from '@/entities/region-my-suffix/region-my-suffix-update.vue';
import RegionMySuffixClass from '@/entities/region-my-suffix/region-my-suffix-update.component';
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
  describe('RegionMySuffix Management Update Component', () => {
    let wrapper: Wrapper<RegionMySuffixClass>;
    let comp: RegionMySuffixClass;
    let regionServiceStub: SinonStubbedInstance<RegionMySuffixService>;

    beforeEach(() => {
      regionServiceStub = sinon.createStubInstance<RegionMySuffixService>(RegionMySuffixService);

      wrapper = shallowMount<RegionMySuffixClass>(RegionMySuffixUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          regionService: () => regionServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.region = entity;
        regionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(regionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.region = entity;
        regionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(regionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRegionMySuffix = { id: 123 };
        regionServiceStub.find.resolves(foundRegionMySuffix);
        regionServiceStub.retrieve.resolves([foundRegionMySuffix]);

        // WHEN
        comp.beforeRouteEnter({ params: { regionId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.region).toBe(foundRegionMySuffix);
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
