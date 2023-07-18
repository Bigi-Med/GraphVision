
<style>
.img{
  height: 50px;
  width: 50px;
  margin-left: 0px;
  margin-right: 20px;
}


</style>


<template>
    <div>
        <v-app-bar
            color="black"
            dense
            dark
        >
          <img src = '../assets/Orange_logo.svg' class="img"/>
          <v-tabs>
            <v-tab @click="moveToHome">GRAPHVISION</v-tab>
            <v-spacer></v-spacer>
            <v-tab @click="moveToAdmin">Administrateur</v-tab>
            <!--v-tab @click="moveToLogin">Administrateur</v-tab-->
          </v-tabs>
          
        </v-app-bar>
    </div>

</template>

<script>
import XLSX from "xlsx"
// import axios from "axios";
// const PORT = 'http://localhost:4000';
export default{
  props : {},
  components : {},
  data : ()=>{
    return{
      search : null,
    }
  },
  methods: {
    /*moveToLogin(){
      this.$router.push('login')
    },*/
    moveToAdmin(){
      //this.$router.push('admin')
      this.$router.push('admin').catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
        ) {
          // But print any other errors to the console
          console.log(err);
        }
      });
    },
    moveToHome(){
      this.$router.push('/')
    },
    
    fileChange(e)
    {
      var files = e.target.files, f = files[0];
          var reader = new FileReader();
          console.log(reader);
          
          reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            let sheetName = workbook.SheetNames[0]
            /* DO SOMETHING WITH workbook HERE */
            console.log(workbook);
            let worksheet = workbook.Sheets[sheetName];
            console.log(XLSX.utils.sheet_to_json(worksheet));
      document.getElementById("popup-Form").style.display = "block";

            // axios
          // .post(PORT + '/upload',XLSX.utils.sheet_to_json(worksheet))
          // .then((response) =>{
          //   console.log("filterd data",response);
          // })
          };
          // console.log("worksheet is " + worksheet);
          reader.readAsArrayBuffer(f);
          // axios
          // .post(PORT + '/upload',XLSX.utils.sheet_to_json(worksheet))
          // .then((response) =>{
          //   console.log("filterd data",response);
          // })
    }
  }
}




</script>