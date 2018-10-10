import { DocumentNode, NameNode } from 'graphql';
export interface DocumentDirectory {
    kind: 'DocumentDirectory';
    name: NameNode;
    documents: DocumentNode[];
    directories: DocumentDirectory[];
}
