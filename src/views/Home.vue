<template>
  <div id="home">


      <b-img up alt="Naslovan slika" :src="image"></b-img>


     <div class="navigation" >
      <ul>
        <b-button variant="warning"><router-link to="Student">DODAJ STUDENTA</router-link></b-button>

        <b-button variant="warning"><router-link to="Grupa">PRIJAVA GRUPA</router-link></b-button>

        <b-button variant="warning"><router-link to="Project">PRIJAVA PROJEKTA</router-link> </b-button<>
        <b-button variant="warning"><router-link to="StudentGrade">OCJENE STUDENATA</router-link></b-button>

      </ul>
    </div>
  </div>


</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
      welcomeMsg: 'Dobrodošli na kolegij Programsko Inžinjerstvo',
    }
  },
  components: {
  },

  computed: {
    image () {
      return require('../assets/wortwolke_software-engineering.jpg');
    }
  }
}
</script>
