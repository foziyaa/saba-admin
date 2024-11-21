<template>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="text-h6">School Calendar</span>
          <v-spacer></v-spacer>
          <!-- Dropdown for Month Selection -->
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
            @change="generateCalendar"
            outlined
          ></v-select>
        </v-card-title>
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th v-for="day in days" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, rowIndex) in calendar" :key="rowIndex">
                <td
                  v-for="(day, colIndex) in week"
                  :key="colIndex"
                  class="pa-4"
                >
                  <div v-if="day">
                    <strong>{{ day.date }}</strong>
                    <div v-for="event in day.events" :key="event.id" class="mt-2">
                      <v-chip small>{{ event.name }}</v-chip>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedMonth: new Date().getMonth(),
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        calendar: [],
        events: [
          { id: 1, date: "2024-11-05", name: "Exam Day" },
          { id: 2, date: "2024-11-12", name: "Sports Day" },
          { id: 3, date: "2024-11-25", name: "Holiday" },
        ],
      };
    },
    methods: {
      generateCalendar() {
        const month = this.selectedMonth;
        const year = new Date().getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
  
        // Initialize Calendar
        const calendar = [];
        let week = new Array(7).fill(null);
        let dayCounter = 1;
  
        // Fill calendar days
        for (let i = 0; i < firstDayOfMonth; i++) {
          week[i] = null; // Empty cells before the first day
        }
  
        for (let day = 1; day <= daysInMonth; day++) {
          const currentDay = (firstDayOfMonth + day - 1) % 7;
  
          week[currentDay] = {
            date: day,
            events: this.events.filter(
              (event) => event.date === `${year}-${month + 1}-${String(day).padStart(2, "0")}`
            ),
          };
  
          if (currentDay === 6 || day === daysInMonth) {
            calendar.push(week);
            week = new Array(7).fill(null);
          }
        }
  
        this.calendar = calendar;
      },
    },
    mounted() {
      this.generateCalendar();
    },
  };
  </script>
  
  <style>
  /* Add styles for your table */
  td {
    text-align: center;
    vertical-align: top;
    border: 1px solid #ddd;
    height: 100px;
    width: 14%;
  }
  </style>
  