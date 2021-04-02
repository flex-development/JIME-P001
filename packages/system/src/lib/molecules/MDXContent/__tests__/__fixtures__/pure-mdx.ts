/**
 * @file Test Fixture - Markdown MDX Response from MDJSX API
 * @module lib/molecules/MDXContent/tests/fixtures/code-pure-markdown
 * @see https://github.com/flex-development/mdjsx
 */

export default '/* @jsxRuntime classic */\n/* @jsx mdx */\n\n\nfunction objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }\nconst makeShortcode = name => { return function MDXDefaultShortcode(props) {\n      console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope")\n      return mdx( \'div\', props)\n    }; };\nconst Section = makeShortcode("Section");\nconst Heading = makeShortcode("Heading");\nconst Paragraph = makeShortcode("Paragraph");\nconst layoutProps = {\n  \n};\nconst MDXLayout = "wrapper"\nfunction MDXContent(ref) {\n  var components = ref.components;\n  var rest = objectWithoutProperties( ref, ["components"] );\n  var props = rest;\n\n  return mdx( MDXLayout, Object.assign({}, layoutProps, props, { components: components, mdxType: "MDXLayout" }),\n    mdx( Section, { mdxType: "Section" }, mdx( Heading, { $size: 2, mdxType: "Heading" }, "MDXContent"), mdx( Paragraph, { $mb: 72, mdxType: "Paragraph" }, "Hello, World. Ramps fixie flexitarian locavore man bun shabby chic. Lyft asymmetrical forage mumblecore, kombucha copper mug snackwave selfies offal pork belly activated charcoal tacos. Pop-up wolf 3 wolf moon truffaut umami scenester mlkshk bespoke aesthetic whatever tousled drinking vinegar fanny pack iPhone."))\n    );\n}\n\n;\nMDXContent.isMDXComponent = true;'
