import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  uploadTimestamp: string;
  sessionId: string;
}

export interface ComplianceReport {
  status: 'pending' | 'scanning' | 'completed';
  piiCategories?: number;
  entities?: {
    fullNames: number;
    datesOfBirth: number;
    identificationNums: number;
  };
  detectedContent?: string;
}

export interface EncryptionStatus {
  isEncrypted: boolean;
  algorithm?: string;
  timestamp?: string;
}

export interface ShardData {
  shards: Array<{
    id: string;
    size: number;
    storedOn: number;
    replication: number;
  }>;
  totalShards: number;
  distributionNodes: number;
}

export interface FileState {
  // Core file data
  file: File | null;
  fileId: string | null;
  metadata: FileMetadata | null;

  // Processing states
  complianceReport: ComplianceReport | null;
  encryptionStatus: EncryptionStatus | null;
  shardData: ShardData | null;

  // Backend response
  backendData: any | null;
}

interface FileContextType {
  fileState: FileState;
  updateFileState: (updates: Partial<FileState>) => void;
  setFile: (file: File | null) => void;
  setFileId: (fileId: string | null) => void;
  setMetadata: (metadata: FileMetadata | null) => void;
  setComplianceReport: (report: ComplianceReport | null) => void;
  setEncryptionStatus: (status: EncryptionStatus | null) => void;
  setShardData: (data: ShardData | null) => void;
  setBackendData: (data: any) => void;
  resetFileState: () => void;
}

const initialFileState: FileState = {
  file: null,
  fileId: null,
  metadata: null,
  complianceReport: null,
  encryptionStatus: null,
  shardData: null,
  backendData: null,
};

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [fileState, setFileStateInternal] = useState<FileState>(initialFileState);

  const updateFileState = (updates: Partial<FileState>) => {
    setFileStateInternal(prev => ({ ...prev, ...updates }));
  };

  const setFile = (file: File | null) => {
    updateFileState({ file });
  };

  const setFileId = (fileId: string | null) => {
    updateFileState({ fileId });
  };

  const setMetadata = (metadata: FileMetadata | null) => {
    updateFileState({ metadata });
  };

  const setComplianceReport = (report: ComplianceReport | null) => {
    updateFileState({ complianceReport: report });
  };

  const setEncryptionStatus = (status: EncryptionStatus | null) => {
    updateFileState({ encryptionStatus: status });
  };

  const setShardData = (data: ShardData | null) => {
    updateFileState({ shardData: data });
  };

  const setBackendData = (data: any) => {
    setFileStateInternal(prev => ({
      ...prev,
      backendData: data,
      fileId: data?.fileId ?? prev.fileId,
    }));
  };

  const resetFileState = () => {
    setFileStateInternal(initialFileState);
  };

  const value = useMemo(
    () => ({
      fileState,
      updateFileState,
      setFile,
      setFileId,
      setMetadata,
      setComplianceReport,
      setEncryptionStatus,
      setShardData,
      setBackendData,
      resetFileState,
    }),
    [fileState],
  );

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
}

export function useFile() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
}
