import isNil from 'lodash/isNil';

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
  } else if (path.endsWith('.zip')) {
    return 'application/zip';
  } else if (path.endsWith('_gen.png')) {
    return 'image/png';
  } else if (path.endsWith('.ico')) {
    return 'image/vnd.microsoft.icon';
  }
  // Add more content types as needed
  return 'text/plain';
};

/**
 * Base64Utils
 */
export class Base64Utils {
  static bufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  static base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    return blob;
  }
}

/**
 * getCurrentDateTime
 */
export const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const msSeconds = String(now.getMilliseconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}${msSeconds}`;
};

type JsonArray = { [key: string]: string }[];

// Function to convert JSON array to ASCII Table
export function jsonToAsciiTable(json: JsonArray): string {
  // Calculate column widths
  const colWidths: { [key: string]: number } = {};
  json.forEach((row) => {
    Object.keys(row).forEach((col) => {
      colWidths[col] = Math.max(
        colWidths[col] || 0,
        row[col].length,
        col.length,
      );
    });
  });

  // Create the top row of the table
  const headerRow =
    '+-' +
    Object.keys(colWidths)
      .map((col) => '-'.repeat(colWidths[col]))
      .join('-+-') +
    '-+';
  const header =
    '| ' +
    Object.keys(colWidths)
      .map((col) => col.padEnd(colWidths[col], ' '))
      .join(' | ') +
    ' |';
  const dividerRow = headerRow;

  // Create data rows
  const dataRows = json
    .map((row) => {
      return (
        '| ' +
        Object.keys(colWidths)
          .map((col) => (row[col] || '').padEnd(colWidths[col], ' '))
          .join(' | ') +
        ' |'
      );
    })
    .join(`\n${dividerRow}\n`);

  // Combine all parts to form the ASCII table
  return `${headerRow}\n${header}\n${dividerRow}\n${dataRows}\n${headerRow}`;
}

export const truncateUtf8 = (str: string, n: number) => {
  let l = 0;
  let r = '';
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (
      (c >= 0x0 && c < 0x81) ||
      c === 0xf8f0 ||
      (c >= 0xff61 && c < 0xffa0) ||
      (c >= 0xf8f1 && c < 0xf8f4)
    ) {
      l += 1;
    } else {
      l += 2;
    }
    if (l <= n) {
      r = r.concat(str[i]);
    }
  }
  return r;
};

export const truncate2byte = (s: string, n: number) => {
  if (!isNil(s)) {
    const r = truncateUtf8(s.toString(), n);

    if (r.length !== s.toString().length) {
      return `${r}...`;
    } else {
      return r;
    }
  }

  return s;
};
