<style>

</style>


<template>
  <v-simple-table >
    <template v-slot:default>
      <tbody>
      <tr
          v-for="item in itemsForTable"
          :key="item.key"
      >
        <td>{{ item.key }}</td>
        <td>{{ item.value }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from "axios";

const PORT = 'http://localhost:3000';

export default {
  props : ["chosenNode","selectedData"],
  data () {
    return {
      key : [],
    };
  },

  mounted() {
    console.log("file name from nodedetails",this.selectedData )
    axios
        .post(PORT + '/filtres',this.selectedData)
        .then((response) =>{
          this.key = response.data;
        })

  },
  computed : {
    itemsForTable(){
      let arrayOfObject = [];
      if(this.chosenNode){
        for(let i =0;i<Object.keys(this.chosenNode).length;i++){
          if(this.key.includes(Object.keys(this.chosenNode)[i])){
            let tmpObject = {"key" :Object.keys(this.chosenNode)[i], "value":Object.values(this.chosenNode)[i] }
            arrayOfObject.push(tmpObject)
          }
        }
      }

      console.log("newArray", arrayOfObject)
      return arrayOfObject;

    }
  },
  methods :{

  }
}
</script>