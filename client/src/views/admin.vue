<style scoped>

.admin_screen{
  background: black;
  height: 100%;
  background-image: url(../assets/network_logo.svg);
}
.title{
  text-align: center;
  margin-top: 70px;
  color: white;
  font-size: 100px !important;
}
.submit-button{
  margin-top: 20px;
}
.text{
  text-align: center;
  margin-top: 70px;
  color: white;
  font-size: 50px !important;
}
.files{
  display: flex;
  justify-content: center;
}
.file{
  color: white;
  padding: 10px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: -30px;
  font-size: 20px !important;
  border-radius: 15px !important;
  border-color: white !important;
  border-width: 1px !important;
  border: thin solid #CCCCCC;
  background-color: black !important;
}
.import{
  padding-top: 20px !important;
  width: 135px;
  margin: auto !important;
}
.input{
  width: 100px !important;
}
.file-select > .select-button {
  padding: 1rem;
  color: white;
  background: linear-gradient(to bottom right, rgb(255, 121, 0),blue);

  border-radius: 2rem;
  border-width: 1px !important;
  border: thin solid #CCCCCC;
  text-align: center;
  font-weight: bold;
}
.file-select > .select-button:hover {
    background:  rgb(255, 121, 0) !important;
    box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.4);
  }

/* to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
</style>

<template>
  <div class="admin_screen">
    <Header></Header>
    <div class="title">Zone Administrateur</div>
    <div class="text">Importer un nouveau fichier:</div>
    <div class="import">
      <label class="file-select">
        <div class="select-button">
          <span v-if="value">Selected File: {{value.name}}</span>
          <span v-else>Select File</span>
        </div>
        <input type="file" class="fileSelect" @change='fileChange($event)' />
        <v-btn class="submit-button" block color = "green" @click="choseFilter">Submit</v-btn>
        <p>{{ responseServer }}</p>
        <v-dialog v-model="dialog"  width="500px">
          <v-card>
            <v-card-title>your file is successfully uploaded</v-card-title>
          </v-card>
        </v-dialog>
      </label>
    </div>
  </div>
</template>

<script>
import Header from '../components/HeaderOrange'
import XLSX from "xlsx"
import axios from 'axios';
const PORT = 'http://localhost:3000';
export default {
  name: 'login',
  components: {
    Header
  },
  data :()=>({
    fileName : null,
    dialog : false
  }),
  methods : {
    fileChange(e)
    {
      this.dialog = true;
      console.log("in file change")
      var files = e.target.files, f = files[0];
      var reader = new FileReader();
      var fileExtension = f.name.split('.').pop();
      var fileName = f.name.split('.')[0];
      this.fileName = fileName;

      if( fileExtension === "xlsx")
        {

          reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, {type: 'array'});
          let sheetName = workbook.SheetNames[0]
          /* DO SOMETHING WITH workbook HERE */
          console.log(workbook);
          let worksheet = workbook.Sheets[sheetName];
          let fileToSend = XLSX.utils.sheet_to_json(worksheet);
          console.log("fileToSend",fileToSend);
          const toSend = {fileToSend, 'databaseName':fileName};
         
          axios
          .post(PORT + '/upload',toSend)
          .then((response) =>{
            console.log("filterd data",response);
          })
        }
        reader.readAsArrayBuffer(f);
          
          
        }
        
        else if (fileExtension === "json")
        {

          console.log("jsonFile");
          reader.onload = function(e){
          let contentString = JSON.parse(e.target.result);
          console.log(contentString); 
          // let contentJson = JSON.stringify(contentString);
          const toSend = {'data':contentString,'databaseName':fileName}; 
            
            axios
            .post(PORT + '/upload',toSend)
            .then((response) =>{
              console.log("Response message (database creation)",response);
            })
          }
          reader.readAsText(f);
        }
         

      // document.getElementById("popup-Form").style.display = "block";
         
        
    },
    choseFilter(){
      console.log("filename", this.fileName)
      axios
          .post(PORT + '/filtres',this.fileName)
          .then((response) =>{
            let dataToSendToSettings = {
              name : this.fileName,
              data : response.data
            }
            console.log("response from admin",response.data)
            this.$root.$emit("champsFile",dataToSendToSettings)
          })
      this.$router.push('/settings')
    }
  }
};
</script>