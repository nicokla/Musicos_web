<template>
  <div id="FollowedUsers" class="paddedContainer">
    <h1 class="subheading grey--text">Followed Users</h1>
    <div class="listOfUsers">
      <UserCell v-for="user in users" :theUser="user" 
          @click="openUser(user)"/>
    </div>
  </div>
</template>


<script>
import {db, getCurrentUser} from '../firebase/db'
import UserCell from '../components/UserCell.vue'

export default {
  components: { UserCell },
  data() {
    return {
      users: []
    }
  },
  methods:{
    openUser(user){
      this.$router.push({name: 'User', params: {id: user.id} })
    }
  },
  async mounted() {
    const answer = await db.collection("users")
                           .doc(getCurrentUser().uid)
                           .collection('followedUsers')
                           .get();
    this.users=[]
    answer.forEach((doc)=>{
      this.users.push({
        id: doc.id,
        ...doc.data()
      })
    })
  },
}
</script>

<style scoped>
.content h1:not(:first-child) {
  margin-top: 3px;
}

#FollowedUsers{
  --tw-bg-opacity: 1;
  background-color: rgba(254, 243, 199, var(--tw-bg-opacity));	
}

.listOfUsers {
  padding-top: 2mm;
  padding-bottom: 2mm;

	display: flex;
  flex-direction:column;
  flex-wrap:nowrap;
	/* flex-flow: row wrap; */
	justify-content:flex-start;
  align-items:stretch;
  align-content:center;
}
</style>