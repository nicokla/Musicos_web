<template>
  <div class="MySongs">
    <h1 class="subheading grey--text">My songs</h1>

    <v-container class="my-5">
      <transition-group name="fade">
        <v-card class="mx-auto pa-3 ma-2 text-center" max-width="400" v-for="song in songs" :key="song.id">
          <v-row class="d-flex justify-space-around">
            <v-cols cols=8>
              <v-list-item-title class="headline mb-1">
                <router-link :to="{name: 'song', params: {id: song.id} }">{{song.title}}</router-link>
                
              </v-list-item-title>
            </v-cols>
            <v-cols cols=4>
              <v-btn icon color=red @click="deleteSong(song.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-cols>
          </v-row>
        </v-card>
      </transition-group>
    </v-container>
    
  </div>
</template>

<script>
import {db} from '../firebase/db'

export default {
  data() {
    return {
      songs:[]
    }
  },
  methods: {
    async addItem(){
      await db.collection("songs").add({title: "truc"})
		},
		deleteSong(id){
			db.collection('songs').doc(id).delete()
		}
  },
	firestore:{
		songs: db.collection('songs').where("ownerID", "==", "FSlyGRJXj4RYgElBAib7oRran642")
	}
}


  // async mounted() {
  //   const answer = await db.collection("songs").get(); // axios.get("api/bucketListItems/");
  //   this.songs=[]
  //   answer.forEach((doc)=>{
  //     this.songs.push({id: doc.id, title: doc.data().title})//.data().name})
  //   })
  //   // this.songs = response.data
  // },
</script>
