export const formatDate = (date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
