class Node {
  constructor({ metadata, children }) {
    this.children = children;
    this.metadata = metadata;
  }

  calculateMetadataTotal() {
    const localTotal = this.metadata.reduce((acc, curr) => acc + curr, 0);
    const childrenTotal = this.children.reduce((acc, curr) => acc + curr.calculateMetadataTotal(), 0);

    return localTotal + childrenTotal;
  }

  calculateNodeValue() {
    if (!this.children.length) {
      return this.metadata.reduce((acc, curr) => acc + curr, 0);
    }

    return this.metadata.reduce((acc, curr) => {
      const child = this.children[curr - 1];
      if (child) {
        return acc + child.calculateNodeValue();
      }

      return acc;
    }, 0);
  }
}

const getHeaderBytes = licence => licence.splice(0, 2);

const parseLicenceIntoNodes = licence => {
  const [childNodes, metadataCount] = getHeaderBytes(licence);
  const children = [];

  if (childNodes > 0) {
    for (let i = 0; i < childNodes; i += 1) {
      const child = parseLicenceIntoNodes(licence);
      children.push(child);
    }
  }

  const metadata = licence.splice(0, metadataCount);

  return new Node({ children, metadata });
};

module.exports = {
  parseLicenceIntoNodes,
};
