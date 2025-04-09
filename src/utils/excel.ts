export const isExcelFile = (file: File) => {
  const allowedExtensions = ['.xls', '.xlsx'];
  const fileName = file.name.toLowerCase();
  return allowedExtensions.some((ext) => fileName.endsWith(ext));
};

export const downloadBlobFile = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
