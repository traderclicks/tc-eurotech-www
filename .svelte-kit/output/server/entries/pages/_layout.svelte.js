import { Z as fallback, _ as escape_html, $ as bind_props, a0 as store_get, a1 as ensure_array_like, a2 as attr, a3 as attr_class, a4 as stringify, a5 as spread_props, a6 as slot, a7 as unsubscribe_stores, a8 as head } from "../../chunks/index2.js";
import { m as modals } from "../../chunks/modal.js";
/* empty css                                                     */
import { h as html } from "../../chunks/Button.svelte_svelte_type_style_lang.js";
import "clsx";
import { p as page } from "../../chunks/stores.js";
function ContactForm($$renderer, $$props) {
  let title = fallback($$props["title"], "Contact Form");
  $$renderer.push(`<div class="contact-form svelte-fq8g2m">`);
  if (title) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="form-header svelte-fq8g2m"><h3 class="form-title svelte-fq8g2m">${escape_html(title)}</h3></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, { title });
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    function getVideoEmbedUrl(url) {
      if (url.includes("youtube.com/watch")) {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("vimeo.com/")) {
        const videoId = url.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}`;
      }
      return url;
    }
    if (typeof document !== "undefined") {
      document.body.style.overflow = store_get($$store_subs ??= {}, "$modals", modals).length > 0 ? "hidden" : "";
    }
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$modals", modals));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let modal = each_array[i];
      $$renderer2.push(`<div class="modal-backdrop svelte-ta60gp" role="dialog" aria-modal="true"${attr("aria-labelledby", `modal-title-${stringify(modal.id)}`)} tabindex="-1"><div${attr_class("modal-container svelte-ta60gp", void 0, {
        "image-container": modal.type === "image",
        "insurance-container": modal.type === "insurance"
      })}>`);
      if (modal.type !== "image") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="modal-header svelte-ta60gp">`);
        if (modal.title) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<h2${attr("id", `modal-title-${stringify(modal.id)}`)} class="modal-title svelte-ta60gp">${escape_html(modal.title)}</h2>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <button class="modal-close svelte-ta60gp" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="modal-content svelte-ta60gp">`);
      if (modal.type === "form") {
        $$renderer2.push("<!--[-->");
        ContactForm($$renderer2, spread_props([modal.props]));
      } else {
        $$renderer2.push("<!--[!-->");
        if (modal.type === "image") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="image-modal svelte-ta60gp"><button class="image-close svelte-ta60gp" aria-label="Close image"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> <img${attr("src", modal.content.src)}${attr("alt", modal.content.alt || "")} class="svelte-ta60gp"/> `);
          if (modal.content.attribution) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="image-attribution svelte-ta60gp">Photo by <a${attr("href", modal.content.attribution.photographerUrl)} target="_blank" rel="noopener noreferrer" class="svelte-ta60gp">${escape_html(modal.content.attribution.photographer)}</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" class="svelte-ta60gp">Unsplash</a></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (modal.type === "video") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="video-modal svelte-ta60gp"><iframe${attr("src", getVideoEmbedUrl(modal.content.url))}${attr("title", modal.title || "Video")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="svelte-ta60gp"></iframe></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (modal.type === "confirm") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="confirm-modal svelte-ta60gp"><p class="svelte-ta60gp">${escape_html(modal.content)}</p> <div class="confirm-buttons svelte-ta60gp"><button class="btn btn-secondary svelte-ta60gp">Cancel</button> <button class="btn btn-primary svelte-ta60gp">Confirm</button></div></div>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (modal.type === "alert") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<div class="alert-modal svelte-ta60gp"><p class="svelte-ta60gp">${escape_html(modal.content)}</p> <button class="btn btn-primary svelte-ta60gp">OK</button></div>`);
              } else {
                $$renderer2.push("<!--[!-->");
                if (modal.type === "insurance") {
                  $$renderer2.push("<!--[-->");
                  $$renderer2.push(`<div class="insurance-modal svelte-ta60gp"><div class="insurance-list svelte-ta60gp"><div class="insurance-item svelte-ta60gp"><div class="insurance-name svelte-ta60gp">AA Insurance</div> <a href="tel:0800222022" class="insurance-phone svelte-ta60gp">0800 222 022</a></div> <div class="insurance-item svelte-ta60gp"><div class="insurance-name svelte-ta60gp">State Insurance</div> <a href="tel:0800808808" class="insurance-phone svelte-ta60gp">0800 808 808</a></div> <div class="insurance-item svelte-ta60gp"><div class="insurance-name svelte-ta60gp">AMI Insurance</div> <a href="tel:0800100200" class="insurance-phone svelte-ta60gp">0800 100 200</a></div> <div class="insurance-item svelte-ta60gp"><div class="insurance-name svelte-ta60gp">Tower Insurance</div> <a href="tel:0800808808" class="insurance-phone svelte-ta60gp">0800 808 808</a></div> <div class="insurance-item svelte-ta60gp"><div class="insurance-name svelte-ta60gp">Vero Insurance</div> <a href="tel:0800800100" class="insurance-phone svelte-ta60gp">0800 800 100</a></div> <div class="insurance-item svelte-ta60gp"><div class="insurance-name svelte-ta60gp">NZI Insurance</div> <a href="tel:0800100080" class="insurance-phone svelte-ta60gp">0800 100 080</a></div> <div class="insurance-item svelte-ta60gp"><div class="insurance-name svelte-ta60gp">IAG (NZI/State/AMI/Lumley)</div> <a href="tel:0800104104" class="insurance-phone svelte-ta60gp">0800 104 104</a></div></div></div>`);
                } else {
                  $$renderer2.push("<!--[!-->");
                  if (modal.type === "custom") {
                    $$renderer2.push("<!--[-->");
                    $$renderer2.push(`<!--[-->`);
                    slot($$renderer2, $$props, "custom", { modal }, null);
                    $$renderer2.push(`<!--]-->`);
                  } else {
                    $$renderer2.push("<!--[!-->");
                  }
                  $$renderer2.push(`<!--]-->`);
                }
                $$renderer2.push(`<!--]-->`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function NavigationMenu($$renderer, $$props) {
  let isOpen = fallback($$props["isOpen"], false);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "#contact" },
    { label: "Jaguar Repair", href: "/jaguar" },
    { label: "Land Rover Repair", href: "/land-rover" },
    { label: "Range Rover Repair", href: "/range-rover" },
    { label: "BMW Repair", href: "/bmw" },
    { label: "Mini Repair", href: "/mini" },
    { label: "Insurance Claims", href: "/insurance" }
  ];
  if (isOpen) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<button class="overlay svelte-o1co8r" aria-label="Close navigation menu" type="button"></button> <nav class="navigation-menu svelte-o1co8r"><button class="close-btn svelte-o1co8r" aria-label="Close menu"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="svelte-o1co8r"><line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="2"></line><line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="2"></line></svg></button> <ul class="nav-list svelte-o1co8r"><!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer.push(`<li class="nav-item svelte-o1co8r"><a${attr("href", item.href)} class="nav-link svelte-o1co8r">${escape_html(item.label)}</a></li>`);
    }
    $$renderer.push(`<!--]--></ul></nav>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { isOpen });
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isScrolled = fallback($$props["isScrolled"], false);
    let hasHero = fallback($$props["hasHero"], false);
    let isMenuOpen = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<header${attr_class("header svelte-1elxaub", void 0, { "scrolled": isScrolled, "no-hero": !hasHero })}><button class="menu-toggle svelte-1elxaub" aria-label="Toggle menu"${attr("aria-expanded", isMenuOpen)}><svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="svelte-1elxaub"><line x1="6" y1="14" x2="42" y2="14" stroke="currentColor" stroke-width="3.5"></line><line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" stroke-width="3.5"></line><line x1="6" y1="34" x2="42" y2="34" stroke="currentColor" stroke-width="3.5"></line></svg></button> <nav class="nav svelte-1elxaub"><div class="container nav-container svelte-1elxaub"><a href="/" class="logo svelte-1elxaub"><img src="/eurotech-main-logo.png" alt="Eurotech Auto Repair Centre" class="svelte-1elxaub"/></a> <div class="nav-right svelte-1elxaub"><button class="header-link location-btn svelte-1elxaub">Mount Wellington</button> <span class="separator svelte-1elxaub">•</span> <a href="tel:095731093" class="header-link phone-link svelte-1elxaub">(09) 573 1093</a></div></div></nav></header> `);
      NavigationMenu($$renderer3, {
        get isOpen() {
          return isMenuOpen;
        },
        set isOpen($$value) {
          isMenuOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { isScrolled, hasHero });
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="footer svelte-jz8lnl"><div class="container"><div class="footer-grid svelte-jz8lnl"><div class="footer-column svelte-jz8lnl"><div class="services-eyebrow svelte-jz8lnl">EUROTECH AUTO REPAIR</div> <ul class="footer-links services-grid-links svelte-jz8lnl"><li class="svelte-jz8lnl"><a href="/jaguar" class="service-link svelte-jz8lnl"><div class="logo-col svelte-jz8lnl"><img src="/jaguar-logo-white.svg" alt="" class="service-logo svelte-jz8lnl"/></div> <span class="text-col svelte-jz8lnl">Jaguar Repair</span></a></li> <li class="svelte-jz8lnl"><a href="/land-rover" class="service-link svelte-jz8lnl"><div class="logo-col svelte-jz8lnl"><img src="/landrover-logo-white.svg" alt="" class="service-logo service-logo-landrover svelte-jz8lnl"/></div> <span class="text-col svelte-jz8lnl">Land Rover Repair</span></a></li> <li class="svelte-jz8lnl"><a href="/range-rover" class="service-link svelte-jz8lnl"><div class="logo-col svelte-jz8lnl"><img src="/range-rover-logo-white.svg" alt="" class="service-logo service-logo-landrover svelte-jz8lnl"/></div> <span class="text-col svelte-jz8lnl">Range Rover Repair</span></a></li> <li class="svelte-jz8lnl"><a href="/bmw" class="service-link svelte-jz8lnl"><div class="logo-col svelte-jz8lnl"><img src="/bmw-logo-white.svg" alt="" class="service-logo service-logo-bmw svelte-jz8lnl"/></div> <span class="text-col svelte-jz8lnl">BMW Repair</span></a></li> <li class="svelte-jz8lnl"><a href="/mini" class="service-link svelte-jz8lnl"><div class="logo-col svelte-jz8lnl"><img src="/mini-white.svg" alt="" class="service-logo svelte-jz8lnl"/></div> <span class="text-col svelte-jz8lnl">Mini Repair</span></a></li> <li class="svelte-jz8lnl"><a href="/insurance" class="service-link svelte-jz8lnl"><div class="logo-col svelte-jz8lnl"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='M9 12l2 2 4-4'/%3E%3C/svg%3E" alt="" class="service-logo service-logo-insurance svelte-jz8lnl"/></div> <span class="text-col svelte-jz8lnl">Insurance Claims</span></a></li></ul> <p class="footer-description svelte-jz8lnl">New Zealand's only factory-authorized Jaguar/Land Rover structural repairer.
          European vehicle specialists with 20+ years experience.</p></div> <div class="footer-spacer svelte-jz8lnl"></div> <div class="footer-column svelte-jz8lnl"><h3 class="footer-heading svelte-jz8lnl">Information</h3> <ul class="footer-links svelte-jz8lnl"><li class="svelte-jz8lnl"><a href="#about" class="svelte-jz8lnl">About Eurotech</a></li> <li class="svelte-jz8lnl"><a href="#certifications" class="svelte-jz8lnl">Certifications</a></li> <li class="svelte-jz8lnl"><a href="#gallery" class="svelte-jz8lnl">Gallery</a></li> <li class="svelte-jz8lnl"><a href="/privacy" class="svelte-jz8lnl">Privacy Policy</a></li> <li class="svelte-jz8lnl"><a href="/terms" class="svelte-jz8lnl">Terms &amp; Conditions</a></li></ul></div> <div class="footer-column svelte-jz8lnl"><h3 class="footer-heading svelte-jz8lnl">Contact Us</h3> <div class="contact-info svelte-jz8lnl"><div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg> <a href="tel:095731093" class="svelte-jz8lnl">(09) 573 1093</a></div> <div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg> <a href="mailto:info@eurotech.co.nz" class="svelte-jz8lnl">info@eurotech.co.nz</a></div> <div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg> <span>Mount Wellington, Auckland</span></div> <div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg> <span>Mon-Fri: 8:00 AM - 5:00 PM</span></div></div> <button class="footer-cta svelte-jz8lnl">Get a Quote</button> <div class="social-links svelte-jz8lnl"><a href="https://www.facebook.com/eurotechauto" aria-label="Facebook" class="social-icon-link svelte-jz8lnl"><img src="/icons/facebook.svg" alt="Facebook" width="35" height="35"/></a> <a href="https://www.instagram.com/eurotechauto" aria-label="Instagram" class="social-icon-link svelte-jz8lnl"><img src="/icons/instagram.svg" alt="Instagram" width="35" height="35"/></a> <a href="https://g.page/eurotech-auto-repair" aria-label="Google Business" class="social-icon-link svelte-jz8lnl"><img src="/icons/google.svg" alt="Google" width="35" height="35"/></a></div></div></div> <div class="footer-bottom-links svelte-jz8lnl"><div class="bottom-left svelte-jz8lnl"><p class="copyright svelte-jz8lnl">© ${escape_html(currentYear)} Eurotech Auto Repair Centre. All rights reserved.</p> <span class="separator svelte-jz8lnl">|</span> <a href="/privacy" class="svelte-jz8lnl">Privacy</a> <span class="separator svelte-jz8lnl">|</span> <a href="/terms" class="svelte-jz8lnl">Terms</a> <span class="separator svelte-jz8lnl">|</span> <button class="link-button svelte-jz8lnl">Image Credits</button></div> <div class="certifications-logos svelte-jz8lnl"><span>I-Car Gold Certified</span> <span class="separator svelte-jz8lnl">|</span> <span>Member of:</span> <img src="/eurotech-logo.png" alt="Eurotech" width="60" height="30"/> <img src="/mta-logo.png" alt="MTA Member" width="60" height="30"/></div></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let hasHero, isLoginPage;
    let scrollY = 0;
    hasHero = store_get($$store_subs ??= {}, "$page", page).url.pathname === "/";
    isLoginPage = store_get($$store_subs ??= {}, "$page", page).url.pathname === "/login";
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<meta name="viewport" content="width=device-width, initial-scale=1"/> <link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> ${html(`<script type="application/ld+json">
  ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Page One",
        "alternateName": "Page One Solutions",
        "url": "https://example.com",
        "logo": "https://example.com/logo.png",
        "description": "Premium solutions and services to help you achieve success",
        "foundingDate": "2020",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main Street",
          "addressLocality": "City",
          "addressRegion": "State",
          "postalCode": "12345",
          "addressCountry": "US"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-0100",
          "contactType": "customer service",
          "email": "contact@example.com",
          "areaServed": "US",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.facebook.com/pageone",
          "https://twitter.com/pageone",
          "https://www.linkedin.com/company/pageone",
          "https://www.instagram.com/pageone"
        ]
      })}
  <\/script>`)} ${html(`<script type="application/ld+json">
  ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Page One",
        "url": "https://example.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://example.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      })}
  <\/script>`)}`);
    });
    $$renderer2.push(`<div class="app svelte-12qhfyh">`);
    if (!isLoginPage) {
      $$renderer2.push("<!--[-->");
      Header($$renderer2, { isScrolled: scrollY > 50, hasHero });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <main class="main svelte-12qhfyh"><!--[-->`);
    slot($$renderer2, $$props, "default", {}, null);
    $$renderer2.push(`<!--]--></main> `);
    if (!isLoginPage) {
      $$renderer2.push("<!--[-->");
      Footer($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Modal($$renderer2, {});
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
