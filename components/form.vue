<template>
    <v-container>
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <div v-for="(field, index) in fields" :key="index">
              <component
                :is="getComponentType(field.type)"
                v-model="form[field.model]"
                :label="field.label"
                :rules="field.rules"
                v-bind="field.props"
                required
              ></component>
            </div>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submit"
              class="mt-3"
            >
              {{ submitButtonText }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "DynamicForm",
    props: {
      title: {
        type: String,
        required: true,
      },
      fields: {
        type: Array,
        required: true,
      },
      form: {
        type: Object,
        required: true,
      },
      rules: {
        type: Object,
        default: () => ({}),
      },
      submitButtonText: {
        type: String,
        default: "Submit",
      },
      onSubmit: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        valid: false,
      };
    },
    methods: {
      getComponentType(type) {
        const components = {
          text: "v-text-field",
          textarea: "v-textarea",
          select: "v-select",
          combobox: "v-combobox",
        };
        return components[type] || "v-text-field";
      },
      submit() {
        if (this.$refs.formRef.validate()) {
          this.onSubmit();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    align-self: flex-end;
  }
  </style>
  