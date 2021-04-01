<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="test7App.region.home.createOrEditLabel" data-cy="RegionCreateUpdateHeading">Create or edit a RegionMySuffix</h2>
        <div>
          <div class="form-group" v-if="region.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="region.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="region-my-suffix-regionName">Region Name</label>
            <input
              type="text"
              class="form-control"
              name="regionName"
              id="region-my-suffix-regionName"
              data-cy="regionName"
              :class="{ valid: !$v.region.regionName.$invalid, invalid: $v.region.regionName.$invalid }"
              v-model="$v.region.regionName.$model"
            />
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
            :disabled="$v.region.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./region-my-suffix-update.component.ts"></script>
