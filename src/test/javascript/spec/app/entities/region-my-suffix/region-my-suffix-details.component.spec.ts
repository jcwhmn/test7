/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import RegionMySuffixDetailComponent from '@/entities/region-my-suffix/region-my-suffix-details.vue';
import RegionMySuffixClass from '@/entities/region-my-suffix/region-my-suffix-details.component';
import RegionMySuffixService from '@/entities/region-my-suffix/region-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('RegionMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<RegionMySuffixClass>;
    let comp: RegionMySuffixClass;
    let regionServiceStub: SinonStubbedInstance<RegionMySuffixService>;

    beforeEach(() => {
      regionServiceStub = sinon.createStubInstance<RegionMySuffixService>(RegionMySuffixService);

      wrapper = shallowMount<RegionMySuffixClass>(RegionMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { regionService: () => regionServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRegionMySuffix = { id: 123 };
        regionServiceStub.find.resolves(foundRegionMySuffix);

        // WHEN
        comp.retrieveRegionMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.region).toBe(foundRegionMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRegionMySuffix = { id: 123 };
        regionServiceStub.find.resolves(foundRegionMySuffix);

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
