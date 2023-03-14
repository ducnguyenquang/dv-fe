export function removeAccents(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function generateSku(name: string) {
  const sku = removeAccents(name).toLowerCase().replace(/\s/g, '-');
  return sku;
}

const isExistLink = (url: string, callback: any) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.status < 400);
    }
  };
  xhr.open('HEAD', url);
  xhr.send();
};

export const fixBrokenLink = (url: string) => {
  if (url && !url.includes('http')) {
    const link = 'http://' + url;
    return link;
  }
  return url;
};
