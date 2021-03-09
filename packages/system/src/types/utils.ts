import type { AnyObject } from '@flex-development/json/utils/types'
import type { ChangeEvent, FocusEvent, MouseEvent, UIEvent } from 'react'

/**
 * @file Utility Types
 * @module types/utils
 */

/**
 * Event handler types.
 */
export namespace EventHandlers {
  export type ClickEvent<E = HTMLElement> = MouseEvent<E> & { target: E }

  export namespace Change {
    export type Input = ChangeEvent<HTMLInputElement>
    export type Select = ChangeEvent<HTMLSelectElement>
    export type TextArea = ChangeEvent<HTMLTextAreaElement>
  }

  export namespace Click {
    export type Anchor = ClickEvent<HTMLAnchorElement>
    export type Button = ClickEvent<HTMLButtonElement>
    export type Input = ClickEvent<HTMLInputElement>
    export type SVG = ClickEvent<SVGSVGElement>
    export type Span = ClickEvent<HTMLSpanElement>
  }

  export namespace Focus {
    export type Anchor = FocusEvent<HTMLAnchorElement>
    export type Button = FocusEvent<HTMLButtonElement>
    export type Input = FocusEvent<HTMLInputElement>
    export type Select = FocusEvent<HTMLSelectElement>
    export type TextArea = FocusEvent<HTMLTextAreaElement>
  }

  export namespace UI {
    export type Anchor = UIEvent<HTMLAnchorElement>
    export type Div = UIEvent<HTMLDivElement>
    export type Button = UIEvent<HTMLButtonElement>
    export type Input = UIEvent<HTMLInputElement>
    export type Select = UIEvent<HTMLSelectElement>
    export type TextArea = UIEvent<HTMLTextAreaElement>
  }
}

/**
 * HTML elements.
 */
export interface HTMLElements extends SVGElements {
  a: HTMLAnchorElement
  abbr: HTMLElement
  address: HTMLElement
  area: HTMLAreaElement
  article: HTMLElement
  aside: HTMLElement
  audio: HTMLAudioElement
  b: HTMLElement
  base: HTMLBaseElement
  bdi: HTMLElement
  bdo: HTMLElement
  big: HTMLElement
  blockquote: HTMLElement
  body: HTMLBodyElement
  br: HTMLBRElement
  button: HTMLButtonElement
  canvas: HTMLCanvasElement
  caption: HTMLElement
  cite: HTMLElement
  code: HTMLElement
  col: HTMLTableColElement
  colgroup: HTMLTableColElement
  data: HTMLDataElement
  datalist: HTMLDataListElement
  dd: HTMLElement
  del: HTMLElement
  details: HTMLElement
  dfn: HTMLElement
  dialog: HTMLDialogElement
  div: HTMLDivElement
  dl: HTMLDListElement
  dt: HTMLElement
  em: HTMLElement
  embed: HTMLEmbedElement
  fieldset: HTMLFieldSetElement
  figcaption: HTMLElement
  figure: HTMLElement
  footer: HTMLElement
  form: HTMLFormElement
  h1: HTMLHeadingElement
  h2: HTMLHeadingElement
  h3: HTMLHeadingElement
  h4: HTMLHeadingElement
  h5: HTMLHeadingElement
  h6: HTMLHeadingElement
  head: HTMLHeadElement
  header: HTMLElement
  hgroup: HTMLElement
  hr: HTMLHRElement
  html: HTMLHtmlElement
  i: HTMLElement
  iframe: HTMLIFrameElement
  img: HTMLImageElement
  input: HTMLInputElement
  ins: HTMLModElement
  kbd: HTMLElement
  keygen: HTMLElement
  label: HTMLLabelElement
  legend: HTMLLegendElement
  li: HTMLLIElement
  link: HTMLLinkElement
  main: HTMLElement
  map: HTMLMapElement
  mark: HTMLElement
  menu: HTMLElement
  menuitem: HTMLElement
  meta: HTMLMetaElement
  meter: HTMLElement
  nav: HTMLElement
  noindex: HTMLElement
  noscript: HTMLElement
  object: HTMLObjectElement
  ol: HTMLOListElement
  optgroup: HTMLOptGroupElement
  option: HTMLOptionElement
  output: HTMLElement
  p: HTMLParagraphElement
  param: HTMLParamElement
  picture: HTMLElement
  pre: HTMLPreElement
  progress: HTMLProgressElement
  q: HTMLQuoteElement
  rp: HTMLElement
  rt: HTMLElement
  ruby: HTMLElement
  s: HTMLElement
  samp: HTMLElement
  slot: HTMLSlotElement
  script: HTMLScriptElement
  section: HTMLElement
  select: HTMLSelectElement
  small: HTMLElement
  source: HTMLSourceElement
  span: HTMLSpanElement
  strong: HTMLElement
  style: HTMLStyleElement
  sub: HTMLElement
  summary: HTMLElement
  sup: HTMLElement
  table: HTMLTableElement
  template: HTMLTemplateElement
  tbody: HTMLTableSectionElement
  td: HTMLTableDataCellElement
  textarea: HTMLTextAreaElement
  tfoot: HTMLTableSectionElement
  th: HTMLTableHeaderCellElement
  thead: HTMLTableSectionElement
  time: HTMLElement
  title: HTMLTitleElement
  tr: HTMLTableRowElement
  track: HTMLTrackElement
  u: HTMLElement
  ul: HTMLUListElement
  var: HTMLElement
  video: HTMLVideoElement
  wbr: HTMLElement
  webview: HTMLWebViewElement
}

