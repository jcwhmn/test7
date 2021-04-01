<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="test7App.jobHistory.home.createOrEditLabel" data-cy="JobHistoryCreateUpdateHeading">Create or edit a JobHistoryMySuffix</h2>
        <div>
          <div class="form-group" v-if="jobHistory.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="jobHistory.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="job-history-my-suffix-startDate">Start Date</label>
            <div class="d-flex">
              <input
                id="job-history-my-suffix-startDate"
                data-cy="startDate"
                type="datetime-local"
                class="form-control"
                name="startDate"
                :class="{ valid: !$v.jobHistory.startDate.$invalid, invalid: $v.jobHistory.startDate.$invalid }"
                :value="convertDateTimeFromServer($v.jobHistory.startDate.$model)"
                @change="updateInstantField('startDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="job-history-my-suffix-endDate">End Date</label>
            <div class="d-flex">
              <input
                id="job-history-my-suffix-endDate"
                data-cy="endDate"
                type="datetime-local"
                class="form-control"
                name="endDate"
                :class="{ valid: !$v.jobHistory.endDate.$invalid, invalid: $v.jobHistory.endDate.$invalid }"
                :value="convertDateTimeFromServer($v.jobHistory.endDate.$model)"
                @change="updateInstantField('endDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="job-history-my-suffix-language">Language</label>
            <select
              class="form-control"
              name="language"
              :class="{ valid: !$v.jobHistory.language.$invalid, invalid: $v.jobHistory.language.$invalid }"
              v-model="$v.jobHistory.language.$model"
              id="job-history-my-suffix-language"
              data-cy="language"
            >
              <option value="FRENCH">FRENCH</option>
              <option value="ENGLISH">ENGLISH</option>
              <option value="SPANISH">SPANISH</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="job-history-my-suffix-job">Job</label>
            <select class="form-control" id="job-history-my-suffix-job" data-cy="job" name="job" v-model="jobHistory.job">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="jobHistory.job && jobOption.id === jobHistory.job.id ? jobHistory.job : jobOption"
                v-for="jobOption in jobs"
                :key="jobOption.id"
              >
                {{ jobOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="job-history-my-suffix-department">Department</label>
            <select
              class="form-control"
              id="job-history-my-suffix-department"
              data-cy="department"
              name="department"
              v-model="jobHistory.department"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  jobHistory.department && departmentOption.id === jobHistory.department.id ? jobHistory.department : departmentOption
                "
                v-for="departmentOption in departments"
                :key="departmentOption.id"
              >
                {{ departmentOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="job-history-my-suffix-employee">Employee</label>
            <select
              class="form-control"
              id="job-history-my-suffix-employee"
              data-cy="employee"
              name="employee"
              v-model="jobHistory.employee"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="jobHistory.employee && employeeOption.id === jobHistory.employee.id ? jobHistory.employee : employeeOption"
                v-for="employeeOption in employees"
                :key="employeeOption.id"
              >
                {{ employeeOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.jobHistory.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./job-history-my-suffix-update.component.ts"></script>
