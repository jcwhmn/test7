/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CountryMySuffixDetailComponent from '@/entities/country-my-suffix/country-my-suffix-details.vue';
import CountryMySuffixClass from '@/entities/country-my-suffix/country-my-suffix-details.component';
import CountryMySuffixService from '@/entities/country-my-suffix/country-my-suffix.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('CountryMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<CountryMySuffixClass>;
    let comp: CountryMySuffixClass;
    let countryServiceStub: SinonStubbedInstance<CountryMySuffixService>;

    beforeEach(() => {
      countryServiceStub = sinon.createStubInstance<CountryMySuffixService>(CountryMySuffixService);

      wrapper = shallowMount<CountryMySuffixClass>(CountryMySuffixDetailComponent, {
        store,
        localVue,
        router,
        provide: { countryService: () => countryServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCountryMySuffix = { id: 123 };
        countryServiceStub.find.resolves(foundCountryMySuffix);

        // WHEN
        comp.retrieveCountryMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.country).toBe(foundCountryMySuffix);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCountryMySuffix = { id: 123 };
        countryServiceStub.find.resolves(foundCountryMySuffix);

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
