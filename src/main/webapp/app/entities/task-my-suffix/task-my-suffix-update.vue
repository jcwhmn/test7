<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="test7App.task.home.createOrEditLabel" data-cy="TaskCreateUpdateHeading">Create or edit a TaskMySuffix</h2>
        <div>
          <div class="form-group" v-if="task.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="task.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="task-my-suffix-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="task-my-suffix-title"
              data-cy="title"
              :class="{ valid: !$v.task.title.$invalid, invalid: $v.task.title.$invalid }"
              v-model="$v.task.title.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="task-my-suffix-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="task-my-suffix-description"
              data-cy="description"
              :class="{ valid: !$v.task.description.$invalid, invalid: $v.task.description.$invalid }"
              v-model="$v.task.description.$model"
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
            :disabled="$v.task.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./task-my-suffix-update.component.ts"></script>
