import { Download } from 'lucide-react';
import { useApkDownloadContext } from '../context/ApkDownloadProvider';

type DownloadButtonVariant = 'primary' | 'header' | 'compact';

interface DownloadButtonProps {
  variant?: DownloadButtonVariant;
  label?: string;
  className?: string;
}

const variantClasses: Record<DownloadButtonVariant, string> = {
  primary:
    'touch-target w-full sm:w-auto min-h-[48px] p-3.5 px-5 sm:px-6 rounded-xl bg-[#00FF94] hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-display shadow-md shadow-[#00FF94]/20',
  header:
    'touch-target min-h-[40px] sm:min-h-[44px] p-2 px-3 sm:px-4 rounded-full bg-[#00FF94] hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait text-black font-bold text-[10px] sm:text-xs tracking-wide uppercase flex items-center gap-1 transition-all shadow-md shadow-[#00FF94]/10 font-display flex-shrink-0',
  compact:
    'touch-target w-full sm:w-auto min-h-[44px] p-2.5 px-4 rounded-lg bg-[#00FF94] hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait text-black font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all font-display border border-zinc-800',
};

function getButtonText(
  variant: DownloadButtonVariant,
  isDownloading: boolean,
  label?: string,
): string {
  if (isDownloading) return 'Downloading…';

  if (label) return label;

  switch (variant) {
    case 'header':
      return 'Download';
    case 'compact':
      return 'Get APK';
    default:
      return 'Download Android APK';
  }
}

export default function DownloadButton({
  variant = 'primary',
  label,
  className = '',
}: DownloadButtonProps) {
  const { isDownloading, startDownload } = useApkDownloadContext();
  const text = getButtonText(variant, isDownloading, label);

  return (
    <button
      type="button"
      onClick={startDownload}
      disabled={isDownloading}
      className={`${variantClasses[variant]} ${className}`.trim()}
      aria-label={variant === 'header' && !isDownloading ? 'Download Flowly APK' : undefined}
    >
      {isDownloading ? (
        <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full flex-shrink-0" />
      ) : (
        <Download className={variant === 'header' ? 'w-3.5 h-3.5 flex-shrink-0' : 'w-4 h-4 flex-shrink-0'} />
      )}
      <span className="truncate">
        {variant === 'header' ? (
          <>
            <span className="sm:hidden">{isDownloading ? '…' : 'APK'}</span>
            <span className="hidden sm:inline">{text}</span>
          </>
        ) : (
          text
        )}
      </span>
    </button>
  );
}
