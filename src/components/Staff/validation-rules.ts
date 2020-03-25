export const nameRules = [
  (v: any) => !!v || "Name is required!",
  (v: any) =>
    (v && v.length <= 30) || "Name must be less than 30 character!"
];
export const departRules = [
  (v: any) => (v >= 0) || "Depart is required!"
];
export const positionRules = [
  (v: any) => (v >= 0) || "Position is required!",
];
export const addressRules = [
  (v: any) => !!v || "Address is required!",
  (v: any) =>
    (v && v.length <= 150) || "Address must be less than 150 character!"
];
const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
export const phoneRules = [
  (v: any) => !!v || "Phone number is required!",
  (v: any) => vnf_regex.test(v) || "Phone number must be valid!",
  (v: any) =>
    (v && v.length === 10) || "Phone number must have 10 character!",
];
export const emailRules = [
  (v: any) => !!v || 'E-mail is required',
  (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
  (v: any) =>
    (v && v.length <= 50) || "Email must be less than 50 character!"
];
export const startRules = [
  (v: any) => !!v || 'Start date is required',
  (v: any) =>
    (v && v.length === 10) || "Any date must haave 10 character!"
];
export const endRules = [
  (v: any) => !!v || 'End date is required',
  (v: any) =>
    (v && v.length === 10) || "Any date must haave 10 character!"
];
