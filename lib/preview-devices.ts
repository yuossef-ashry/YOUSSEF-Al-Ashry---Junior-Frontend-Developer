export const previewDevices = [
  { id: "laptop", label: "Laptop", width: 1440, height: 900 },
  { id: "tablet", label: "iPad", width: 820, height: 1180 },
  { id: "phone", label: "iPhone", width: 393, height: 852 },
] as const;

export type PreviewDevice = (typeof previewDevices)[number]["id"];
