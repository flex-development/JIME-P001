import { MDXContent } from './MDXContent'
import type { MDXContentProps } from './MDXContent.props'

/**
 * @file Stories - MDXContent
 * @module lib/molecules/MDXContent/stories
 */

export default {
  component: MDXContent,
  parameters: {
    jest: ['MDXContent']
  },
  title: 'Library/Molecules/MDXContent'
}

export const MarkdownMDX: FCS<MDXContentProps> = args => (
  <MDXContent {...args} />
)

MarkdownMDX.args = {
  code:
    '/* @jsxRuntime classic */\n/* @jsx mdx */\n\n\nfunction objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }\nconst makeShortcode = name => { return function MDXDefaultShortcode(props) {\n      console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope")\n      return mdx( \'div\', props)\n    }; };\nconst Button = makeShortcode("Button");\nconst layoutProps = {\n  \n};\nconst MDXLayout = "wrapper"\nfunction MDXContent(ref) {\n  var components = ref.components;\n  var rest = objectWithoutProperties( ref, ["components"] );\n  var props = rest;\n\n  return mdx( MDXLayout, Object.assign({}, layoutProps, props, { components: components, mdxType: "MDXLayout" }),\n    mdx( \'p\', null, mdx( \'strong\', { parentName: "p" }, `Hello, World`) ),\n    mdx( Button, { mdxType: "Button" }, "MDXContent")\n    );\n}\n\n;\nMDXContent.isMDXComponent = true;'
}

export const PureMarkdown: FCS<MDXContentProps> = args => (
  <MDXContent {...args} />
)

PureMarkdown.args = {
  code:
    '/* @jsxRuntime classic */\n/* @jsx mdx */\n\n\n\nfunction objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }\nconst layoutProps = {\n  \n};\nconst MDXLayout = "wrapper"\nfunction MDXContent(ref) {\n  var components = ref.components;\n  var rest = objectWithoutProperties( ref, ["components"] );\n  var props = rest;\n\n  return mdx( MDXLayout, Object.assign({}, layoutProps, props, { components: components, mdxType: "MDXLayout" }),\n    mdx( \'h2\', null, `Hello, World` ),\n    mdx( \'p\', null, `Ramps fixie flexitarian locavore man bun shabby chic. Lyft asymmetrical forage mumblecore, kombucha copper mug snackwave selfies offal pork belly activated charcoal tacos. Pop-up wolf 3 wolf moon truffaut umami scenester mlkshk bespoke aesthetic whatever tousled drinking vinegar fanny pack iPhone.` )\n    );\n}\n\n;\nMDXContent.isMDXComponent = true;'
}

export const PureMDX: FCS<MDXContentProps> = args => <MDXContent {...args} />

PureMDX.args = {
  code:
    '/* @jsxRuntime classic */\n/* @jsx mdx */\n\n\nfunction objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }\nconst makeShortcode = name => { return function MDXDefaultShortcode(props) {\n      console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope")\n      return mdx( \'div\', props)\n    }; };\nconst Section = makeShortcode("Section");\nconst Heading = makeShortcode("Heading");\nconst Paragraph = makeShortcode("Paragraph");\nconst layoutProps = {\n  \n};\nconst MDXLayout = "wrapper"\nfunction MDXContent(ref) {\n  var components = ref.components;\n  var rest = objectWithoutProperties( ref, ["components"] );\n  var props = rest;\n\n  return mdx( MDXLayout, Object.assign({}, layoutProps, props, { components: components, mdxType: "MDXLayout" }),\n    mdx( Section, { mdxType: "Section" }, mdx( Heading, { $size: 2, mdxType: "Heading" }, "MDXContent"), mdx( Paragraph, { $mb: 72, mdxType: "Paragraph" }, "Ramps fixie flexitarian locavore man bun shabby chic. Lyft asymmetrical forage mumblecore, kombucha copper mug snackwave selfies offal pork belly activated charcoal tacos. Pop-up wolf 3 wolf moon truffaut umami scenester mlkshk bespoke aesthetic whatever tousled drinking vinegar fanny pack iPhone."))\n    );\n}\n\n;\nMDXContent.isMDXComponent = true;'
}
