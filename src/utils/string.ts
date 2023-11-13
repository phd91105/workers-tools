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
