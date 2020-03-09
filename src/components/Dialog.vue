<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Depart Manager</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>DEPART MANAGER</v-toolbar-title>
        </v-toolbar>

        <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(Details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Depart ID:</b></b-col>
            <b-col>{{ row.item.departId }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Depart Name:</b></b-col>
            <b-col>{{ row.item.departName }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
            <b-col>{{ row.item.description }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

  </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import Depart, { DepartImpl } from './depart'
@Component({})
export default class Dialog extends Vue {
  dialog = false;
  notifications = false;
  sound = true;
  widgets = false;
  fields = ['departId', 'departName', 'Details'];
  items: Depart[] = [];
  initialize(): void {
    this.getAllData();
  }
  async getAllData(): Promise<void> {
    await axios.get('http://localhost:9000/api/v1/depart')
    .then(response => {
      this.items = response.data.data
    })
  }
  async created(): Promise<void> {
    return this.initialize();
  }
  
}
</script>
<style scoped>
.hide  {
  color: blue;
}

.show {
  color: aqua;
}
</style>