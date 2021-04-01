<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="test7App.employee.home.createOrEditLabel" data-cy="EmployeeCreateUpdateHeading">Create or edit a EmployeeMySuffix</h2>
        <div>
          <div class="form-group" v-if="employee.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="employee.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="employee-my-suffix-firstName"
              data-cy="firstName"
              :class="{ valid: !$v.employee.firstName.$invalid, invalid: $v.employee.firstName.$invalid }"
              v-model="$v.employee.firstName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="employee-my-suffix-lastName"
              data-cy="lastName"
              :class="{ valid: !$v.employee.lastName.$invalid, invalid: $v.employee.lastName.$invalid }"
              v-model="$v.employee.lastName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="employee-my-suffix-email"
              data-cy="email"
              :class="{ valid: !$v.employee.email.$invalid, invalid: $v.employee.email.$invalid }"
              v-model="$v.employee.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-phoneNumber">Phone Number</label>
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              id="employee-my-suffix-phoneNumber"
              data-cy="phoneNumber"
              :class="{ valid: !$v.employee.phoneNumber.$invalid, invalid: $v.employee.phoneNumber.$invalid }"
              v-model="$v.employee.phoneNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-hireDate">Hire Date</label>
            <div class="d-flex">
              <input
                id="employee-my-suffix-hireDate"
                data-cy="hireDate"
                type="datetime-local"
                class="form-control"
                name="hireDate"
                :class="{ valid: !$v.employee.hireDate.$invalid, invalid: $v.employee.hireDate.$invalid }"
                :value="convertDateTimeFromServer($v.employee.hireDate.$model)"
                @change="updateInstantField('hireDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-salary">Salary</label>
            <input
              type="number"
              class="form-control"
              name="salary"
              id="employee-my-suffix-salary"
              data-cy="salary"
              :class="{ valid: !$v.employee.salary.$invalid, invalid: $v.employee.salary.$invalid }"
              v-model.number="$v.employee.salary.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-commissionPct">Commission Pct</label>
            <input
              type="number"
              class="form-control"
              name="commissionPct"
              id="employee-my-suffix-commissionPct"
              data-cy="commissionPct"
              :class="{ valid: !$v.employee.commissionPct.$invalid, invalid: $v.employee.commissionPct.$invalid }"
              v-model.number="$v.employee.commissionPct.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-manager">Manager</label>
            <select class="form-control" id="employee-my-suffix-manager" data-cy="manager" name="manager" v-model="employee.manager">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="employee.manager && employeeOption.id === employee.manager.id ? employee.manager : employeeOption"
                v-for="employeeOption in employees"
                :key="employeeOption.id"
              >
                {{ employeeOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-my-suffix-department">Department</label>
            <select
              class="form-control"
              id="employee-my-suffix-department"
              data-cy="department"
              name="department"
              v-model="employee.department"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  employee.department && departmentOption.id === employee.department.id ? employee.department : departmentOption
                "
                v-for="departmentOption in departments"
                :key="departmentOption.id"
              >
                {{ departmentOption.id }}
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
            :disabled="$v.employee.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./employee-my-suffix-update.component.ts"></script>
