import { DocumentNode, FragmentDefinitionNode } from 'graphql';
import { DocumentDirectory } from '../ast';
export interface FragmentMap {
    [fragmentName: string]: FragmentDefinitionNode;
}
export declare function createFragmentMap(dir: DocumentDirectory, fragmentMap?: FragmentMap): FragmentMap;
export declare function addFragmentsToDocument(document: DocumentNode, fMap: FragmentMap): DocumentNode;
export declare function resolveFragments(dir: DocumentDirectory, fMap?: FragmentMap): DocumentDirectory;