/**
 * Type alias for `JSX.InstricElements`.
 */
export type IntrinsicElements = JSX.IntrinsicElements

/* eslint-disable prettier/prettier */

/**
 * Selects the props of a JSX element or returns the original props type.
 */
export type JSXIEPropsOr<
  T extends AnyObject | string
> = T extends keyof IntrinsicElements ? IntrinsicElements[T] : T

/**
 * Merge two objects.
 */
export type Merge<
  T1 extends AnyObject = AnyObject,
  T2 extends AnyObject = AnyObject
> = T1 & T2

/* eslint-enable prettier/prettier */

/**
 * HTML SVG elements.
 */
export interface SVGElements {
  animate: SVGElement
  animateMotion: SVGElement
  animateTransform: SVGElement
  circle: SVGCircleElement
  clipPath: SVGClipPathElement
  defs: SVGDefsElement
  desc: SVGDescElement
  ellipse: SVGEllipseElement
  feBlend: SVGFEBlendElement
  feColorMatrix: SVGFEColorMatrixElement
  feComponentTransfer: SVGFEComponentTransferElement
  feComposite: SVGFECompositeElement
  feConvolveMatrix: SVGFEConvolveMatrixElement
  feDiffuseLighting: SVGFEDiffuseLightingElement
  feDisplacementMap: SVGFEDisplacementMapElement
  feDistantLight: SVGFEDistantLightElement
  feDropShadow: SVGFEDropShadowElement
  feFlood: SVGFEFloodElement
  feFuncA: SVGFEFuncAElement
  feFuncB: SVGFEFuncBElement
  feFuncG: SVGFEFuncGElement
  feFuncR: SVGFEFuncRElement
  feGaussianBlur: SVGFEGaussianBlurElement
  feImage: SVGFEImageElement
  feMerge: SVGFEMergeElement
  feMergeNode: SVGFEMergeNodeElement
  feMorphology: SVGFEMorphologyElement
  feOffset: SVGFEOffsetElement
  fePointLight: SVGFEPointLightElement
  feSpecularLighting: SVGFESpecularLightingElement
  feSpotLight: SVGFESpotLightElement
  feTile: SVGFETileElement
  feTurbulence: SVGFETurbulenceElement
  filter: SVGFilterElement
  foreignObject: SVGForeignObjectElement
  g: SVGGElement
  image: SVGImageElement
  line: SVGLineElement
  linearGradient: SVGLinearGradientElement
  marker: SVGMarkerElement
  mask: SVGMaskElement
  metadata: SVGMetadataElement
  mpath: SVGElement
  path: SVGPathElement
  pattern: SVGPatternElement
  polygon: SVGPolygonElement
  polyline: SVGPolylineElement
  radialGradient: SVGRadialGradientElement
  rect: SVGRectElement
  stop: SVGStopElement
  svg: SVGSVGElement
  switch: SVGSwitchElement
  symbol: SVGSymbolElement
  text: SVGTextElement
  textPath: SVGTextPathElement
  tspan: SVGTSpanElement
  use: SVGUseElement
  view: SVGViewElement
}
