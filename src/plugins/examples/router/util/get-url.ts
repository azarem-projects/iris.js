function getUrl(baseUrl?: string) {
  return window.location.href.replace(`${window.location.origin}${baseUrl || ''}`, '');
}

export default getUrl;
