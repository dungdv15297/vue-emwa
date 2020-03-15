export const nameRules = [
    (v: any) => !!v || "Depart Name is required!",
    (v: any) =>
      (v && v.length <= 50) || "Depart Name must be less than 50 character!"
  ];
export const  descRules = [
    (v: any) => !!v || "Description is required!",
    (v: any) =>
      (v && v.length <= 250) || "Depart Name must be less than 250 character!"
  ];