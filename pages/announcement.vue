<template>
    <v-container>
      <v-card>
        <v-card-title>Upload Document</v-card-title>
        <v-card-text>
          <v-form ref="documentForm" v-model="valid">
            <!-- Document Title -->
            <v-text-field
              v-model="document.title"
              label="Title"
              :rules="[rules.required]"
              required
            ></v-text-field>
  
            <!-- Document Description -->
            <v-textarea
              v-model="document.description"
              label="Description"
              rows="4"
              :rules="[rules.required]"
              required
            ></v-textarea>
  
            <!-- Image Upload -->
            <v-file-input
              v-model="document.image"
              label="Upload Image"
              accept="image/*"
              :rules="[rules.image]"
              show-size
              @change="previewImage"
            ></v-file-input>
  
            <!-- Image Preview -->
            <v-img
              v-if="imagePreview"
              :src="imagePreview"
              class="mt-4"
              max-height="200"
              contain
            ></v-img>
  
            <!-- Submit Button -->
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submitDocument"
              class="mt-3"
            >
              Submit Document
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "UploadDocument",
    data() {
      return {
        valid: false,
        imagePreview: null,
        document: {
          title: "",
          description: "",
          image: null,
        },
        rules: {
          required: (value) => !!value || "This field is required",
          image: (value) =>
            !value || value.type.startsWith("image/")
              ? true
              : "Please upload a valid image",
        },
      };
    },
    methods: {
      previewImage(file) {
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imagePreview = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          this.imagePreview = null;
        }
      },
      submitDocument() {
        if (this.$refs.documentForm.validate()) {
          // Prepare form data for submission
          const formData = new FormData();
          formData.append("title", this.document.title);
          formData.append("description", this.document.description);
          if (this.document.image) {
            formData.append("image", this.document.image);
          }
  
          // Post the document data to the API
          this.$axios
            .post("/api/documents", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then(() => {
              this.$toast.success("Document submitted successfully!");
              this.resetForm();
            })
            .catch((error) => {
              this.$toast.error("Error submitting document: " + error.message);
            });
        }
      },
      resetForm() {
        this.document = {
          title: "",
          description: "",
          image: null,
        };
        this.imagePreview = null;
        this.$refs.documentForm.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional styling for better alignment */
  .v-btn {
    align-self: flex-end;
  }
  .v-img {
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  