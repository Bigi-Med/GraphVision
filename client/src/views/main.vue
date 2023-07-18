<style scoped>
.hello{
  background-color: black;
  height: 100%;
}
.btnSubmit{
  margin-left: 140px;
  margin-bottom: 20px;
  margin-top: -10px;
}

.title{
  text-align: center;
  font-size: 60px !important;
  font-weight: bold;
  padding-bottom: 40px;
  padding-top: 11px;
  color: white;
}
.row{
  margin: 0px;
}
.text{
  text-align: center;
  margin-left: 40px;
  margin-top: 30px;
  color: white;
  font-size: 25px !important;
}
.selectedFile{
  width: 100%;
  padding-left: 30px;
  padding-top: 10px;
  margin: auto;
}
.data-btn{
  font-size: 20px;
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 20px;
  background: linear-gradient(to bottom right, rgb(255, 121, 0),blue);
  color: white;
}
.data-btn:hover {
  background:  rgb(255, 121, 0) !important;
}
.filter{
  background-color: black;
}
.information-text{
  color: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  font-family: 'Oswald', sans-serif;
  width: 1100px; /* largeur obligatoire pour être centré */
}
</style>

<template>
  <div class="hello">
    <Header></Header>
    <h1 class="information-text" v-if="dataAvailable === false"> no file is available, please ask the administrator to upload the data </h1>
    <v-row class="row"  v-if="dataAvailable === true">
      <v-col class="filter" cols = "3">

        <div class="text">Selectionner les données à visualiser</div>
        <v-select
            :items="items"
            v-model = "selectedData"
            label="Données"
            outlined dense clearable chips
            class="selectedFile"

        ></v-select>
        <v-btn class ="btnSubmit" @click="submit">Submit</v-btn>
        <Filters v-bind:chosenFilters="chosenFilters" v-bind:tableOfItems="tableOfItems" v-on:Renitialiser="Renitialiser" ></Filters>
      </v-col>
      <v-col class="filter" cols="9">
        <MyNetwork v-bind:node="nodes" v-bind:edge="edges" v-on:clickNode="clickNode"></MyNetwork>
        <v-dialog v-model="dialog"  width="800 px">
          <NodeDetails v-bind:chosenNode="detailsNode" v-bind:selectedData="selectedData"></NodeDetails>
        </v-dialog>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Header from '../components/HeaderOrange'
import Filters from '../components/filters.vue'
import MyNetwork from "../components/network"
import NodeDetails from "../components/NodeDetails";
import axios from "axios";

const PORT = 'http://localhost:3000';
export default {
  name: "networkPage",
  components: {
    Header,
    NodeDetails,
    Filters,
    MyNetwork
  },
  props: {},
  data: function () {
    return {
      dataAvailable : false,
      selectedData : null,
      dialog: false,
      detailsNode : null,
      selectedFilters : null,
      filterdData : null,
      items: [],
      nodes : null,
      edges : null,
      selectedFile : null,
      chosenFilters : null,
      tableOfItems : null,
      requestedFilter : null,
    };
  },
  mounted() {
    axios
        .get(PORT + '/listCollection')
        .then((response) =>{
          console.log("availabale",response.data)
          if(response.data.length > 0){
            this.dataAvailable = true;
            this.items = response.data.map((item) => item.name);
          }
        })

    this.$root.$on("buildNetwork",(dataToBuildNetwork)=>{
      console.log("data to build network",dataToBuildNetwork)
      this.nodes = dataToBuildNetwork["node"];
      this.edges = dataToBuildNetwork["edge"];
      this.dataAvailable = true;
    })
    this.$root.$on("buildFilter",(dataToBuildFilter)=>{
      console.log(" dataToBuildFilter in filter",dataToBuildFilter)
      this.chosenFilters = dataToBuildFilter["chosenFilters"];
      this.tableOfItems = dataToBuildFilter["tableOfItems"];
    })
    this.$root.$on("filtredNetwork",(data)=>{
      this.nodes = data["node"]
      this.edges = data["edge"]
    })

    this.$root.$on("fileName",(name)=>{
      this.selectedFile = name;
      console.log("file name in main",this.selectedFile)
    })

    this.$root.$on("requestedFilter",(name)=>{
      console.log("requestedFilter in main",name)
      this.requestedFilter = name
    })

  },

  computed: {

  },
  methods : {
    clickNode(properties){
      console.log("from le main je capte",properties);
      console.log("this.selectedData",this.requestedFilter)

      axios
          .post(PORT + '/details',  {[properties] : ""})
          .then((response) =>{
            console.log("response in detail",response.data);
            this.detailsNode = response.data;
          })
      this.dialog = true;
    },
    Renitialiser(){
      this.filterdData = null;
    },
    submit(){
      //this.$root.$emit("selectedData",this.selectedData)
      this.$router.push('/settings')
    }
  }
};

</script>