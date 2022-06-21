const keywords = [
  "insert",
  "select",
  "delete",
  "alter",
  "drop",
  "use",
  "create",
  "table",
  "from",
  "on",
  "inner",
  "outer",
  "self",
  "left",
  "right",
  "join",
  "distinct",
  "add",
  "where",
  "column",
  "and",
  "or",
  "in",
  "any",
  "as",
  "between",
  "case",
  "when",
  "then",
  "end",
  "order",
  "primary",
  "desc",
  "exists",
  "foreign",
  "group",
  "by",
  "key",
  "having",
  "into",
  "like",
  "limit",
  "not",
  "update",
];

class Trie {
  constructor() {
    this.root = new Node(" ");
  }

  insert(word) {
    let current = this.root;
    for (let ch of word) {
      if (!current.hasChild(ch)) current.addChild(ch);
      current = current.getChild(ch);
    }

    current.isEndOfWord = true;
  }

  autoComplete(prefix) {
    let words = [];
    let lastNode = this.lastNodeOf(prefix);

    this.autoCompleteHelper(lastNode, prefix, words);
    return words;
  }

  autoCompleteHelper(node, prefix, words) {
    if (!node) return;

    if (node.isEndOfWord) words.push(prefix);

    for (let [key, child] of node.getChildren())
      this.autoCompleteHelper(child, prefix + child.value, words);
  }

  lastNodeOf(prefix) {
    let current = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let ch = prefix.charAt(i);
      if (current === undefined) return;
      let child = current.getChild(ch);
      if (child === null) return null;
      current = child;
    }
    return current;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
    this.isEndOfWord = false;
  }

  hasChild(ch) {
    return this.children.has(ch);
  }

  getChild(ch) {
    return this.children.get(ch);
  }

  getChildren() {
    return this.children;
  }

  addChild(ch) {
    this.children.set(ch, new Node(ch));
  }
}

const trie = new Trie();
for (let key of keywords) trie.insert(key);

export function getWords(prefix) {
  return trie.autoComplete(prefix);
}

export function hasWord(prefix) {
  for (let word of keywords) {
    if (word === prefix) return true;
  }
  return false;
}
