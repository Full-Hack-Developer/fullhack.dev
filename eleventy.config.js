import { minify } from "html-minifier-terser";

/**
 * @see https://www.11ty.dev/docs/config/
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  // Copy the contents of the `public` folder to the output folder
  eleventyConfig.addPassthroughCopy({ "./public/": "/" });

  // Add a transform to minify HTML and CSS output
  // https://www.11ty.dev/docs/transforms/#minify-html-output
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      });
    }

    // If not an HTML output, return content as-is
    return content;
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
    },
  };
}
