<template>
  <v-app class="light-theme">
    <!-- Side Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- Image Above Sidebar Contents -->
      <v-img
  src="/sabalogo.png"
  alt="Sidebar Logo"
  class="mx-auto my-4"
  contain
  max-height="100"
></v-img>


      <!-- Navigation Items -->
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          v-if="!item.subItems"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="!miniVariant">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Sub-Items (Expandable List Groups) -->
        <v-list-group
          v-for="(item, i) in items"
          :key="i"
          v-if="item.subItems"
          :value="item.expanded"
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content v-if="!miniVariant">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!-- Sub-Items -->
          <v-list-item
            v-for="(subItem, j) in item.subItems"
            :key="j"
            :to="subItem.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content v-if="!miniVariant">
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>

      <!-- Collapse Button -->
      <v-list-item>
        <v-btn
          icon
          @click.stop="miniVariant = !miniVariant"
          class="mx-auto"
        >
          <v-icon>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
        </v-btn>
      </v-list-item>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- Right Drawer -->
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Footer -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Saba Admin',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Add User',
          expanded: false,
          subItems: [
            { icon: 'mdi-account', title: 'Add Student', to: '/addstudent' },
            { icon: 'mdi-account', title: 'Add Teacher', to: '/addteacher' },
            { icon: 'mdi-office-building', title: 'Add Department', to: '/adddepartmet' },
            { icon: 'mdi-account-group', title: 'Add Program Office', to: '/addprogramoffice' },
            { icon: 'mdi-account-group', title: 'attendanceReportTeacher', to: '/attendanceReport' },
            { icon: 'mdi-account-group', title: 'assign teachers', to: '/assignteachers' },
            { icon: 'mdi-account-group', title: 'Mark attendance for teachers', to: '/markteachers' },
            { icon: 'mdi-account-group', title: 'create schedule', to: '/createschedule' },
          ]
        },
        {
          icon: 'mdi-bullhorn',
          title: 'announcement',
          expanded: false,
          subItems: [
            { icon: 'mdi-bullhorn', title: 'super admin announcement', to: '/announcement' },
            { icon: 'mdi-bullhorn', title: 'departmet announcement', to: '/announcement' },
            { icon: 'mdi-bullhorn', title: 'program office announcement', to: '/announcement' }
          ]
        },
        {
          icon: 'mdi-calendar',
          title: 'calendar',
          expanded: false,
          subItems: [
            { icon: 'mdi-calendar', title: 'school calader', to: '/caladar' },
           
          ]
        },
      ]
    };
  }
};
</script>

<style>
/* Optional styles for image alignment */
.v-img {
  max-width: 100%;
  border-radius: 8px;
}
</style>
