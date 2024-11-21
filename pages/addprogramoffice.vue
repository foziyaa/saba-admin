<template>
    <v-container>
      <v-card>
        <v-card-title>Add New Program Office</v-card-title>
        <v-card-text>
          <v-form ref="programForm" v-model="valid">
            <!-- Program Office Name -->
            <v-text-field
              v-model="programOffice.name"
              label="Program Office Name"
              :rules="[rules.required, rules.name]"
              required
            ></v-text-field>
  
            <!-- Description -->
            <v-textarea
              v-model="programOffice.description"
              label="Description"
              :rules="[rules.required]"
              rows="4"
              required
            ></v-textarea>
  
            <!-- Contact Email -->
            <v-text-field
              v-model="programOffice.contactEmail"
              label="Contact Email"
              :rules="[rules.email]"
            ></v-text-field>
  
            <!-- Contact Phone -->
            <v-text-field
              v-model="programOffice.contactPhone"
              label="Contact Phone"
              :rules="[rules.phone]"
            ></v-text-field>
  
            <!-- Submit Button -->
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submitProgramOffice"
              class="mt-3"
            >
              Add Program Office
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "AddProgramOffice",
    data() {
      return {
        valid: false,
        programOffice: {
          name: "",
          description: "",
          contactEmail: "",
          contactPhone: "",
        },
        rules: {
          required: (value) => !!value || "This field is required",
          name: (value) =>
            /^[a-zA-Z\s]+$/.test(value) || "Name must contain only letters",
          email: (value) =>
            !value || /.+@.+\..+/.test(value) || "Enter a valid email address",
          phone: (value) =>
            !value ||
            /^\+?[0-9]{10,15}$/.test(value) ||
            "Enter a valid phone number (10-15 digits)",
        },
      };
    },
    methods: {
      submitProgramOffice() {
        if (this.$refs.programForm.validate()) {
          // Post the program office data to the API
          this.$axios
            .post("/api/program-offices", this.programOffice)
            .then(() => {
              this.$toast.success("Program office added successfully!");
              this.resetForm();
            })
            .catch((error) => {
              this.$toast.error("Error adding program office: " + error.message);
            });
        }
      },
      resetForm() {
        this.programOffice = {
          name: "",
          description: "",
          contactEmail: "",
          contactPhone: "",
        };
        this.$refs.programForm.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    align-self: flex-end;
  }
  </style>
  