import { DirectoryTransform } from './transforms';
import { DocumentFlatMap } from './flatten';
export * from './transforms';
export * from './ast';
export * from './flatten';
export * from './loader';
export default function loadTransformAndFlatten(basePath: string, globPath: string, transforms?: DirectoryTransform[]): Promise<DocumentFlatMap>;
