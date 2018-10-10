"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFragmentMap(dir, fragmentMap) {
    if (fragmentMap === void 0) { fragmentMap = {}; }
    dir.documents.forEach(function (doc) { return doc.definitions.forEach(function (def) {
        if (def.kind === 'FragmentDefinition') {
            var fragDef = def;
            fragmentMap[fragDef.name.value] = fragDef;
        }
    }); });
    dir.directories.forEach(function (subDir) { return createFragmentMap(subDir, fragmentMap); });
    return fragmentMap;
}
exports.createFragmentMap = createFragmentMap;
function fragmentSpreadsInSelectionSet(selSet, fMap, fragmentSpreads) {
    selSet.selections.forEach(function (sel) {
        if (sel.kind === 'FragmentSpread') {
            var fragmentName = sel.name.value;
            fragmentSpreads.add(fragmentName);
            fragmentSpreadsInSelectionSet(fMap[fragmentName].selectionSet, fMap, fragmentSpreads);
        }
        else if (sel.kind === 'Field' && sel.selectionSet) {
            fragmentSpreadsInSelectionSet(sel.selectionSet, fMap, fragmentSpreads);
        }
        else if ((sel.kind === 'InlineFragment')) {
            fragmentSpreadsInSelectionSet(sel.selectionSet, fMap, fragmentSpreads);
        }
    });
    return fragmentSpreads;
}
function addFragmentsToDocument(document, fMap) {
    var definedFragments = new Set();
    var fragmentSpreads = new Set();
    document.definitions.forEach(function (def) {
        if (def.kind === 'FragmentDefinition') {
            definedFragments.add(def.name.value);
        }
        if (def.kind === 'OperationDefinition' || def.kind === 'FragmentDefinition') {
            var selSetDef = def;
            fragmentSpreadsInSelectionSet(selSetDef.selectionSet, fMap, fragmentSpreads);
        }
    });
    return Object.assign({}, document, {
        definitions: document.definitions.concat(Array.from(fragmentSpreads).filter(function (sp) { return !definedFragments.has(sp); }).map(function (sp) { return fMap[sp]; })),
    });
}
exports.addFragmentsToDocument = addFragmentsToDocument;
function resolveFragments(dir, fMap) {
    if (fMap === void 0) { fMap = null; }
    if (!fMap) {
        fMap = createFragmentMap(dir);
    }
    return Object.assign({}, dir, {
        directories: dir.directories.map(function (subDir) {
            return resolveFragments(subDir, fMap);
        }),
        documents: dir.documents.map(function (doc) {
            return addFragmentsToDocument(doc, fMap);
        }),
    });
}
exports.resolveFragments = resolveFragments;
//# sourceMappingURL=resolveFragments.js.map