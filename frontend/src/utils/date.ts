export const formatDate = (iso: string) => {
  return iso.split("T")[0];
};

export const formatTime = (iso: string) => {
  return iso.split("T")[1].slice(0, 5);
};
