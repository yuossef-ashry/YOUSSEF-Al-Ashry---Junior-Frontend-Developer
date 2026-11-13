export const previewDevices = [
  { id: "laptop", label: "Laptop", width: 1440, height: 900 },
  { id: "tablet", label: "Tablet", width: 820, height: 1180 },
  { id: "phone", label: "Phone", width: 390, height: 844 },
] as const;

export type PreviewDevice = (typeof previewDevices)[number]["id"];
