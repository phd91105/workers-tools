import JSZip from 'jszip';

/**
 * getZippedFlatIcon.
 */
export async function getZipped(links: { fileName: string; url: string }[]) {
  const zip = JSZip();

  const promises = links.map((o) => fetch(o.url));
  const response = await Promise.all(promises);

  response.forEach((item, index) => {
    zip.file(links[index].fileName, item.arrayBuffer());
  });

  const data = await zip.generateAsync({ type: 'arraybuffer' });
  return data;
}
