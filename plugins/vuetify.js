import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false, // Set the default theme to light
    themes: {
      light: {
        background: '#FFFFFF', // Set background color
        primary: '#000000', // Set text color
        secondary: '#F5F5F5', // Set secondary background color
      },
    },
  },
});
