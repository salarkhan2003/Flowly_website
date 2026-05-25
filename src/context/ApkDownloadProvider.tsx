import { createContext, useContext, type ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import ApkDownloadOverlay from '../components/ApkDownloadOverlay';
import InstallInstructionsModal from '../components/InstallInstructionsModal';
import { useApkDownload } from '../hooks/useApkDownload';
import { useScrollLock } from '../hooks/useScrollLock';

type ApkDownloadContextValue = {
  isDownloading: boolean;
  startDownload: () => void;
};

const ApkDownloadContext = createContext<ApkDownloadContextValue | null>(null);

export function ApkDownloadProvider({ children }: { children: ReactNode }) {
  const {
    isDownloading,
    showInstructions,
    progress,
    startDownload,
    closeInstructions,
  } = useApkDownload();

  useScrollLock(isDownloading || showInstructions);

  return (
    <ApkDownloadContext.Provider value={{ isDownloading, startDownload }}>
      <AnimatePresence>
        {isDownloading && <ApkDownloadOverlay progress={progress} />}
      </AnimatePresence>

      <InstallInstructionsModal
        open={showInstructions}
        onClose={closeInstructions}
        onDownloadAgain={() => {
          closeInstructions();
          startDownload();
        }}
      />

      {children}
    </ApkDownloadContext.Provider>
  );
}

export function useApkDownloadContext(): ApkDownloadContextValue {
  const ctx = useContext(ApkDownloadContext);
  if (!ctx) {
    throw new Error('useApkDownloadContext must be used within ApkDownloadProvider');
  }
  return ctx;
}
