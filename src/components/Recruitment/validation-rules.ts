export const titleRules = [
  (v: any) => !!v || "Title is required!",
  (v: any) =>
    (v && v.length <= 50) || "Title must be less than 50 character!"
];
export const descRules = [
  (v: any) => !!v || "Description is required!",
  (v: any) =>
    (v && v.length <= 250) || "Description must be less than 250 character!"
];