import { DocumentNode } from 'graphql';
import { DocumentDirectory } from './ast';
export declare function loadDocument(pt: string): Promise<DocumentNode>;
export declare function loadGlob(basePath: string, globPath: string): Promise<DocumentDirectory>;
