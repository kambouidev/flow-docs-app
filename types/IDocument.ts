export interface Contributor {
  ID: string;
  Name: string;
}

export interface IDocument {
  ID: string;
  Title: string;
  Version: string;
  Attachments: string[];
  Contributors: Contributor[];
  CreatedAt: string;
  UpdatedAt: string;
}
