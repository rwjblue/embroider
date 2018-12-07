import { EmberAsset } from './app';

export function insertNewline(at: Node) {
  at.parentElement!.insertBefore(
    at.ownerDocument!.createTextNode("\n"),
    at
  );
}

export function insertScriptTag(location: Node, relativeSrc: string, opts?: { type?: string }) {
  let newTag = location.ownerDocument!.createElement('script');
  newTag.src = relativeSrc;
  insertNewline(location);
  location.parentElement!.insertBefore(newTag, location);
  if (opts && opts.type) {
    newTag.type = opts.type;
  }
  return newTag;
}

export function insertStyleLink(location: Node, relativeHref: string) {
  let newTag = location.ownerDocument!.createElement('link');
  newTag.rel = "stylesheet";
  newTag.href = relativeHref;
  insertNewline(location);
  location.parentElement!.insertBefore(newTag, location);
  return newTag;
}

export function stripInsertionMarkers(asset: EmberAsset) {
  let nodes = [
    asset.javascript,
    asset.styles,
    asset.implicitScripts,
    asset.implicitStyles,
    asset.testJavascript,
    asset.implicitTestScripts,
    asset.implicitTestStyles
  ];
  for (let node of nodes) {
    if (node && node.parentElement) {
        node.parentElement.removeChild(node);
    }
  }
}