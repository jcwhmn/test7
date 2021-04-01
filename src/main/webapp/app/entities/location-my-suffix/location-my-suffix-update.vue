<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="test7App.location.home.createOrEditLabel" data-cy="LocationCreateUpdateHeading">Create or edit a LocationMySuffix</h2>
        <div>
          <div class="form-group" v-if="location.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="location.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-my-suffix-streetAddress">Street Address</label>
            <input
              type="text"
              class="form-control"
              name="streetAddress"
              id="location-my-suffix-streetAddress"
              data-cy="streetAddress"
              :class="{ valid: !$v.location.streetAddress.$invalid, invalid: $v.location.streetAddress.$invalid }"
              v-model="$v.location.streetAddress.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-my-suffix-postalCode">Postal Code</label>
            <input
              type="text"
              class="form-control"
              name="postalCode"
              id="location-my-suffix-postalCode"
              data-cy="postalCode"
              :class="{ valid: !$v.location.postalCode.$invalid, invalid: $v.location.postalCode.$invalid }"
              v-model="$v.location.postalCode.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-my-suffix-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="location-my-suffix-city"
              data-cy="city"
              :class="{ valid: !$v.location.city.$invalid, invalid: $v.location.city.$invalid }"
              v-model="$v.location.city.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-my-suffix-stateProvince">State Province</label>
            <input
              type="text"
              class="form-control"
              name="stateProvince"
              id="location-my-suffix-stateProvince"
              data-cy="stateProvince"
              :class="{ valid: !$v.location.stateProvince.$invalid, invalid: $v.location.stateProvince.$invalid }"
              v-model="$v.location.stateProvince.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-my-suffix-country">Country</label>
            <select class="form-control" id="location-my-suffix-country" data-cy="country" name="country" v-model="location.country">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="location.country && countryOption.id === location.country.id ? location.country : countryOption"
                v-for="countryOption in countries"
                :key="countryOption.id"
              >
                {{ countryOption.id }}
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
            :disabled="$v.location.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./location-my-suffix-update.component.ts"></script>
