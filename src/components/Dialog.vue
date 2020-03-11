<template>
  <v-row justify="center">
    <v-dialog v-model="fullForm" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" @click="onLoad()">Depart Manager</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="fullForm = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>DEPART MANAGER</v-toolbar-title>
        </v-toolbar>
        <v-container>
        <v-data-table :headers="headers" :search="searchText" :height="'100%'" :fixed-header="true" :items="items" sort-by="staffId" class="10">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>DEPART INFORMATION AND MANAGEMENT</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <!-- Create or Edit dialog -->
              <v-dialog v-model="dialog" persistent max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-row>
                    <v-col cols="8">
                    </v-col>
                    <v-col cols="2">
                      <v-btn :loading="loading" icon color="green" @click="onLoad()">
                      <v-icon dense :dark="true">replay</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn icon color="indigo" v-on="on">
                      <v-icon dense>add_circle</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form ref="form" v-model="valid" :lazy-validation="false">
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.departName"
                            required
                            :rules="nameRules"
                            :counter="50"
                            label="Depart Name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-textarea
                            v-model="editedItem.description"
                            label="Description"
                            :rules="descRules"
                            :counter="250"
                            required
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save()" :disabled="!valid">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.nos="{ item }">
            {{nos(item)}}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn :loading="loading" icon color="indigo" @click="editItem(item)">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn :loading="loading" icon color="red" @click="deleteItem(item)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <!-- Create or Edit dialog -->

          <!-- Button reset when table have no data -->
          <template v-slot:no-data>
            <v-btn color="primary" @click="onLoad()">Reset</v-btn>
          </template>
          <!-- Button reset when table have no data -->
        </v-data-table>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import Depart, { DepartImpl } from "@/domain/depart";
import { departHeader } from "./depart-headers"
@Component({})
export default class Dialog extends Vue {
  valid = true;
  fullForm = false;
  dialog = false;
  loading = false;
  //For v-table
  headers = departHeader;
  editedIndex = -1;
  editedItem: Depart = new DepartImpl();
  defaultItem: Depart = new DepartImpl();
  items: Depart[] = [];
  searchText = '';

  //Validate rules
  nameRules = [
    v => !!v || 'Depart Name is required!',
    v => (v && v.length <=50) || 'Depart Name must be less than 50 character!'
  ];
  descRules = [
    v => !!v || 'Description is required!',
    v => (v && v.length <=250) || 'Depart Name must be less than 250 character!'
  ];
  //Display depart id in table and another dialog
  convertId(id: number): string {
    return id >= 0 ? "STAFF_NWS_" + id : "NewDepart";
  }
  //Display the number of staffs in depart
  nos(item: Depart): number {
    return item.staffs.length;
  }
  //Get form title for form dialog
  get formTitle(): string {
    const title = "Edit Depart "+this.convertId(this.editedItem.departId);
    return this.editedIndex === -1 ? "New Depart" : title;
  }
  //Get all data of depart in db
  async getAllData(): Promise<void> {
    await axios.get("http://localhost:9000/api/v1/depart").then(response => {
      this.items = response.data.data;
    });
  }
  async onLoad(): Promise<void> {
    this.loading = true;
    await this.getAllData();
    this.loading = false;
  }
  editItem(item: Depart) {
    this.editedIndex = this.items.indexOf(item);
    this.editedItem = item;
    this.dialog = true;
  }
  deleteItem(item: Depart) {
    const index = this.items.indexOf(item);
    //delete depart
  }
  close() {
    this.dialog = false;
    setTimeout(() => {
      this.editedItem = this.defaultItem;
      this.editedIndex = -1;
      this.$refs.form.resetValidation();
    }, 300);
  }
  save() {
    if (this.editedIndex > -1) {
      //Edit depart
    } else {
      //Create depart
    }
    this.close();
  }
}
</script>
<style scoped>
</style>