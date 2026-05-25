export const APK_URL = '/Flowly.apk';
export const APK_FILENAME = 'Flowly.apk';

export function isAndroidDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
}

export function isChromeBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Chrome/i.test(ua) && !/Edg|OPR|SamsungBrowser/i.test(ua);
}

export function triggerApkDownload(): void {
  const link = document.createElement('a');
  link.href = APK_URL;
  link.download = APK_FILENAME;
  link.rel = 'noopener';
  link.setAttribute('type', 'application/vnd.android.package-archive');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
