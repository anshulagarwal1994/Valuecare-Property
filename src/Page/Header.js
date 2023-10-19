import React, { useState } from "react";
import { useHistory } from "react-router";

import { useLocation } from "react-router-dom";

function HeaderPage() {
    const logo = "../images/logo.svg"
  return (
    // <div className="elementor-widget-wrap elementor-element-populated">
    //   <div
    //     className="elementor-element elementor-element-58da777 elementor-view-default elementor-widget elementor-widget-icon animated swing"
    //     data-id="58da777"
    //     data-element_type="widget"
    //     data-settings='{"_animation":"swing"}'
    //     data-widget_type="icon.default"
    //   >
    //     <div className="elementor-widget-container">
    //       <div className="elementor-icon-wrapper">
    //         <div className="elementor-icon">
    //           <i aria-hidden="true" className="far fa-check-circle"></i>{" "}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     className="elementor-element elementor-element-9dbc697 elementor-widget elementor-widget-heading animated fadeInDown"
    //     data-id="9dbc697"
    //     data-element_type="widget"
    //     data-settings='{"_animation":"fadeInDown"}'
    //     data-widget_type="heading.default"
    //   >
    //     <div className="elementor-widget-container">
    //       <style></style>
    //       <h2 className="elementor-heading-title elementor-size-default">
    //         Thank you for contacting us. Our representative will be in touch
    //         with you soon.
    //       </h2>{" "}
    //     </div>
    //   </div>
    // </div>

    <header className="header" id="header">
    <div className="top-bar">
      <div className="container">
          <div className="navbar-left">
              <span className="free-call">Free call <b>1800 VALUE U</b> (1800 825 838)</span>
          </div>
          <div className="topbar-right">
          <ul>
              <li className="topbar-blogs">
              <a href="/value-cares-blog/"> Blogs </a>
              </li>
              <li className="topbar-news">
              <a href="/news-and-media/"> News </a>
              </li>
              <li className="topbar-text-larger">
              <a href="javascript:void(0)" className="js-font"> Text Larger </a>
              </li>

              <li className="referral">
              <a href="/referral"> Referral </a>
              </li>
              <li className="topbar-login">
              <a target="_blank" href="https://services.valuecare.org.au/"
                  >Login / Register
              </a>
              </li>
          </ul>
          </div>
      </div>   
    </div>
    <nav className="navbar container">
      <div className="container">
          <section className="navbar-left">
          <a href="#" className="brand">
              <img src="https://valuecare.org.au/wp-content/uploads/2022/04/logo.svg"/>
          </a>
          </section>
          <section className="navbar-center">
          <span className="overlay"></span>
          <div className="menu" id="menu">
              <div className="menu-header">
              <span className="menu-arrow"><i className="bx bx-chevron-left"></i></span>
              <span className="menu-title"></span>
              </div>
              <ul className="menu-inner">
              <li className="menu-item menu-dropdown">
                  <span className="menu-link"><a href="https://valuecare.org.au/disability-services/">Disability Services</a><i className="bx bx-chevron-right"></i
                  ></span>
                  <div className="submenu megamenu megamenu-column-4">
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/early-childhood-services/" className="submenu-link">Early Childhood Services</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/foster-care-services/" className="submenu-link">Foster Care Services</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/therapeutic-services-for-children/" className="submenu-link">Therapeutic Services for Children</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/daily-living-life-skills/" className="submenu-link">Daily Living & Life Skills</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/daily-personal-activities/" className="submenu-link">Daily Personal Activities</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/innovative-community-participation/" className="submenu-link">Innovative Community Participation</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/home-modification/" className="submenu-link">Home Modification</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/assist-access-maintain-employment/" className="submenu-link">Assist Access/Maintain Employment</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/community-nursing/" className="submenu-link">Community Nursing</a>
                      </li>
                      </ul>
                  </div>
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/specialized-support-coordination/" className="submenu-link">Specialized Support Coordinator</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/behaviour-support/" className="submenu-link">Behaviour Support</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/participation-in-community/" className="submenu-link">Participation in Community</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/daily-tasks-shared-living/" className="submenu-link">Daily Tasks & Shared Living</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/assist-life-stage-transition/" className="submenu-link">Assist Life Stage Transition</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/household-tasks/" className="submenu-link">Household Tasks</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/assist-travel-transport/" className="submenu-link">Assist Travel/Transport</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/therapeutic-supports/" className="submenu-link">Therapeutic Supports</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/group-centre-based-activities/" className="submenu-link">Group & Centre Based Activities</a>
                      </li>
                      </ul>
                  </div>
                  </div>
              </li>
              <li className="menu-item menu-dropdown">
                  <span className="menu-link"><a href="https://valuecare.org.au/accommodation/">Accommodation</a><i className="bx bx-chevron-right"></i></span>
                  <div className="submenu megamenu megamenu-column-4">
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/search-or-book-available-sites/" className="submenu-link">Search or Book available sites</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/accommodation-tenancy-assistance/" className="submenu-link">Accommodation/Tenancy Assistance</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/respite-centres/" className="submenu-link">Respite Care</a>
                      </li>
                      </ul>
                  </div>
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/supported-independent-living/" className="submenu-link">Supported Independent Living</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/specialist-disability-accommodation/" className="submenu-link">Specialist Disability Accommodation</a>
                      </li>
                      </ul>
                  </div>
                  </div>
              </li>
              <li className="menu-item menu-dropdown">
                  <span className="menu-link"><a href="https://valuecare.org.au/ndis/">NDIS</a><i className="bx bx-chevron-right"></i></span>
                  <div className="submenu megamenu megamenu-column-4">
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/ndis-quick-overview/" className="submenu-link">NDIS: Quick Overview</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/help-to-apply-and-plan/" className="submenu-link">Help to Apply and Plan</a>
                      </li>
                      </ul>
                  </div>
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/ndis-faqs/" className="submenu-link">NDIS FAQs</a>
                      </li>
                      </ul>
                  </div>
                  </div>
              </li>
              <li className="menu-item menu-dropdown">
                  <span className="menu-link"><a href="https://valuecare.org.au/about-us/">About Us</a><i className="bx bx-chevron-right"></i></span>
                  <div className="submenu megamenu megamenu-column-4">
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/who-is-value-care/" className="submenu-link">Who is Value Care?</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/policies-and-publications/" className="submenu-link">Policies and Publications</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/news-and-media/" className="submenu-link">News and Media</a>
                      </li>
                      </ul>
                  </div>
                  <div className="submenu-inner">
                      <ul className="submenu-list">
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/executive-leadership-team/" className="submenu-link">Executive Leadership Team</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/value-cares-blog/" className="submenu-link">Value Care’s Blog</a>
                      </li>
                      <li className="submenu-item">
                          <a href="https://valuecare.org.au/our-locations/" className="submenu-link">Our Locations</a>
                      </li>
                      </ul>
                  </div>
                  </div>
              </li>
              <li className="menu-item">
                  <a href="https://valuecare.org.au/careers/" className="menu-link">Careers</a>
              </li>
              <li className="menu-item">
                  <a href="https://valuecare.org.au/contact-us/" className="menu-link">Contact Us</a>
              </li>
              </ul>
          </div>
          </section>
      </div>   
    </nav>
  </header>
  );
};
export default HeaderPage;
