<style>
.card{
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 1OOpx;
}
.btn-admin{
  margin-top: 30px;
  margin-left: 610px;
  margin-bottom: 20px;
}
.containerr{
  background: black;
  padding-right: 200px;
}
.title-card{
  color: white;
  margin-bottom: 50px;
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 1100px

}
.text-information{
  color: white;
  margin-left: 350px;
  margin-top: 50px;
  margin-bottom: 70px;
}
.question{
  color: white;
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
}
.chose-filter{
  margin-right: 110px;
}

</style>

<template>
  <div class="containerr">
    <Header></Header>
    <v-card class="card" color ="black">
      <v-card-title  class="title-card">Please select following feilds to build your network of data</v-card-title>
      <v-row align="center" v-for="(question,index) in requestedInformation" :key ="index">
        <v-col cols="6">
          <p class="question">
            {{ question.question }}
          </p>
        </v-col>
        <v-col cols="5">
          <v-select
              :items="items"
              v-model = "question.selectedValue"
              :label="items[0]"
              outlined
              dense chips
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 class ='text-information'>Please choose filters that will allow you to filter your data</h3>
          <v-select
              :items="items"
              v-model = "requestedFilter"
              label="select"
              outlined
              class="chose-filter"
              dense chips multiple
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card>
    <v-btn @click="showGraphe" class="btn-admin" color="green">Show Graphe</v-btn>
  </div>
</template>

<script>
import Header from "../components/HeaderOrange.vue";
import axios from "axios";

const PORT = 'http://localhost:3000';

export default {
  props : [],
  components : {Header},
  data :()=>({
    requestedInformation : [
      {
        "question": "please select the field that represents the id of elements",
        "field" : "id",
        "selectedValue" : null
      },
      {
        "question":"please select the field that will group your elements",
        "field" : "group",
        "selectedValue" : null
      },
      {
        "question": "please select the field that represents the label of elements",
        "field" : "label",
        "selectedValue" : null
      },
      {
        "question": "please select the field that represents the link between the elements",
        "field" : "link",
        "selectedValue" : null
      },
    ],
    requestedFilter : [],

    items : [],
    name : null,
    champsFile : null,

  }),
  mounted() {

   this.$root.$on("champsFile",(champsFile)=>{
      console.log(" champsFile in settings",champsFile)
     this.champsFile = champsFile;
     this.items = champsFile.data;
    })
  },
  methods :{
    showGraphe(){
      let requestedInformations = {
        data : this.requestedInformation,
        name : this.champsFile.name
      };

      let requestedFilters = {
        data : this.requestedFilter,
        name : this.champsFile.name
      }
      axios
          .post(PORT + '/buildNetwork', requestedInformations)
          .then((response) =>{
            this.$root.$emit("buildNetwork",response.data)
          })
      axios
          .post(PORT + '/buildFilter', requestedFilters)
          .then((response) =>{
            this.$root.$emit("buildFilter",response.data)
          })
      this.$root.$emit("fileName",this.champsFile.name)
      this.$root.$emit("requestedFilter",this.requestedFilter)
      this.$router.push('/')
    },

  }
}
</script>