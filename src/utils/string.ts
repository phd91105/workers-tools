/**
 * Remove accents from Vietnamese characters
 */
export const removeDiacritics = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\s/g, '');
  str = str.replace(/'/g, '');

  return str;
};

/**
 * Remove single quote from string
 */
export const removeQuote = (str: string) => str.replace(/'/g, '');

/**
 * determineContentType
 */
export const determineContentType = (path: string) => {
  if (path.endsWith('.css')) {
    return 'text/css';
  } else if (path.endsWith('.js')) {
    return 'application/javascript';
  } else if (path.endsWith('.html')) {
    return 'text/html';
  } else if (path.endsWith('.svg')) {
    return 'image/svg+xml';
  }
  // Add more content types as needed
  return 'text/plain';
};

/**
 * decodeBase64
 */
export const decodeBase64 = (base64String: string) => {
  // Decode a base64 string to a Uint8Array
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};
