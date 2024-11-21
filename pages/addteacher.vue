<template>
    <v-container>
      <v-card>
        <v-card-title>Register New Teacher</v-card-title>
        <v-card-text>
          <v-form ref="teacherForm" v-model="valid">
            <!-- Full Name -->
            <v-text-field
              v-model="teacher.name"
              label="Full Name"
              :rules="[rules.required, rules.name]"
              required
            ></v-text-field>
  
            <!-- Email -->
            <v-text-field
              v-model="teacher.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
  
            <!-- Phone Number -->
            <v-text-field
              v-model="teacher.phone"
              label="Phone Number"
              :rules="[rules.required, rules.phone]"
              required
            ></v-text-field>
  
            <!-- Subjects -->
            <v-combobox
              v-model="teacher.subjects"
              :items="subjects"
              label="Subjects"
              multiple
              :rules="[rules.required]"
            ></v-combobox>
  
            <!-- Department -->
            <v-select
              v-model="teacher.department"
              :items="departments"
              label="Department"
              :rules="[rules.required]"
              required
            ></v-select>
  
            <!-- Add Button -->
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submitTeacher"
              class="mt-3"
            >
              Register Teacher
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "RegisterTeacher",
    data() {
      return {
        valid: false,
        teacher: {
          name: "",
          email: "",
          phone: "",
          subjects: [],
          department: "",
        },
        subjects: ["flutter", "vue", "wire", "it", "math"],
        departments: ["cs", "acc", "mm", "IT"],
        rules: {
          required: (value) => !!value || "This field is required",
          name: (value) => /^[a-zA-Z\s]+$/.test(value) || "Invalid name format",
          email: (value) => /.+@.+\..+/.test(value) || "Invalid email",
          phone: (value) =>
            /^\d{10,15}$/.test(value) || "Invalid phone number (10-15 digits)",
        },
      };
    },
    methods: {
      submitTeacher() {
        if (this.$refs.teacherForm.validate()) {
          // Post the teacher data to the API
          this.$axios
            .post("/api/teachers", this.teacher)
            .then(() => {
              this.$toast.success("Teacher registered successfully!");
              this.resetForm();
            })
            .catch((error) => {
              this.$toast.error("Error registering teacher: " + error.message);
            });
        }
      },
      resetForm() {
        this.teacher = {
          name: "",
          email: "",
          phone: "",
          subjects: [],
          department: "",
        };
        this.$refs.teacherForm.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    align-self: flex-end;
  }
  </style>
  