/// <reference types="vite/client" />

interface Offer {
    name:  string;
    surname: string;
    email: string;
    mobile: string;
    gate: string;
    styleGate: string;
    widthGate: string;
    heightGate: string;
    entryGate: boolean;
    widthEntryGate: string;
    heightEntryGate: string;
    montage: boolean;
    montagePlace: string;
    fenceParts: boolean;
    fencePartsList: FenceParts[];
    motor: boolean;
    msg: string;
}

interface FenceParts {
    count: number;
    width: string;
    height: string;
}

interface Contact {
    name:  string;
    email: string;
    mobile: string;
    msg: string;
}

interface Renovation {
    name:  string;
    email: string;
    mobile: string;
    widthGate: string;
    heightGate: string;
    msg: string;
    pictures: Array;
}

interface Image {
  path: string;
  main?: boolean;
}

interface Reference {
  _id: string;
  title: string;
  description: string;
  created_at: string;
  views?: number;
  gallery: Image[];
}

interface ReferencesData {
  references: Reference[];
  referencesLoading: boolean;
  reference: Reference | null;
  referenceLoading: boolean;
}

interface Settings {
  _id: string;
  receiving_email: string;
}

interface User {
  _id: string;
  username: string;
  password?: string;
  last_login?: string;
}

interface Auth {
  loggedIn: boolean;
  userData: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
}

interface ImportMetaEnv {
    VITE_BACKEND: string;
    [key: string]: string | undefined;
}

interface ImportMeta {
    env: ImportMetaEnv;
    glob(pattern: string): Record<string, () => Promise<any>>;
    globEager(pattern: string): Record<string, any>;
}