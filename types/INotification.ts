import { IDocument } from './IDocument';

export interface INotification {
  seen: boolean;
  document: IDocument;
}
