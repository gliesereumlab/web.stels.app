/**
 * Represents the configuration data for an application.
 */
export interface TypeConfig {
  usName: string;
  usDescription: string;
  usType: string;
  usActive: boolean;
  usVersion: string;
  usDomain: string;
  usGit: TypeGit;
  usLanguage: TypeLanguage;
  usUrls: TypeUrls;
  usDataStorage: TypeDataStorage;
  usAuthor: TypeAuthor;
  usCopyright: string;
}

/**
 * Represents the structure of update data.
 *
 * @interface
 * @export
 */
export interface TypeUpdateData {
  e: string;
  E: number;
  s: string;
  U: number;
  u: number;
  b: [string, string][];
  a: [string, string][];
}


/**
 * Represents an error that occurred during data fetching.
 */
export interface TypeFetchError {
  message: string;
  status?: number;
  type: 'FETCH_ERROR';
}

/**
 * Represents the properties of an error.
 */
export type TypeErrorProps = {
  msg: string;
  code: number;
};

/**
 * Contains information about the application's Git repository.
 */
export interface TypeGit {
  usUrl: string;
}

/**
 * Represents the application's language settings.
 */
export interface TypeLanguage {
  usDefault: string;
  usPacks: TypePack[];
}

/**
 * Contains information about a language pack.
 */
export interface TypePack {
  usName: string;
  usKey: string;
  usLocale: string;
  usPhrases: TypePhrase[];
}

/**
 * Represents a phrase within a language pack.
 */
export interface TypePhrase {
  usKey: string;
  usValue: string;
}

/**
 * Contains information about the application's URL structure.
 */
export interface TypeUrls {
  usVersion: string;
  usServers: {
    usSignal: string;
    usApi: string;
    usAccount: string;
  };
}

/**
 * Represents the application's data storage settings.
 */
export interface TypeDataStorage {
  usType: string;
  usBrowserWindow: string;
  usKeys: {
    usAppConfig: string;
    usAppLanguage: string;
    usAppTheme: string;
  };
}

/**
 * Contains information about the author of the application.
 */
export interface TypeAuthor {
  usFullName: string;
  usEmail: string;
  usPhone: string;
}
