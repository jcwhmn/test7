/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import LocationMySuffixDetailComponent from '@/entities/location-my-suffix/location-my-suffix-details.vue';
import LocationMySuffixClass from '@/entities/location-my-suffix/location-my-suffix-details.component';
import LocationMySuffixService from '@/entities/location-my-suffix/location-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('LocationMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<LocationMySuffixClass>;
    let comp: LocationMySuffixClass;
    let locationServiceStub: SinonStubbedInstance<LocationMySuffixService>;

    beforeEach(() => {
      locationServiceStub = sinon.createStubInstance<LocationMySuffixService>(LocationMySuffixService);

      wrapper = shallowMount<LocationMySuffixClass>(LocationMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { locationService: () => locationServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLocationMySuffix = { id: 123 };
        locationServiceStub.find.resolves(foundLocationMySuffix);

        // WHEN
        comp.retrieveLocationMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.location).toBe(foundLocationMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLocationMySuffix = { id: 123 };
        locationServiceStub.find.resolves(foundLocationMySuffix);

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
