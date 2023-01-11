const { optimize } = require('svgo');
const { version } = require('vue');
const semverMajor = require('semver/functions/major')

module.exports = function vueSvgLoader(svg) {
  const { svgo: svgoConfig } = this.getOptions() || {};

  if (svgoConfig !== false) {
    ({ data: svg } = optimize(svg, {
      path: this.resourcePath,
      ...svgoConfig
    }));
  }

  if (semverMajor(version) === 2) {
    svg = svg.replace('<svg', '<svg v-on="$listeners"');
  }

  return `<template>${svg}</template>`;
};
