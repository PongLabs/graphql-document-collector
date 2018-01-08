import {assert} from 'chai';
import {
  loadGlob,
  loadDocument,
} from '../../loader';
import {
  createFragmentMap,
  addFragmentsToDocument,
  resolveFragments,
} from '../resolveFragments';
import {DocumentDirectory} from '../../ast';

import path = require('path');

describe('Resolve fragments transformer', () => {
  describe('createFragmentMap', () => {
    it('should map fragments in a plain JS object', () => {
      return Promise.all([
        loadGlob(
          path.join(__dirname, '..', '..', '..', 'example'),
          '**/*.graphql'
        ),
        loadDocument(path.join(
          __dirname, '..', '..', '..', 'example', 'fragments', 'onFilm', 'Movie.graphql'
        )),
      ])
      .then(([root, movieFragDoc]: any[]) => {
        const fMap = createFragmentMap(root);
        assert.deepEqual(fMap['Movie'], movieFragDoc.definitions[0]);
      });
    });
  });

  describe('addFragmentsToDocument', () => {
    it('should resolve all nested fragments', () => {
      return loadGlob(
        path.join(__dirname, '..', '..', '..', 'example'),
        '**/*.graphql'
      )
      .then((root: DocumentDirectory) => {
        const fMap = createFragmentMap(root);
        const origDoc = root.directories[1].documents[0];
        const transformedDoc = addFragmentsToDocument(origDoc, fMap);
        assert.equal(transformedDoc.definitions.length, 3);
      });
    });
  });

  describe('resolveFragments', () => {
    it('should resolve all nested fragments in inner docs', () => {
      return loadGlob(
        path.join(__dirname, '..', '..', '..', 'example'),
        '**/*.graphql'
      )
      .then((root: DocumentDirectory) => {
        const transformedRoot = resolveFragments(root);
        assert.equal(transformedRoot.directories[1].documents[0].definitions.length, 3);
      });
    });

    it('should not re-add fragments already defined in the document', () => {
      return loadGlob(
        path.join(__dirname, '..', '..', '..', 'example'),
        '**/*.graphql'
      )
      .then((root: DocumentDirectory) => {
        const transformedRoot = resolveFragments(resolveFragments(root));
        assert.equal(transformedRoot.directories[1].documents[0].definitions.length, 3);
      });
    });
  });
});
