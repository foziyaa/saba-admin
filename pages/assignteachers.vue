<template>
    <v-container>
      <v-card>
        <v-card-title>
          <v-row justify="space-between" class="w-100">
            <span>Assign Teachers to Sections & Courses</span>
            <v-btn color="primary" dark @click="saveAssignments">Save Assignments</v-btn>
          </v-row>
        </v-card-title>
  
        <v-card-text>
          <!-- Form for Assigning -->
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="assignment.teacher"
                :items="teachers"
                label="Select Teacher"
                item-text="name"
                item-value="id"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="assignment.course"
                :items="courses"
                label="Select Course"
                item-text="name"
                item-value="id"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="assignment.section"
                :items="sections"
                label="Select Section"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="assignment.semester"
                :items="semesters"
                label="Select Semester"
                clearable
              ></v-select>
            </v-col>
          </v-row>
  
          <v-btn
            color="success"
            class="mt-3"
            :disabled="!isFormValid"
            @click="addAssignment"
          >
            Add Assignment
          </v-btn>
  
          <!-- Assignments Table -->
          <v-data-table
            :headers="headers"
            :items="assignments"
            class="mt-4"
            dense
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                color="red"
                @click="removeAssignment(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "AssignTeachers",
    data() {
      return {
        assignment: {
          teacher: null,
          course: null,
          section: null,
          semester: null,
        },
        teachers: [
          { id: 1, name: "Alemayehu Bekele" },
          { id: 2, name: "Muluwork Abebe" },
          { id: 3, name: "Hailu Gebremedhin" },
        ],
        courses: [
          { id: 1, name: "Mathematics" },
          { id: 2, name: "Physics" },
          { id: 3, name: "Chemistry" },
        ],
        sections: ["A", "B", "C", "D"],
        semesters: ["1st Semester", "2nd Semester"],
        assignments: [],
        headers: [
          { text: "Teacher", value: "teacherName" },
          { text: "Course", value: "courseName" },
          { text: "Section", value: "section" },
          { text: "Semester", value: "semester" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    computed: {
      isFormValid() {
        const { teacher, course, section, semester } = this.assignment;
        return teacher && course && section && semester;
      },
    },
    methods: {
      addAssignment() {
        const teacher = this.teachers.find(
          (t) => t.id === this.assignment.teacher
        );
        const course = this.courses.find((c) => c.id === this.assignment.course);
  
        const newAssignment = {
          teacherId: teacher.id,
          teacherName: teacher.name,
          courseId: course.id,
          courseName: course.name,
          section: this.assignment.section,
          semester: this.assignment.semester,
        };
  
        this.assignments.push(newAssignment);
        this.resetForm();
      },
      removeAssignment(item) {
        const index = this.assignments.indexOf(item);
        if (index !== -1) {
          this.assignments.splice(index, 1);
        }
      },
      saveAssignments() {
        // Save assignments (mock save here)
        console.log("Saved Assignments:", this.assignments);
        this.$toast.success("Assignments saved successfully!");
      },
      resetForm() {
        this.assignment = {
          teacher: null,
          course: null,
          section: null,
          semester: null,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    align-self: flex-end;
  }
  </style>
  