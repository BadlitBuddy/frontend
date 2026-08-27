import { useCallback, useEffect, useRef, useState } from "react";

export interface OPFSEntry {
  name: string;
  kind: "file" | "directory";
}

export interface UseOPFSResult {
  isSupported: boolean;
  isReady: boolean;
  error: Error | null;

  getRoot: () => Promise<FileSystemDirectoryHandle>;
  listEntries: (path?: string) => Promise<OPFSEntry[]>;
  readFile: (path: string) => Promise<string>;
  readFileAsArrayBuffer: (path: string) => Promise<ArrayBuffer>;
  writeFile: (
    path: string,
    data: string | Blob | BufferSource,
  ) => Promise<void>;
  deleteFile: (path: string) => Promise<void>;
  createDirectory: (path: string) => Promise<void>;
  deleteDirectory: (path: string, recursive?: boolean) => Promise<void>;
  exists: (path: string) => Promise<boolean>;
}

function splitPath(path: string): string[] {
  return path.split("/").filter(Boolean);
}

async function resolveDirectory(
  root: FileSystemDirectoryHandle,
  segments: string[],
  create: boolean,
): Promise<FileSystemDirectoryHandle> {
  let dir = root;
  for (const segment of segments) {
    dir = await dir.getDirectoryHandle(segment, { create });
  }
  return dir;
}

// TODO: use createSyncAccessHandle and move execution to web worker to speed this up
export function useOPFS(): UseOPFSResult {
  const isSupported =
    typeof navigator !== "undefined" &&
    "storage" in navigator &&
    typeof navigator.storage.getDirectory === "function";
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const rootRef = useRef<FileSystemDirectoryHandle | null>(null);

  useEffect(() => {
    if (!isSupported) {
      return;
    }

    let cancelled = false;

    navigator.storage
      .getDirectory()
      .then((root) => {
        if (cancelled) return;
        rootRef.current = root;
        setIsReady(true);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isSupported]);

  const getRoot = useCallback(async (): Promise<FileSystemDirectoryHandle> => {
    if (!isSupported) {
      throw new Error(
        "Origin Private File System is not supported in this browser.",
      );
    }
    if (!rootRef.current) {
      rootRef.current = await navigator.storage.getDirectory();
    }
    return rootRef.current;
  }, [isSupported]);

  const listEntries = useCallback(
    async (path = ""): Promise<OPFSEntry[]> => {
      const root = await getRoot();
      const dir = await resolveDirectory(root, splitPath(path), false);
      const entries: OPFSEntry[] = [];
      for await (const [name, handle] of dir.entries()) {
        entries.push({ name, kind: handle.kind });
      }
      return entries;
    },
    [getRoot],
  );

  const readFile = useCallback(
    async (path: string): Promise<string> => {
      const root = await getRoot();
      const segments = splitPath(path);

      const fileName = segments.pop();
      if (!fileName) throw new Error("Invalid file path.");

      const dir = await resolveDirectory(root, segments, false);
      const fileHandle = await dir.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      return file.text();
    },
    [getRoot],
  );

  const readFileAsArrayBuffer = useCallback(
    async (path: string): Promise<ArrayBuffer> => {
      const root = await getRoot();
      const segments = splitPath(path);

      const fileName = segments.pop();
      if (!fileName) throw new Error("Invalid file path.");

      const dir = await resolveDirectory(root, segments, false);
      const fileHandle = await dir.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      return file.arrayBuffer();
    },
    [getRoot],
  );

  const writeFile = useCallback(
    async (path: string, data: string | Blob | BufferSource): Promise<void> => {
      const root = await getRoot();
      const segments = splitPath(path);
      console.log("Writing file to OPFS:", path, data);

      const fileName = segments.pop();
      if (!fileName) throw new Error("Invalid file path.");

      const dir = await resolveDirectory(root, segments, true);
      const fileHandle = await dir.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(data);
      await writable.close();
    },
    [getRoot],
  );

  const deleteFile = useCallback(
    async (path: string): Promise<void> => {
      const root = await getRoot();
      const segments = splitPath(path);

      const fileName = segments.pop();
      if (!fileName) throw new Error("Invalid file path.");

      const dir = await resolveDirectory(root, segments, false);
      await dir.removeEntry(fileName);
    },
    [getRoot],
  );

  const createDirectory = useCallback(
    async (path: string): Promise<void> => {
      const root = await getRoot();
      await resolveDirectory(root, splitPath(path), true);
    },
    [getRoot],
  );

  const deleteDirectory = useCallback(
    async (path: string, recursive = false): Promise<void> => {
      const root = await getRoot();
      const segments = splitPath(path);

      const dirName = segments.pop();
      if (!dirName) throw new Error("Cannot delete the root directory.");

      const parent = await resolveDirectory(root, segments, false);
      await parent.removeEntry(dirName, { recursive });
    },
    [getRoot],
  );

  const exists = useCallback(
    async (path: string): Promise<boolean> => {
      try {
        const root = await getRoot();
        const segments = splitPath(path);
        const name = segments.pop();
        if (!name) return true;
        const dir = await resolveDirectory(root, segments, false);
        try {
          await dir.getFileHandle(name);
          return true;
        } catch {
          await dir.getDirectoryHandle(name);
          return true;
        }
      } catch {
        return false;
      }
    },
    [getRoot],
  );

  return {
    isSupported,
    isReady,
    error,
    getRoot,
    listEntries,
    readFile,
    readFileAsArrayBuffer,
    writeFile,
    deleteFile,
    createDirectory,
    deleteDirectory,
    exists,
  };
}
