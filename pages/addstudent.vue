<template>
    <v-container>
      <v-card>
        <v-card-title>Register New Student</v-card-title>
        <v-card-text>
          <v-form ref="studentForm" v-model="valid">
            <!-- Full Name -->
            <v-text-field
              v-model="student.name"
              label="Full Name"
              :rules="[rules.required, rules.name]"
              required
            ></v-text-field>
  
            <!-- Student ID -->
            <v-text-field
              v-model="student.studentId"
              label="Student ID"
              :rules="[rules.required, rules.id]"
              required
            ></v-text-field>
  
            <!-- Email -->
            <v-text-field
              v-model="student.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
  
            <!-- Phone Number -->
            <v-text-field
              v-model="student.phone"
              label="Phone Number"
              :rules="[rules.required, rules.phone]"
              required
            ></v-text-field>
  
            <!-- Department -->
            <v-select
              v-model="student.department"
              :items="departments"
              label="Department"
              :rules="[rules.required]"
              required
            ></v-select>
  
            <!-- Year of Study -->
            <v-select
              v-model="student.year"
              :items="years"
              label="Year of Study"
              :rules="[rules.required]"
              required
            ></v-select>
  
            <!-- Courses -->
            <v-combobox
              v-model="student.courses"
              :items="courses"
              label="Courses"
              multiple
              :rules="[rules.required]"
            ></v-combobox>
  
            <!-- Submit Button -->
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submitStudent"
              class="mt-3"
            >
              Register Student
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "RegisterStudent",
    data() {
      return {
        valid: false,
        student: {
          name: "",
          studentId: "",
          email: "",
          phone: "",
          department: "",
          year: "",
          courses: [],
        },
        departments: ["Science", "Arts", "Commerce", "IT"],
        years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        courses: ["Math", "Physics", "Chemistry", "Biology", "Computer Science"],
        rules: {
          required: (value) => !!value || "This field is required",
          name: (value) => /^[a-zA-Z\s]+$/.test(value) || "Invalid name format",
          id: (value) => /^[a-zA-Z0-9]+$/.test(value) || "Invalid ID format",
          email: (value) => /.+@.+\..+/.test(value) || "Invalid email",
          phone: (value) =>
            /^\d{10,15}$/.test(value) || "Invalid phone number (10-15 digits)",
        },
      };
    },
    methods: {
      submitStudent() {
        if (this.$refs.studentForm.validate()) {
          // Post the student data to the API
          this.$axios
            .post("/api/students", this.student)
            .then(() => {
              this.$toast.success("Student registered successfully!");
              this.resetForm();
            })
            .catch((error) => {
              this.$toast.error("Error registering student: " + error.message);
            });
        }
      },
      resetForm() {
        this.student = {
          name: "",
          studentId: "",
          email: "",
          phone: "",
          department: "",
          year: "",
          courses: [],
        };
        this.$refs.studentForm.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    align-self: flex-end;
  }
  </style>
  