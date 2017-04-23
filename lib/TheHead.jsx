'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TheStyle from 'the-style'
import { spinalcase } from 'stringcase'

const addQuery = (url, query) => [ url, query ].join(/\?/.test(url) ? '&' : '?')
const viewPortString = (values) => Object.keys(values || {}).map((key) =>
  [ spinalcase(key), values[ key ] ].join('=')
).join(',')
const stringify = (vars) => vars ? JSON.stringify(vars) : 'null'

/**
 * Head of the-components
 */
class TheHead extends React.PureComponent {
  render () {
    const s = this
    const { props } = s
    let {
      id,
      className,
      charSet,
      title,
      icon,
      globals,
      base,
      baseTarget,
      viewPort,
      children,
      js,
      css,
      metaContents,
      metaProperties,
      itemProps,
      color,
      manifest
    } = props

    let vQuery = s.getVersionQuery()
    return (
      <head className={ classnames('the-head', className) }
            { ...{ id }}
      >

        { charSet && (<meta className='the-head-charset' charSet={ charSet }/>) }
        { base && <base className='the-head-base' href={ base } target={ baseTarget }/> }
        { title && (<title className='the-head-title'>{ title }</title>) }
        { icon && (<link className='the-head-icon' rel='icon' href={ addQuery(icon, vQuery) }/>) }
        { viewPort && (<meta className='the-head-viewport' name='viewport' content={ viewPortString(viewPort) }/>) }
        {
          metaContents && Object.keys(metaContents).map((name) => (
            <meta className='the-head-meta-content' key={name} name={name} content={ metaContents[ name ]}/>
          ))
        }
        {
          metaProperties && Object.keys(metaProperties).map((name) => (
            <meta className='the-head-meta-property' key={name} name={name} property={ metaProperties[ name ]}/>
          ))
        }
        {
          itemProps && Object.keys(itemProps).map((name) => (
            <meta className='the-head-item-prop' key={name} itemProp={name} content={ metaContents[ name ]}/>
          ))
        }
        { color && (<meta className='the-head-theme-color' name='theme-color' content={ color }/>) }
        { manifest && (<link className='the-head-manifest' rel='manifest' href={ color }/>) }

        {
          [].concat(css).filter(Boolean).map((url) => (
            <link rel='stylesheet'
                  type='text/css'
                  key={ url }
                  className='the-head-css'
                  href={ addQuery(url, vQuery) }/>
          ))
        }
        {
          globals && Object.keys(globals).map((name) => (
            <script type='text/javascript'
                    key={ name }
                    className='the-head-globals'
                    dangerouslySetInnerHTML={
                      { __html: `window.${name}=${stringify(globals[ name ])}` }
                    }>
            </script>
          ))
        }
        {
          [].concat(js).filter(Boolean).map((url) => (
            <script type='text/javascript'
                    key={ url }
                    className='the-head-js'
                    src={ addQuery(url, vQuery)}>
            </script>
          ))
        }
        { children }
      </head>
    )
  }

  getVersionQuery () {
    const s = this
    let { versionKey, version } = s.props
    return [ versionKey, version ].join('=')
  }

  /**
   * Define style
   * @param [options={}] options - Optional settings
   * @returns {Object} Style object
   */
  static styles (options = {}) {
    let {} = options
    return {
      root: {}
    }
  }
}

TheHead.propTypes = {
  /** CSS class name */
  className: PropTypes.string,
  /** DOM Id */
  id: PropTypes.string,
  /** Char set */
  charSet: PropTypes.string,
  /** Document title */
  title: PropTypes.string,
  /** Favicon url */
  icon: PropTypes.string,
  /** Global variables */
  globals: PropTypes.object,
  /** Version string */
  version: PropTypes.string,
  /** Key for version query */
  versionKey: PropTypes.string,
  /** View port settings */
  viewPort: PropTypes.object,
  /** Base url */
  base: PropTypes.string,
  /** Target of base url. '_blank', '_parent', '_self', '_top' or frame name */
  baseTarget: PropTypes.string,
  /** Met contents */
  metaContents: PropTypes.object,
  /** Met properties */
  metaProperties: PropTypes.object,
  /** Item props */
  itemProps: PropTypes.object,
  /** Theme color */
  color: PropTypes.string,
  /** Path of manifest.json */
  manifest: PropTypes.string
}

TheHead.defaultProps = {
  className: null,
  id: null,
  charSet: 'utf-8',
  title: null,
  icon: null,
  globals: {},
  version: 'unknown',
  versionKey: 'v',
  base: null,
  baseTarget: undefined,
  viewPort: {
    width: 'device-width',
    initialScale: '1.0'
  },
  metaContents: {},
  metaProperties: {},
  itemProps: {},
  color: null,
  manifest: null
}

TheHead.displayName = 'TheHead'

export default TheHead
