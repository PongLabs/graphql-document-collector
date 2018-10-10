export { resolveFragments } from './resolveFragments';
import { DocumentDirectory } from '../ast';
export declare type DirectoryTransform = (dir: DocumentDirectory) => DocumentDirectory;
export declare function applyTransforms(dir: DocumentDirectory, ...transforms: DirectoryTransform[]): DocumentDirectory;
