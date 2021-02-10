<template>
  <nav>

    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>Musicos</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <!-- <v-menu offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->

      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary"
      >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <!-- <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-1.png">
          </v-avatar> -->
          <p class="white--text subheading mt-1">Musicos</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-group sub-group no-action
          v-for="folder in folders" :key="folder.text">
          <v-list-tile slot="activator">
              <v-list-tile-title>{{ folder.text }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="link in folder.submenus" :key="link.text" router :to="link.route">
            <v-list-tile-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> 
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
// https://materialdesignicons.com/
// https://vuetifyjs.com/en/components/icons/
// https://vuetifyjs.com/en/features/icon-fonts/#install-material-icons
// https://pictogrammers.github.io/@mdi/font/5.4.55/
export default {
  data() {
    return {
      drawer: false,
      folders: [
        { icon: "music", text: "Songs",
          submenus: [
          { icon: 'home', text: 'My songs', route: '/mySongs' },
          { icon: 'add', text: 'New song', route: '/createSong' },
          { icon: 'mdi-cards-heart', text: 'Favourite songs', route: '/favouriteSongs' },
          { icon: 'search', text: 'Search a song', route: '/searchASong' },]
        },
        { icon: "users", text: "Users",
          submenus: [
          { icon: 'mdi-account-multiple', text: 'Followed users', route: '/followedUsers' },
          { icon: 'search', text: 'Search a user', route: '/searchAUser' }]
        },
        { icon: "settings", text: "Settings",
          submenus: [
          { icon: 'dashboard', text: 'Gems', route: '/gems' },
          { icon: 'exit_to_app', text: 'Log out', route: '/signIn' }]
        },
      ]
    }
  }
}
</script>

<style>

</style>
