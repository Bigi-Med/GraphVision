<style>
.cardFilter{
  height: 450px;
  padding-top: 10px;
  margin-left: 30px;
  border-radius: 15px !important;
  border-color: white !important;
  border-width: 1px !important;
  border: thin solid #CCCCCC;
  background-color: black !important;
}
.v-list-item__title:hover{
  color: #ffd54f !important;
}
.v-list .v-list-item--active {
  background-color: green!important;
}
.v-list .v-list-item--active .v-list-item__title {
  color: #D81B60 !important;
}
.v-application--is-ltr .v-text-field .v-label{
  color: white;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before{
  border-color: white;
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset{
  color: white;
}
.theme--light.v-input input, .theme--light.v-input textarea{
  color: white;
}

.btn{
  border-radius: 15px;
  margin-bottom: 10px;
}
</style>

<template>
  <v-card class ="cardFilter">
    <v-col>
      <v-text-field
          v-model="search"
          color="rgb(255, 168, 91)"
          append-icon="mdi-magnify"
          label="Search"
      ></v-text-field>
      <v-select v-for="(item,index) in chosenFilters " :key ="item.filter"
                :items="tableOfItems[index]"
                v-model = "item.selectedValue"
                append-icon ="arrow-drop-down-circle"
                :label="item.filter"
                outlined
                class="selectedFilter"
                dense chips multiple
                clearable
      ></v-select>
      <v-btn block class="btn"  @click = "sendFilters" >
        Recherche
      </v-btn>
      <v-btn block class="btn" @click = "Renitialiser">
        Rénitialiser
      </v-btn>
    </v-col>
  </v-card>

</template>

<script>
import axios from "axios";

const PORT = 'http://localhost:3000';

export default {
  props : ["chosenFilters", "tableOfItems"],
  data: () => ({
    search : null,
  }),
  computed : {
    selectedFilters(){
      return this.chosenFilters.reduce((obj, item) => (obj[item.filter] = item.selectedValue, obj) ,{});
    },
  },
  methods : {
    sendFilters(){
      axios
          .post(PORT + '/selectedData', this.selectedFilters)
          .then((response) =>{
            this.$root.$emit("filtredNetwork",response.data)
          })
    },
    Renitialiser(){
      this.$emit("Renitialiser")
    },
  }
}
</script>
