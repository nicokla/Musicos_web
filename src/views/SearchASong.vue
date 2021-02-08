<template>
  <div class="SearchASong">
    <h1 class="subheading grey--text">Search a song</h1>

    <v-container class="my-5">
        <ais-instant-search :search-client="searchClient" index-name="songs">
          <!-- demo_ecommerce -->
          <ais-search-box />
          <ais-hits>
            <div slot="item" slot-scope="{ item }">
              <h2>{{ item.title }}</h2>
              <!-- item.name -->
            </div>
          </ais-hits>
        </ais-instant-search>

    </v-container>
    
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';

export default {
  data() {
    return {
      // SKJIA8T5Z2, 5e2190935369d22de34d9ff049391343
      // 'B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5'

      searchClient: algoliasearch(
        'SKJIA8T5Z2',
        '5e2190935369d22de34d9ff049391343'
      )
    }
  },
}
</script>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>