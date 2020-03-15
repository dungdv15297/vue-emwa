<template>
<v-container>
    <depart />
    <hr>
    <position />
    <hr>
    <recruitment />
</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import Depart from '@/components/Depart/Depart-Mng.vue';
import Position from '@/components/Position/Position-Mng.vue';
import Recruitment from '@/components/Recruitment/Recruitment-Mng.vue';
export default {
  name: 'MainView',
  components: {
    Depart,
    Position,
    Recruitment
  }
}
</script>
