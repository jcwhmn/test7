import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const RegionMySuffix = () => import('@/entities/region-my-suffix/region-my-suffix.vue');
// prettier-ignore
const RegionMySuffixUpdate = () => import('@/entities/region-my-suffix/region-my-suffix-update.vue');
// prettier-ignore
const RegionMySuffixDetails = () => import('@/entities/region-my-suffix/region-my-suffix-details.vue');
// prettier-ignore
const CountryMySuffix = () => import('@/entities/country-my-suffix/country-my-suffix.vue');
// prettier-ignore
const CountryMySuffixUpdate = () => import('@/entities/country-my-suffix/country-my-suffix-update.vue');
// prettier-ignore
const CountryMySuffixDetails = () => import('@/entities/country-my-suffix/country-my-suffix-details.vue');
// prettier-ignore
const LocationMySuffix = () => import('@/entities/location-my-suffix/location-my-suffix.vue');
// prettier-ignore
const LocationMySuffixUpdate = () => import('@/entities/location-my-suffix/location-my-suffix-update.vue');
// prettier-ignore
const LocationMySuffixDetails = () => import('@/entities/location-my-suffix/location-my-suffix-details.vue');
// prettier-ignore
const DepartmentMySuffix = () => import('@/entities/department-my-suffix/department-my-suffix.vue');
// prettier-ignore
const DepartmentMySuffixUpdate = () => import('@/entities/department-my-suffix/department-my-suffix-update.vue');
// prettier-ignore
const DepartmentMySuffixDetails = () => import('@/entities/department-my-suffix/department-my-suffix-details.vue');
// prettier-ignore
const TaskMySuffix = () => import('@/entities/task-my-suffix/task-my-suffix.vue');
// prettier-ignore
const TaskMySuffixUpdate = () => import('@/entities/task-my-suffix/task-my-suffix-update.vue');
// prettier-ignore
const TaskMySuffixDetails = () => import('@/entities/task-my-suffix/task-my-suffix-details.vue');
// prettier-ignore
const EmployeeMySuffix = () => import('@/entities/employee-my-suffix/employee-my-suffix.vue');
// prettier-ignore
const EmployeeMySuffixUpdate = () => import('@/entities/employee-my-suffix/employee-my-suffix-update.vue');
// prettier-ignore
const EmployeeMySuffixDetails = () => import('@/entities/employee-my-suffix/employee-my-suffix-details.vue');
// prettier-ignore
const JobMySuffix = () => import('@/entities/job-my-suffix/job-my-suffix.vue');
// prettier-ignore
const JobMySuffixUpdate = () => import('@/entities/job-my-suffix/job-my-suffix-update.vue');
// prettier-ignore
const JobMySuffixDetails = () => import('@/entities/job-my-suffix/job-my-suffix-details.vue');
// prettier-ignore
const JobHistoryMySuffix = () => import('@/entities/job-history-my-suffix/job-history-my-suffix.vue');
// prettier-ignore
const JobHistoryMySuffixUpdate = () => import('@/entities/job-history-my-suffix/job-history-my-suffix-update.vue');
// prettier-ignore
const JobHistoryMySuffixDetails = () => import('@/entities/job-history-my-suffix/job-history-my-suffix-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/region-my-suffix',
    name: 'RegionMySuffix',
    component: RegionMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/region-my-suffix/new',
    name: 'RegionMySuffixCreate',
    component: RegionMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/region-my-suffix/:regionId/edit',
    name: 'RegionMySuffixEdit',
    component: RegionMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/region-my-suffix/:regionId/view',
    name: 'RegionMySuffixView',
    component: RegionMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-my-suffix',
    name: 'CountryMySuffix',
    component: CountryMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-my-suffix/new',
    name: 'CountryMySuffixCreate',
    component: CountryMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-my-suffix/:countryId/edit',
    name: 'CountryMySuffixEdit',
    component: CountryMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/country-my-suffix/:countryId/view',
    name: 'CountryMySuffixView',
    component: CountryMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-my-suffix',
    name: 'LocationMySuffix',
    component: LocationMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-my-suffix/new',
    name: 'LocationMySuffixCreate',
    component: LocationMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-my-suffix/:locationId/edit',
    name: 'LocationMySuffixEdit',
    component: LocationMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/location-my-suffix/:locationId/view',
    name: 'LocationMySuffixView',
    component: LocationMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department-my-suffix',
    name: 'DepartmentMySuffix',
    component: DepartmentMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department-my-suffix/new',
    name: 'DepartmentMySuffixCreate',
    component: DepartmentMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department-my-suffix/:departmentId/edit',
    name: 'DepartmentMySuffixEdit',
    component: DepartmentMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/department-my-suffix/:departmentId/view',
    name: 'DepartmentMySuffixView',
    component: DepartmentMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/task-my-suffix',
    name: 'TaskMySuffix',
    component: TaskMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/task-my-suffix/new',
    name: 'TaskMySuffixCreate',
    component: TaskMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/task-my-suffix/:taskId/edit',
    name: 'TaskMySuffixEdit',
    component: TaskMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/task-my-suffix/:taskId/view',
    name: 'TaskMySuffixView',
    component: TaskMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/employee-my-suffix',
    name: 'EmployeeMySuffix',
    component: EmployeeMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/employee-my-suffix/new',
    name: 'EmployeeMySuffixCreate',
    component: EmployeeMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/employee-my-suffix/:employeeId/edit',
    name: 'EmployeeMySuffixEdit',
    component: EmployeeMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/employee-my-suffix/:employeeId/view',
    name: 'EmployeeMySuffixView',
    component: EmployeeMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-my-suffix',
    name: 'JobMySuffix',
    component: JobMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-my-suffix/new',
    name: 'JobMySuffixCreate',
    component: JobMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-my-suffix/:jobId/edit',
    name: 'JobMySuffixEdit',
    component: JobMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-my-suffix/:jobId/view',
    name: 'JobMySuffixView',
    component: JobMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-history-my-suffix',
    name: 'JobHistoryMySuffix',
    component: JobHistoryMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-history-my-suffix/new',
    name: 'JobHistoryMySuffixCreate',
    component: JobHistoryMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-history-my-suffix/:jobHistoryId/edit',
    name: 'JobHistoryMySuffixEdit',
    component: JobHistoryMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/job-history-my-suffix/:jobHistoryId/view',
    name: 'JobHistoryMySuffixView',
    component: JobHistoryMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
