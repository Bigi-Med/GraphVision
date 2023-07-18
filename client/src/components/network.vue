<style scoped>
.network {
  height: 200vh;
  width: 100%;
  background-color: black;
}
.networkCard {
  overflow-y: scroll;
}
</style>

<template>
  <v-card class="networkCard" height="650">
    <Network
        class="network"
        ref="network"
        :nodes="node"
        :edges="edge"
        :options="options"
        @select-node = "chosenNode"
    >
    </Network>
  </v-card>
</template>

<script>
import {Network} from "vue-vis-network";
export default {
  props: ["node", "edge"],
  components: {Network,},
  data: () => {
    return {
      options: {
        nodes: {
          shape: "dot",
          font : {
            color : '#ffffff'
          }
        },
        edges :{
          arrows : {
            to : true,
          }
        },
      },

    }
  },
  computed: {},
  methods: {
    chosenNode(properties) {
      if (properties) {
        this.$emit("clickNode", properties.nodes[0])
      }
    },
  }
}

</script>

