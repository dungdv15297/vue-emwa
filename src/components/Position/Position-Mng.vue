<template>
  <v-row justify="center">
    <v-dialog v-model="fullForm" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" @click="onLoad()">POSITION Manager</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="fullForm = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>POSITION MANAGER</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-data-table
            :headers="headers"
            :search="searchText"
            :height="'100%'"
            :fixed-header="true"
            :items="items"
            sort-by="staffId"
            class="10"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>POSITION MANAGEMENT</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field
                  label="Search......"
                  append-icon="search"
                  v-model="searchText"
                  hide-details
                  outlined
                  dense
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn icon color="green" @click="onLoad()">
                  <v-icon dense :dark="true">replay</v-icon>
                </v-btn>

                <!-- Create or Edit dialog -->
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="indigo" v-on="on">
                      <v-icon dense>add_circle</v-icon>
                    </v-btn>
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
                                v-model="editedItem.positionName"
                                required
                                :rules="rules.nameRules"
                                :counter="50"
                                label="Position Name"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-textarea
                                v-model="editedItem.description"
                                label="Description"
                                :rules="rules.descRules"
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
            <template v-slot:item.actions="{ item }">
              <v-btn icon color="indigo" @click="editItem(item)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteItem(item)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <!-- Create or Edit dialog -->
          </v-data-table>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import Position, { PositionImpl } from "@/domain/position";
import { positionHeader } from "./position-headers";
import * as rules from "./validation-rules";
import SearchDataList from "./search-data-list";
@Component({})
export default class PositionMng extends Vue {
  rules = rules;
  valid = true;
  fullForm = false;
  dialog = false;
  //For v-table
  headers = positionHeader;
  editedIndex = -1;
  editedItem: Position = new PositionImpl();
  items: SearchDataList[] = [];
  searchText = "";
  //Display POSITION id in table and another dialog
  convertId(id: number): string {
    return id >= 0 ? "POSITION_NWS_" + id : "NewPosition";
  }
  //Display the number of staffs in POSITION
  nos(item: Position): number {
    return (item.staffs as any).length;
  }
  //Get form title for form dialog
  get formTitle(): string {
    const title = "Edit position " + this.convertId(this.editedItem.positionId);
    return this.editedIndex === -1 ? "New position" : title;
  }
  //Get all data of Position in db
  async getAllData(): Promise<void> {
    this.items = [];
    await axios.get("http://localhost:9000/api/v1/position").then(response => {
      if (response.data.data) {
        response.data.data.forEach((element: Position) => {
          const item: SearchDataList = new SearchDataList();
          Object.assign(item, element);
          item.nos = this.nos(element);
          item.convertId = this.convertId(item.positionId);
          this.items.push(item);
        });
      }
    });
  }
  async onLoad(): Promise<void> {
    this.getAllData();
  }
  close(): void {
    this.dialog = false;
    this.editedItem = new PositionImpl();
    this.editedIndex = -1;
    (this.$refs.form as any).resetValidation();
  }
  async save(): Promise<void> {
    const position: Position = new PositionImpl();
    Object.assign(position, this.editedItem);
    if (this.editedIndex > -1) {
      //edit depaprt
      await axios
        .put("http://localhost:9000/api/v1/position", position)
        .then(response => {
          if (response.data.status === "SUCCESS") {
            this.getAllData();
          }
          this.$dialog.message.success(response.data.message, this.config);
        });
    } else {
      //create POSITION
      await axios
        .post("http://localhost:9000/api/v1/position", position)
        .then(response => {
          if (response.data.status === "SUCCESS") {
            this.getAllData();
          }
          this.$dialog.message.success(response.data.message, this.config);
        });
    }
    this.close();
  }
  async editItem(item: SearchDataList): Promise<void> {
    this.editedIndex = this.items.indexOf(item);
    Object.assign(this.editedItem, item);
    this.dialog = true;
  }
  async deleteItem(item: SearchDataList) {
    const warning1 = await this.$dialog["warning"]({
      title: "Warning!!",
      text: "Do you really want to delete this position?",
      persistent: true
    });
    if (!warning1) {
      return;
    }
    if (item.nos > 0) {
      const warning2 = await this.$dialog.warning({
        title: "Warning!!",
        text: "This position has "+ item.nos +" staffs. Do you really want to delete this position?",
        persistent: true
      })
      if (!warning2) {
        return;
      }
    }
    if (warning1) {
      await axios
        .delete(`http://localhost:9000/api/v1/position/${item.positionId}`)
        .then(response => {
          if (response.data.status === "SUCCESS") {
            this.getAllData();
          }
          this.$dialog.message["success"](response.data.message, this.config);
        })
        .catch(error => {
          this.$dialog.message.error(error, this.config);
        });
    }
  }
  get config(): object {
    return {
      position: "top-center",
      timeout: 2000
    };
  }
}
</script>
<style scoped>
</style>