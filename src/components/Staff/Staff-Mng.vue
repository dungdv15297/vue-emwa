<template>
  <v-row justify="center">
    <v-dialog v-model="fullForm" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" @click="onLoad()">Staff Manager</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="fullForm = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>STAFF MANAGER</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-data-table
            :headers="headers"
            :search="searchText"
            :fixed-header="true"
            :items="items"
            sort-by="staffId"
            class="10"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>STAFF MANAGEMENT</v-toolbar-title>
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
                  <!-- Card edit or create staff -->
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-form ref="form" v-model="valid" :lazy-validation="false">
                          <v-row>
                            <v-col cols="5">
                              <v-avatar tile color="blue" width="150px" height="150px">
                                <v-icon dark>mdi-alarm</v-icon>
                              </v-avatar>
                            </v-col>
                            <v-col cols="7">
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    v-model="editedItem.staffName"
                                    required
                                    :rules="rules.nameRules"
                                    :counter="30"
                                    label="Full Name"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12">
                                  <v-checkbox
                                    v-model="editedItem.gender"
                                    label="Is Male?"
                                    color="indigo"
                                    hide-details
                                  ></v-checkbox>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6">
                              <v-select
                                v-model="editedItem.departId"
                                :items="departItems"
                                item-text="departName"
                                item-value="departId"
                                label="Depart"
                                :rules="rules.departRules"
                                persistent-hint
                                single-line
                              ></v-select>
                            </v-col>
                            <v-col cols="6">
                              <v-select
                                v-model="editedItem.positionId"
                                :items="positionItems"
                                item-text="positionName"
                                item-value="positionId"
                                label="Position"
                                :rules="rules.positionRules"
                                persistent-hint
                                single-line
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="editedItem.address"
                                label="Address"
                                :rules="rules.addressRules"
                                :counter="150"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                v-model="editedItem.phoneNumber"
                                label="Phone No."
                                :rules="rules.phoneRules"
                                :counter="11"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                v-model="editedItem.email"
                                label="Email"
                                :rules="rules.emailRules"
                                :counter="50"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6">
                              <v-menu
                                v-model="startPicker"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="editedItem.startDate"
                                    label="Start Date"
                                    prepend-icon="event"
                                    :rules="rules.startRules"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.startDate"
                                  @input="startPicker = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="6">
                              <v-menu
                                v-if="!editedItem.status"
                                v-model="endPicker"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="editedItem.endDate"
                                    label="End Date"
                                    prepend-icon="event"
                                    :rules="rules.endRules"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.endDate"
                                  @input="endPicker = false"
                                ></v-date-picker>
                              </v-menu>
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
            <template v-slot:item.gender="{ item }">
              <v-icon v-if="item.gender" color="blue">done</v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              <v-simple-checkbox v-model="item.status" disabled></v-simple-checkbox>
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
import { Watch } from "vue-property-decorator";
import axios from "axios";
import { positionHeader } from "./staff-headers";
import * as rules from "./validation-rules";
import SearchDataList from "./search-data-list";
import Staff, { StaffImpl } from "@/domain/staff";
import { StaffResult } from "@/response/staff-response";
import Depart from "@/domain/depart";
@Component({})
export default class PositionMng extends Vue {
  departItems: Depart[] = [];
  positionItems: Position[] = [];
  startPicker = false;
  endPicker = false;
  rules = rules;
  valid = true;
  fullForm = false;
  dialog = false;
  //For v-table
  headers = positionHeader;
  editedIndex = -1;
  editedItem: Staff = new StaffImpl();
  items: SearchDataList[] = [];
  searchText = "";
  @Watch("dialog")
  onChangeDialog() {
    if (this.dialog) {
      this.getDepartItems();
      this.getPositionItems();
    }
  }
  async getDepartItems(): Promise<void> {
    this.departItems = [] as Depart[];
    await axios.get("http://localhost:9000/api/v1/depart").then(response => {
      if (response.data.data) {
        this.departItems = response.data.data as Depart[];
      }
    });
  }
  async getPositionItems(): Promise<void> {
    this.positionItems = [] as Position[];
    await axios.get("http://localhost:9000/api/v1/position").then(response => {
      if (response.data.data) {
        this.positionItems = response.data.data as Position[];
      }
    });
  }
  //Display STAFF id in table and another dialog
  convertId(id: number): string {
    return id >= 0 ? "STAFF_NWS_" + id : "NewPosition";
  }
  //Get form title for form dialog
  get formTitle(): string {
    const title = "Edit staff " + this.convertId(this.editedItem.positionId);
    return this.editedIndex === -1 ? "New staff" : title;
  }
  //Get all data of Position in db
  async getAllData(): Promise<void> {
    this.items = [];
    await axios.get("http://localhost:9000/api/v1/staff").then(response => {
      if (response.data.data) {
        response.data.data.forEach((element: StaffResult) => {
          const item: SearchDataList = new SearchDataList();
          Object.assign(item, element);
          item.convertId = this.convertId(item.staffId);
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
    this.editedItem = new StaffImpl();
    this.editedIndex = -1;
    (this.$refs.form as any).resetValidation();
  }
  async save(): Promise<void> {
    const staff: Staff = new StaffImpl();
    Object.assign(staff, this.editedItem);
    staff.position.positionId = staff.positionId;
    staff.depart.departId = staff.departId;
    if (this.editedIndex > -1) {
      //edit depaprt
      await axios
        .put("http://localhost:9000/api/v1/staff", staff)
        .then(response => {
          if (response.data.status === "SUCCESS") {
            this.getAllData();
          }
          this.$dialog.message.success(response.data.message, this.config);
        });
    } else {
      //create STAFF
      await axios
        .post("http://localhost:9000/api/v1/staff", staff)
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
      text: "Do you really want to delete this staff?",
      persistent: true
    });
    // if (!warning1) {
    //   return;
    // }
    // if (item.nos > 0) {
    //   const warning2 = await this.$dialog.warning({
    //     title: "Warning!!",
    //     text: "This staff has "+ item.nos +" staffs. Do you really want to delete this staff?",
    //     persistent: true
    //   })
    //   if (!warning2) {
    //     return;
    //   }
    // }
    if (warning1) {
      await axios
        .delete(`http://localhost:9000/api/v1/staff/${item.positionId}`)
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
      staff: "top-center",
      timeout: 2000
    };
  }
}
</script>
<style scoped>
</style>