<template>
    <v-container>
      <v-card>
        <v-card-title>
          <v-row align="center" justify="space-between" class="w-100">
            <span>Teacher Attendance Report</span>
            <v-btn color="primary" dark @click="exportToCSV">Export to CSV</v-btn>
          </v-row>
        </v-card-title>
  
        <v-card-text>
          <!-- Filters -->
          <v-row class="mb-4" justify="space-between">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                label="Search by Name or ID"
                append-icon="mdi-magnify"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="selectedStatus"
                :items="statuses"
                label="Filter by Status"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="selectedDate"
                    label="Filter by Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="selectedDate" @input="datePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
  
          <!-- Attendance Table -->
          <v-data-table
            :headers="headers"
            :items="filteredTeachers"
            class="elevation-1"
            dense
            item-value="id"
            item-disabled="disabled"
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Attendance Summary</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-chip color="green" dark>
                  Present: {{ summary.present }}
                </v-chip>
                <v-chip color="red" dark>
                  Absent: {{ summary.absent }}
                </v-chip>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status === 'Present' ? 'green' : 'red'" dark>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "EnhancedAttendanceReport",
    data() {
      return {
        search: "",
        selectedStatus: null,
        selectedDate: null,
        datePicker: false,
        statuses: ["Present", "Absent"],
        headers: [
          { text: "Teacher ID", value: "id" },
          { text: "Name", value: "name" },
          { text: "Date", value: "date" },
          { text: "Status", value: "status" },
        ],
        teachers: [
          { id: "T001", name: "Alemayehu Bekele", date: "2024-12-03", status: "Present" },
          { id: "T002", name: "Muluwork Abebe", date: "2024-12-03", status: "Absent" },
          { id: "T003", name: "Hailu Gebremedhin", date: "2024-12-03", status: "Present" },
          { id: "T004", name: "Kidist Teshome", date: "2024-12-03", status: "Present" },
          { id: "T005", name: "Tesfaye Alemu", date: "2024-12-03", status: "Absent" },
        ],
      };
    },
    computed: {
      filteredTeachers() {
        return this.teachers.filter((teacher) => {
          const matchesStatus =
            !this.selectedStatus || teacher.status === this.selectedStatus;
          const matchesDate =
            !this.selectedDate || teacher.date === this.selectedDate;
          return matchesStatus && matchesDate;
        });
      },
      summary() {
        const present = this.filteredTeachers.filter(
          (t) => t.status === "Present"
        ).length;
        const absent = this.filteredTeachers.filter((t) => t.status === "Absent")
          .length;
        return { present, absent };
      },
    },
    methods: {
      exportToCSV() {
        const csvContent = [
          ["Teacher ID", "Name", "Date", "Status"],
          ...this.filteredTeachers.map((t) => [t.id, t.name, t.date, t.status]),
        ]
          .map((row) => row.join(","))
          .join("\n");
  
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "attendance_report.csv";
        link.click();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    align-self: flex-end;
  }
  .v-chip {
    text-transform: capitalize;
  }
  </style>
  