const html = require('choo/html')
var roundTo = require('round-to')

module.exports = (state, prev, send) => html`
  <article class="pa3 pa5-ns" data-name="slab-stat-small">
    <h3 class="f6 ttu tracked">Speed Test</h3>
    <div class="cf">
      <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
        <dd class="f6 fw4 ml0">ping</dd>
        <dd class="f3 fw6 ml0">${state.ping}</dd>
      </dl>
      <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
        <dd class="f6 fw4 ml0">download</dd>
        <dd class="f3 fw6 ml0">${state.download}</dd>
      </dl>
      <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
        <dd class="f6 fw4 ml0">upload</dd>
        <dd class="f3 fw6 ml0">${state.upload}</dd>
      </dl>
      <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
        <dd class="f6 fw4 ml0">server</dd>
        <dd class="f3 fw6 ml0">${state.data === null ? '' : state.data.server.host}</dd>
      </dl>
      <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
        <dd class="f6 fw4 ml0">location</dd>
        <dd class="f3 fw6 ml0">${state.data === null ? '' : state.data.server.location + ' (' + state.data.server.country + ')'}</dd>
      </dl>
      <dl class="fl fn-l w-50 dib-l w-auto-l lh-title">
        <dd class="f6 fw4 ml0">distance</dd>
        <dd class="f3 fw6 ml0">${state.data === null ? '' : roundTo(state.data.server.distance, 1) + ' km'}</dd>
      </dl>
    </div>
  </article>
`
