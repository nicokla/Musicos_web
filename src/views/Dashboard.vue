<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="pt-3">
      <transition-group name="fade">
        <v-card class="mx-auto pa-3 ma-2 text-center" max-width="400" v-for="todo in todos" :key="todo.id">
          <v-row class="d-flex justify-space-around">
            <v-cols cols=8>
              <v-list-item-title class="headline mb-1">{{todo.title}}</v-list-item-title>
            </v-cols>
            <v-cols cols=4>
              <v-btn icon color=red @click="deleteTodo(todo.id)">
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
      todos:[]
    }
  },
  methods: {
    async addItem(){
      await db.collection("songs").add({title: "truc"})
		},
		deleteTodo(id){
			db.collection('songs').doc(id).delete()
		}
  },
	firestore:{
		todos: db.collection('songs').where("ownerID", "==", "FSlyGRJXj4RYgElBAib7oRran642")
	}
}


  // async mounted() {
  //   const answer = await db.collection("songs").get(); // axios.get("api/bucketListItems/");
  //   this.todos=[]
  //   answer.forEach((doc)=>{
  //     this.todos.push({id: doc.id, title: doc.data().title})//.data().name})
  //   })
  //   // this.todos = response.data
  // },

</script>


