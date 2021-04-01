// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import Vue2Filters from 'vue2-filters';
import { ToastPlugin } from 'bootstrap-vue';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import JhiSortIndicatorComponent from './shared/sort/jhi-sort-indicator.vue';
import InfiniteLoading from 'vue-infinite-loading';
import ActivateService from './account/activate/activate.service';
import RegisterService from './account/register/register.service';
import UserManagementService from '@/admin/user-management/user-management.service';
import LoginService from './account/login.service';
import AccountService from './account/account.service';

import '../content/scss/vendor.scss';

import UserOAuth2Service from '@/entities/user/user.oauth2.service';
/* tslint:disable */

import RegionMySuffixService from '@/entities/region-my-suffix/region-my-suffix.service';
import CountryMySuffixService from '@/entities/country-my-suffix/country-my-suffix.service';
import LocationMySuffixService from '@/entities/location-my-suffix/location-my-suffix.service';
import DepartmentMySuffixService from '@/entities/department-my-suffix/department-my-suffix.service';
import TaskMySuffixService from '@/entities/task-my-suffix/task-my-suffix.service';
import EmployeeMySuffixService from '@/entities/employee-my-suffix/employee-my-suffix.service';
import JobMySuffixService from '@/entities/job-my-suffix/job-my-suffix.service';
import JobHistoryMySuffixService from '@/entities/job-history-my-suffix/job-history-my-suffix.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

/* tslint:enable */
Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.use(Vue2Filters);
Vue.use(ToastPlugin);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.component('jhi-sort-indicator', JhiSortIndicatorComponent);
Vue.component('infinite-loading', InfiniteLoading);
const store = config.initVueXStore(Vue);

const loginService = new LoginService();
const accountService = new AccountService(store, router);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    });
  } else {
    // no authorities, so just proceed
    next();
  }
});

/* tslint:disable */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userService: () => new UserManagementService(),

    userOAuth2Service: () => new UserOAuth2Service(),
    regionService: () => new RegionMySuffixService(),
    countryService: () => new CountryMySuffixService(),
    locationService: () => new LocationMySuffixService(),
    departmentService: () => new DepartmentMySuffixService(),
    taskService: () => new TaskMySuffixService(),
    employeeService: () => new EmployeeMySuffixService(),
    jobService: () => new JobMySuffixService(),
    jobHistoryService: () => new JobHistoryMySuffixService(),
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
  },
  store,
});
