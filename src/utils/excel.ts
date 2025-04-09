export const isExcelFile = (file: File) => {
  const allowedExtensions = ['.xls', '.xlsx'];
  const fileName = file.name.toLowerCase();
  return allowedExtensions.some((ext) => fileName.endsWith(ext));
};
