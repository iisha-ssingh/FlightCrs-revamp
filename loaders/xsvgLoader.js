module.exports = function parseSVG(source) {
  const newSource = source.replace('svg', 'svg {...props}')
  return `import React from 'react';
      const SVG=(props)=> ${newSource};
      export default SVG;`;
};
