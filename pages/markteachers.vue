<template>
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span>Mark/Oversee Attendance for Teachers</span>
          <v-btn color="primary" @click="saveAttendance">Save Attendance</v-btn>
        </v-card-title>
        <v-card-text>
          <!-- Filter Teachers -->
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="selectedDate"
                :items="availableDates"
                label="Select Date"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="selectedDepartment"
                :items="departments"
                label="Filter by Department"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn color="success" @click="filterTeachers">Filter</v-btn>
            </v-col>
          </v-row>
  
          <!-- Attendance Table -->
          <v-data-table
            :headers="headers"
            :items="filteredTeachers"
            item-value="id"
            dense
            class="mt-3"
          >
            <template v-slot:item.attendance="{ item }">
              <v-select
                v-model="attendance[item.id]"
                :items="['Present', 'Absent', 'Late']"
                label="Mark Attendance"
                hide-details
              ></v-select>
            </template>
          </v-data-table>
  
          <!-- Attendance Summary -->
          <v-row class="mt-4">
            <v-col cols="12" md="4">
              <v-card outlined>
                <v-card-text>
                  <strong>Total Teachers:</strong> {{ filteredTeachers.length }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card outlined>
                <v-card-text>
                  <strong>Marked Present:</strong> {{
                    attendanceSummary.present
                  }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card outlined>
                <v-card-text>
                  <strong>Marked Absent:</strong> {{
                    attendanceSummary.absent
                  }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "TeacherAttendance",
    data() {
      return {
        selectedDate: null,
        selectedDepartment: null,
        attendance: {}, // { teacherId: "Present" | "Absent" | "Late" }
        teachers: [
          { id: 1, name: "Alemayehu Bekele", department: "Math" },
          { id: 2, name: "Muluwork Abebe", department: "Science" },
          { id: 3, name: "Hailu Gebremedhin", department: "Arts" },
        ],
        departments: ["Math", "Science", "Arts"],
        availableDates: ["2024-12-01", "2024-12-02", "2024-12-03"],
        headers: [
          { text: "Teacher Name", value: "name" },
          { text: "Department", value: "department" },
          { text: "Attendance", value: "attendance", sortable: false },
        ],
      };
    },
    computed: {
      filteredTeachers() {
        return this.teachers.filter(
          (teacher) =>
            (!this.selectedDepartment ||
              teacher.department === this.selectedDepartment) &&
            teacher
        );
      },
      attendanceSummary() {
        let summary = { present: 0, absent: 0, late: 0 };
        for (let status of Object.values(this.attendance)) {
          if (summary[status.toLowerCase()] !== undefined) {
            summary[status.toLowerCase()]++;
          }
        }
        return summary;
      },
    },
    methods: {
      filterTeachers() {
        // Logic to apply additional filters if needed
      },
      saveAttendance() {
        const markedAttendance = this.filteredTeachers.map((teacher) => ({
          teacherId: teacher.id,
          teacherName: teacher.name,
          attendance: this.attendance[teacher.id] || "Unmarked",
          date: this.selectedDate || "Unselected",
        }));
  
        console.log("Attendance Data:", markedAttendance);
  
        this.$toast.success("Attendance saved successfully!");
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    margin-top: 10px;
  }
  </style>
  