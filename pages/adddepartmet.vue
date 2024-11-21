<template>
    <v-container>
      <v-card>
        <v-card-title>Add New Department</v-card-title>
        <v-card-text>
          <v-form ref="departmentForm" v-model="valid">
            <!-- Department Name -->
            <v-text-field
              v-model="department.name"
              label="Department Name"
              :rules="[rules.required, rules.name]"
              required
            ></v-text-field>
  
            <!-- Description -->
            <v-textarea
              v-model="department.description"
              label="Description"
              :rules="[rules.required]"
              rows="4"
              required
            ></v-textarea>
  
            <!-- Submit Button -->
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submitDepartment"
              class="mt-3"
            >
              Add Department
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "AddDepartment",
    data() {
      return {
        valid: false,
        department: {
          name: "",
          description: "",
        },
        rules: {
          required: (value) => !!value || "This field is required",
          name: (value) =>
            /^[a-zA-Z\s]+$/.test(value) || "Department name must contain only letters",
        },
      };
    },
    methods: {
      submitDepartment() {
        if (this.$refs.departmentForm.validate()) {
          // Post the department data to the API
          this.$axios
            .post("/api/departments", this.department)
            .then(() => {
              this.$toast.success("Department added successfully!");
              this.resetForm();
            })
            .catch((error) => {
              this.$toast.error("Error adding department: " + error.message);
            });
        }
      },
      resetForm() {
        this.department = {
          name: "",
          description: "",
        };
        this.$refs.departmentForm.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    align-self: flex-end;
  }
  </style>
  