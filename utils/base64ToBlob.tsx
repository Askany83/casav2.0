export function base64ToBlob(base64Data: string): Blob | null {
  // Extract the Base64 data from the string (remove data URI prefix)
  const base64String = base64Data.replace(/^data:image\/\w+;base64,/, "");

  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  try {
    const blob = new Blob([byteArray], { type: "image/webp" }); // Adjust the type accordingly
    return blob;
  } catch (error) {
    console.error("Error creating Blob:", error);
    return null;
  }
}
