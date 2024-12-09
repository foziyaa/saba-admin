<template>
    <v-app>
      <v-container>
        <!-- Header -->
        <v-row align="center" justify="space-between">
          <v-col cols="6">
            <h2>Semester Schedule Management</h2>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn color="primary" @click="openDialog('create')">
              <v-icon left>mdi-plus</v-icon>
              Create Schedule
            </v-btn>
          </v-col>
        </v-row>
  
        <!-- Schedules Table -->
        <v-data-table
          :headers="headers"
          :items="schedules"
          item-value="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Search schedules"
              class="mx-4"
              outlined
              dense
            ></v-text-field>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon small @click="openDialog('view', item)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon small color="error" @click="deleteSchedule(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
  
        <!-- Schedule View Table -->
        <v-divider class="my-8"></v-divider>
        <h3 class="mb-4">Schedule Table View</h3>
        <v-simple-table>
          <thead>
            <tr>
              <th>Period</th>
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(period, index) in periods" :key="index">
              <td>{{ period }}</td>
              <td v-for="day in days" :key="day">
                <span v-if="scheduleTable[day] && scheduleTable[day][index]">
                  <strong>{{ scheduleTable[day][index].subject }}</strong><br>
                  {{ scheduleTable[day][index].teacher }}
                </span>
                <span v-else>--</span>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
  
        <!-- Schedule Dialog -->
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>{{ dialogMode === 'create' ? 'Create' : 'View' }} Schedule</v-card-title>
            <v-card-text>
              <v-container>
                <v-row v-if="dialogMode === 'create'">
                  <v-col cols="6">
                    <v-text-field
                      v-model="newSchedule.semester"
                      label="Semester"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="newSchedule.section"
                      :items="sections"
                      label="Select Section"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="newSchedule.teacher"
                      :items="teachers"
                      label="Assign Teacher"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="newSchedule.day"
                      :items="days"
                      label="Select Day"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="newSchedule.period"
                      :items="periods"
                      label="Select Period"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="newSchedule.details"
                      label="Schedule Details"
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
  
                <v-row v-if="dialogMode === 'view'">
                  <v-col cols="6">
                    <strong>Semester:</strong> {{ selectedSchedule.semester }}
                  </v-col>
                  <v-col cols="6">
                    <strong>Section:</strong> {{ selectedSchedule.section }}
                  </v-col>
                  <v-col cols="6">
                    <strong>Teacher:</strong> {{ selectedSchedule.teacher }}
                  </v-col>
                  <v-col cols="6">
                    <strong>Day:</strong> {{ selectedSchedule.day }}
                  </v-col>
                  <v-col cols="6">
                    <strong>Period:</strong> {{ selectedSchedule.period }}
                  </v-col>
                  <v-col cols="12">
                    <strong>Details:</strong> {{ selectedSchedule.details }}
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Close</v-btn>
              <v-btn
                v-if="dialogMode === 'create'"
                color="primary"
                @click="saveSchedule"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: '',
        dialog: false,
        dialogMode: 'create',
        headers: [
          { text: 'Semester', value: 'semester' },
          { text: 'Section', value: 'section' },
          { text: 'Teacher', value: 'teacher' },
          { text: 'Day', value: 'day' },
          { text: 'Period', value: 'period' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        schedules: [],
        selectedSchedule: {},
        newSchedule: {
          semester: '',
          section: '',
          teacher: '',
          day: '',
          period: '',
          details: '',
        },
        sections: ['Section A', 'Section B', 'Section C'],
        teachers: ['Teacher 1', 'Teacher 2', 'Teacher 3'],
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        periods: [
          'Period 1 (8:00 AM - 9:00 AM)',
          'Period 2 (9:00 AM - 10:00 AM)',
          'Period 3 (10:00 AM - 11:00 AM)',
          'Period 4 (11:00 AM - 12:00 PM)',
          'Period 5 (1:00 PM - 2:00 PM)',
          'Period 6 (2:00 PM - 3:00 PM)',
          'Period 7 (3:00 PM - 4:00 PM)',
          'Period 8 (4:00 PM - 5:00 PM)',
        ],
        scheduleTable: {}, // For the table view
      };
    },
    methods: {
      openDialog(mode, schedule = null) {
        this.dialogMode = mode;
        if (mode === 'create') {
          this.newSchedule = {
            semester: '',
            section: '',
            teacher: '',
            day: '',
            period: '',
            details: '',
          };
        } else if (mode === 'view') {
          this.selectedSchedule = schedule;
        }
        this.dialog = true;
      },
      saveSchedule() {
        const id = Date.now(); // Generate a unique ID
        const day = this.newSchedule.day;
        const periodIndex = this.periods.indexOf(this.newSchedule.period);
  
        // Update the schedules list
        this.schedules.push({ id, ...this.newSchedule });
  
        // Update the scheduleTable for table view
        if (!this.scheduleTable[day]) {
          this.scheduleTable[day] = [];
        }
        this.scheduleTable[day][periodIndex] = {
          subject: this.newSchedule.details,
          teacher: this.newSchedule.teacher,
        };
  
        this.dialog = false;
        this.$emit('snackbar', {
          message: 'Schedule created successfully!',
          color: 'success',
        });
      },
      deleteSchedule(id) {
        this.schedules = this.schedules.filter(schedule => schedule.id !== id);
        this.$emit('snackbar', {
          message: 'Schedule deleted successfully!',
          color: 'error',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  