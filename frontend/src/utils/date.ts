export const formatDate = (iso: string) => {
  if (!iso || typeof iso !== "string") return "";

  const parts = iso.split("T");
  return parts[0] || "";
};

export const formatTime = (iso: string) => {
  if (!iso || typeof iso !== "string") return "";

  const parts = iso.split("T");
  const time = parts[1];

  return time ? time.slice(0, 5) : "";
};
