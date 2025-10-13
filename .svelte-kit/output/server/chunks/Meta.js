import { Z as fallback, a0 as store_get, a8 as head, a7 as unsubscribe_stores, $ as bind_props, _ as escape_html, a2 as attr, a4 as stringify, a1 as ensure_array_like } from "./index2.js";
import { p as page } from "./stores.js";
function Meta($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentUrl, canonicalUrl;
    let title = fallback($$props["title"], "Page One - Premium Solutions");
    let description = fallback($$props["description"], "Discover our comprehensive range of solutions designed to help you achieve success.");
    let keywords = fallback($$props["keywords"], "");
    let canonical = fallback($$props["canonical"], void 0);
    let ogImage = fallback($$props["ogImage"], "/og-image.png");
    let ogType = fallback($$props["ogType"], "website");
    let twitterCard = fallback($$props["twitterCard"], "summary_large_image");
    let noindex = fallback($$props["noindex"], false);
    let nofollow = fallback($$props["nofollow"], false);
    let author = fallback($$props["author"], "");
    let publishedTime = fallback($$props["publishedTime"], "");
    let modifiedTime = fallback($$props["modifiedTime"], "");
    let section = fallback($$props["section"], "");
    let tags = fallback($$props["tags"], () => [], true);
    let locale = fallback($$props["locale"], "en_US");
    let siteName = fallback($$props["siteName"], "Page One");
    let twitterSite = fallback($$props["twitterSite"], "");
    let twitterCreator = fallback($$props["twitterCreator"], "");
    const fullTitle = title === "Page One - Premium Solutions" ? title : `${title} | Page One`;
    currentUrl = store_get($$store_subs ??= {}, "$page", page).url.href;
    canonicalUrl = canonical || currentUrl;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(fullTitle)}</title>`);
      });
      $$renderer3.push(`<meta name="title"${attr("content", fullTitle)}/> <meta name="description"${attr("content", description)}/> `);
      if (keywords) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="keywords"${attr("content", keywords)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <link rel="canonical"${attr("href", canonicalUrl)}/> `);
      if (noindex || nofollow) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="robots"${attr("content", `${stringify(noindex ? "noindex" : "index")},${stringify(nofollow ? "nofollow" : "follow")}`)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>`);
      }
      $$renderer3.push(`<!--]--> <meta property="og:type"${attr("content", ogType)}/> <meta property="og:url"${attr("content", canonicalUrl)}/> <meta property="og:title"${attr("content", fullTitle)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:image"${attr("content", ogImage.startsWith("http") ? ogImage : `${store_get($$store_subs ??= {}, "$page", page).url.origin}${ogImage}`)}/> <meta property="og:image:alt"${attr("content", title)}/> <meta property="og:site_name"${attr("content", siteName)}/> <meta property="og:locale"${attr("content", locale)}/> `);
      if (ogType === "article") {
        $$renderer3.push("<!--[-->");
        if (author) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<meta property="article:author"${attr("content", author)}/>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (publishedTime) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<meta property="article:published_time"${attr("content", publishedTime)}/>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (modifiedTime) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<meta property="article:modified_time"${attr("content", modifiedTime)}/>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (section) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<meta property="article:section"${attr("content", section)}/>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <!--[-->`);
        const each_array = ensure_array_like(tags);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let tag = each_array[$$index];
          $$renderer3.push(`<meta property="article:tag"${attr("content", tag)}/>`);
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <meta name="twitter:card"${attr("content", twitterCard)}/> <meta name="twitter:url"${attr("content", canonicalUrl)}/> <meta name="twitter:title"${attr("content", fullTitle)}/> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", ogImage.startsWith("http") ? ogImage : `${store_get($$store_subs ??= {}, "$page", page).url.origin}${ogImage}`)}/> `);
      if (twitterSite) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="twitter:site"${attr("content", twitterSite)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (twitterCreator) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="twitter:creator"${attr("content", twitterCreator)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <meta name="author"${attr("content", author || siteName)}/> <meta name="generator" content="SvelteKit"/> <link rel="icon" type="image/svg+xml" href="/favicon.svg"/> <link rel="alternate icon" href="/favicon.ico"/> <link rel="apple-touch-icon" href="/apple-touch-icon.png"/> <meta name="theme-color" content="#3B82F6"/>`);
    });
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      title,
      description,
      keywords,
      canonical,
      ogImage,
      ogType,
      twitterCard,
      noindex,
      nofollow,
      author,
      publishedTime,
      modifiedTime,
      section,
      tags,
      locale,
      siteName,
      twitterSite,
      twitterCreator
    });
  });
}
export {
  Meta as M
};
