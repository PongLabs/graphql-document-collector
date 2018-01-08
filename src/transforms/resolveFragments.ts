import {
  DocumentNode,
  FragmentDefinitionNode,
  OperationDefinitionNode,
  SelectionSetNode,
  FragmentSpreadNode,
  FieldNode,
} from 'graphql';
import {DocumentDirectory} from '../ast';

export interface FragmentMap {
  [fragmentName: string]: FragmentDefinitionNode;
}

export function createFragmentMap(
  dir: DocumentDirectory, fragmentMap: FragmentMap = {}
): FragmentMap {
  // TODO: make this function pure
  dir.documents.forEach(doc => doc.definitions.forEach(def => {
    if (def.kind === 'FragmentDefinition') {
      const fragDef = (def as FragmentDefinitionNode);
      fragmentMap[fragDef.name.value] = fragDef;
    }
  }));
  dir.directories.forEach(subDir => createFragmentMap(subDir, fragmentMap));
  return fragmentMap;
}

function fragmentSpreadsInSelectionSet(
  selSet: SelectionSetNode, fMap: FragmentMap, fragmentSpreads: Set<string>
): Set<string> {
  // TODO: make this function pure
  selSet.selections.forEach(sel => {
    if (sel.kind === 'FragmentSpread') {
      const fragmentName = (sel as FragmentSpreadNode).name.value;
      fragmentSpreads.add(fragmentName);
      fragmentSpreadsInSelectionSet(fMap[fragmentName].selectionSet, fMap, fragmentSpreads);
    } else if (sel.kind === 'Field' && (sel as FieldNode).selectionSet) {
      fragmentSpreadsInSelectionSet((sel as FieldNode).selectionSet, fMap, fragmentSpreads);
    }
  });
  return fragmentSpreads;
}

export function addFragmentsToDocument(document: DocumentNode, fMap: FragmentMap): DocumentNode {
  // TODO: make this function pure
  let definedFragments: Array<string> = [];
  let fragmentSpreads: Set<string> = new Set()
  document.definitions.forEach(def => {
    if (def.kind === 'FragmentDefinition') {
      definedFragments.push((def as FragmentDefinitionNode).name.value);
    }

    if (def.kind === 'OperationDefinition' || def.kind === 'FragmentDefinition') {
      const selSetDef = (def as OperationDefinitionNode|FragmentDefinitionNode);
      fragmentSpreadsInSelectionSet(selSetDef.selectionSet, fMap, fragmentSpreads)
    }
  });
  return Object.assign({}, document, {
    definitions: [
      ...document.definitions,
      ...Array.from(fragmentSpreads).filter(sp => definedFragments.indexOf(sp) === -1).map(sp => fMap[sp]),
    ],
  });
}



export function resolveFragments(
  dir: DocumentDirectory,
  fMap: FragmentMap = null
): DocumentDirectory {
  if (!fMap) {
    fMap = createFragmentMap(dir);
  }

  return Object.assign({}, dir, {
    directories: dir.directories.map(subDir =>
      resolveFragments(subDir, fMap)
    ),
    documents: dir.documents.map(doc =>
      addFragmentsToDocument(doc, fMap)
    ),
  });
}
