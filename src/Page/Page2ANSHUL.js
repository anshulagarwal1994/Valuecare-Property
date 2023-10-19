import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBase, imageBase, iconBase } from "../utils/constant";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// const container = document.getElementById('swiper-container');
// const mySwiper = new Swiper(container, {
//   // Swiper configuration options here
// });

function Page2(props) {
  let history = useHistory();
  const search = useLocation().search;

  const id = new URLSearchParams(search).get("id");
  useEffect(() => {
    console.log("props..", id);
    getpropertylist();
  });

  const getpropertylist = () => {
    var pData = {
      id: id,
    };

    axios
      .post(apiBase + "/Property/getPropertylistWebsite", pData)
      .then((res) => {
        debugger;
        if (res.data.success) {
          console.log(res);
          document.getElementById("propertyListingFilter").style.display =
            "none";
          // localStorage.setItem("PropertyList", JSON.stringify(res.data));
          // document.getElementById("SetValue").innerHTML = "GET Data"

          var htmlLoop = "";
          console.log(res.data.data[0]);
          // console.log(res.data[0][0]);

          // for (let i = 0; i < res.data.data[0].length; i++) {
          //   console.log("IN Data123");

          //   var imageHtml = "<Swiper spaceBetween={50} slidesPerView={3}>";
          //   var imagesdata = res.data.data[0][i].URL;

          //   if (imagesdata.includes(",")) {
          //     var splitimage = imagesdata.split(",");

          //     for (let j = 0; j < splitimage.length; j++) {
          //       var imageurl = imageBase + splitimage[j];
          //       // imageHtml += '<img src="'+ imageurl +'" alt="Property Image" />'
          //       imageHtml +=
          //         '<SwiperSlide><div class="swiper-slide"> <div class="pr-img-box"> <img src="' +
          //         imageurl +
          //         '" alt="Property Image" /> </div> </div></SwiperSlide>';
          //     }
          //     imageHtml += "</Swiper>"
          //   } else {
          //     var imageurl = imageBase + imagesdata;
          //     imageHtml =
          //       '<div class="swiper-slide"> <div class="pr-img-box"> <img src="' +
          //       imageurl +
          //       '" alt="Property Image" /> </div> </div>';
          //     // imageHtml = '<img src="'+ imageurl +'" alt="Property Image" />'
          //   }
          //   var FeatureHtml = "";

          //   var feature = res.data.data[0][i].PropertyFeature;

          //   if (feature.includes(",")) {
          //     var splitFeature = feature.split(",");
          //     for (let j = 0; j < splitFeature.length; j++) {
          //       FeatureHtml +=
          //         '<li> <img src="' +
          //         iconBase +
          //         '/wp-content/themes/valueCare/images/accessible.svg" alt="Accessible"> <span>' +
          //         splitFeature[j] +
          //         "</span> </li>";
          //     }
          //   } else {
          //     FeatureHtml =
          //       '<li> <img src="' +
          //       iconBase +
          //       '/wp-content/themes/valueCare/images/accessible.svg" alt="Accessible"> <span>' +
          //       feature +
          //       "</span> </li>";
          //   }
          //   var balcony = "";

          //   if (res.data.data[0][i].BalconyCount != null) {
          //     balcony =
          //       '<p> <img src="' +
          //       iconBase +
          //       '/wp-content/themes/valueCare/images/balcony.svg" alt="Bedrooms"> <span>' +
          //       res.data.data[0][i].BalconyCount +
          //       " Balcony</span> </p>";
          //   }

          //   var hrefUrl =
          //     "/Propertydetails/?id=" + res.data.data[0][i].PropertyID;

          //   htmlLoop +=
          //     '<div class="pl-list-box"> <div class="pr-image"> <div class="pr-slider"> <div class="swiper prSwiper"> <div class="swiper-wrapper"> ' +
          //     imageHtml +
          //     ' </div> <div class="swiper-button-next"></div> <div class="swiper-button-prev"></div> </div></div> </div> <div class="pr-content"> <a href="' +
          //     hrefUrl +
          //     '"><h3>' +
          //     res.data.data[0][i].AddrLine1 +
          //     ", " +
          //     res.data.data[0][i].City +
          //     ", " +
          //     res.data.data[0][i].PostalCode +
          //     ', Australia</h3></a> <p class="pr-short"> ' +
          //     res.data.data[0][i].BriefDescription +
          //     '</p> <div class="pr-rooms"> <p> <img src="' +
          //     iconBase +
          //     '/wp-content/themes/valueCare/images/bedrooms.svg" alt="Bedrooms"> <span>' +
          //     res.data.data[0][i].TotalBedroomCount +
          //     ' Bedrooms</span> </p> <p> <img src="' +
          //     iconBase +
          //     '/wp-content/themes/valueCare/images/bathrooms.svg" alt="Bathrooms"> <span>' +
          //     res.data.data[0][i].BathroomCount +
          //     " Bathrooms</span> </p> " +
          //     balcony +
          //     ' </div> <div class="pr-sda"> <h5>' +
          //     res.data.data[0][i].PropertyType +
          //     "</h5> <h5>Feature</h5> <ul> " +
          //     FeatureHtml +
          //     '  </ul> </div> <div class="pr-footer"> <div class="pr-lv-option"> <p> <img src="' +
          //     iconBase +
          //     '/wp-content/themes/valueCare/images/living-options.svg" alt="Multiple Leaving Options" /> <span>Multiple living options are available</span> </p> </div> <div class="pr-book"> <a href="' +
          //     hrefUrl +
          //     '">Book an Inspection</a> </div> </div> </div> </div>';
          // }
          for (let i = 0; i < res.data.data[0].length; i++) {
            console.log("IN Data123");

            var imageHtml = "<Swiper id = 'swiper-container' spaceBetween={50} slidesPerView={3}>";
            var imagesdata = res.data.data[0][i].URL;

            if (imagesdata.includes(",")) {

              // Assuming you have inserted some HTML content into an element with id "swiper-container"

              var splitimage = imagesdata.split(",");

              for (let j = 0; j < splitimage.length; j++) {
                var imageurl = imageBase + splitimage[j];
                // imageHtml += '<img src="'+ imageurl +'" alt="Property Image" />'
                imageHtml +=
                  '<SwiperSlide><div class="swiper-slide"> <div class="pr-img-box"> <img src="' +
                  imageurl +
                  '" alt="Property Image" /> </div> </div></SwiperSlide>';
              }
              imageHtml += "</Swiper>"
            } else {
              var imageurl = imageBase + imagesdata;
              imageHtml =
                '<div class="swiper-slide"> <div class="pr-img-box"> <img src="' +
                imageurl +
                '" alt="Property Image" /> </div> </div>';
              // imageHtml = '<img src="'+ imageurl +'" alt="Property Image" />'
            }
            var FeatureHtml = "";

            var feature = res.data.data[0][i].PropertyFeature;

            if (feature.includes(",")) {
              var splitFeature = feature.split(",");
              for (let j = 0; j < splitFeature.length; j++) {
                FeatureHtml +=
                  '<li> <img src="' +
                  iconBase +
                  '/wp-content/themes/valueCare/images/accessible.svg" alt="Accessible"> <span>' +
                  splitFeature[j] +
                  "</span> </li>";
              }
            } else {
              FeatureHtml =
                '<li> <img src="' +
                iconBase +
                '/wp-content/themes/valueCare/images/accessible.svg" alt="Accessible"> <span>' +
                feature +
                "</span> </li>";
            }
            var balcony = "";

            if (res.data.data[0][i].BalconyCount != null) {
              balcony =
                '<p> <img src="' +
                iconBase +
                '/wp-content/themes/valueCare/images/balcony.svg" alt="Bedrooms"> <span>' +
                res.data.data[0][i].BalconyCount +
                " Balcony</span> </p>";
            }

            var hrefUrl =
              "/Propertydetails/?id=" + res.data.data[0][i].PropertyID;

            htmlLoop +=
              '<div class="pl-list-box"> <div class="pr-image"> <div class="pr-slider"> <div class="swiper prSwiper"> <div class="swiper-wrapper"> ' +
              imageHtml +
              ' </div> <div class="swiper-button-next"></div> <div class="swiper-button-prev"></div> </div></div> </div> <div class="pr-content"> <a href="' +
              hrefUrl +
              '"><h3>' +
              res.data.data[0][i].AddrLine1 +
              ", " +
              res.data.data[0][i].City +
              ", " +
              res.data.data[0][i].PostalCode +
              ', Australia</h3></a> <p class="pr-short"> ' +
              res.data.data[0][i].BriefDescription +
              '</p> <div class="pr-rooms"> <p> <img src="' +
              iconBase +
              '/wp-content/themes/valueCare/images/bedrooms.svg" alt="Bedrooms"> <span>' +
              res.data.data[0][i].TotalBedroomCount +
              ' Bedrooms</span> </p> <p> <img src="' +
              iconBase +
              '/wp-content/themes/valueCare/images/bathrooms.svg" alt="Bathrooms"> <span>' +
              res.data.data[0][i].BathroomCount +
              " Bathrooms</span> </p> " +
              balcony +
              ' </div> <div class="pr-sda"> <h5>' +
              res.data.data[0][i].PropertyType +
              "</h5> <h5>Feature</h5> <ul> " +
              FeatureHtml +
              '  </ul> </div> <div class="pr-footer"> <div class="pr-lv-option"> <p> <img src="' +
              iconBase +
              '/wp-content/themes/valueCare/images/living-options.svg" alt="Multiple Leaving Options" /> <span>Multiple living options are available</span> </p> </div> <div class="pr-book"> <a href="' +
              hrefUrl +
              '">Book an Inspection</a> </div> </div> </div> </div>';
          }

          console.log("hhhh2", htmlLoop);
          var wrapper = document.getElementById("propertyListing");
          document.getElementById("propertyCount").innerHTML =
            res.data.data[0].length;
          wrapper.innerHTML = htmlLoop;
          // document.getElementById("heading").innerHTML = heading;
          // document.getElementById("subHeading").innerHTML = subHeading;

          // var swiper = new Swiper(".prSwiper", {
          //   navigation: {
          //     nextEl: ".swiper-button-next",
          //     prevEl: ".swiper-button-prev",
          //   },
          // });
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  };

  // const SearchProperty = () => {
  //   // document.getElementById("loaderWrap").style.display = "block";
  //   // document.getElementById("propertyListing").style.display = "none";
  //   // document.getElementById("propertyListingFilter").style.display = "block";

  //   var url = window.location.href;

  //   var propertyUrl = url.split("?id=");

  //   var propertyID = propertyUrl[1];

  //   // var suburb = document.getElementById("suburb").value;
  //   // var bedroom = document.getElementById("bedroom").value;
  //   // var bathroom = document.getElementById("bathroom").value;
  //   // var states = document.getElementById("states").value;

  //   console.log(suburb + bedroom + bathroom + states);
  //   var pDatatoSearch = {
  //     suburb: suburb,
  //     bedroom: bedroom,
  //     bathroom: bathroom,
  //     states: states,
  //     propertyType: propertyID,
  //   };
  //   console.log(pDatatoSearch);
  //   // document.getElementById("propertyListing").innerHTML = ""

  //   axios
  //     .post(
  //       apiBase + "/Property/getPropertylistWebsite",
  //       JSON.stringify(pDatatoSearch)
  //     )
  //     .then((res) => {
  //       debugger;
  //       if (res.success) {
  //         console.log(res);
  //         document.getElementById("loaderWrap").style.display = "none";
  //         // localStorage.setItem("PropertyList", JSON.stringify(res.data));
  //         // document.getElementById("SetValue").innerHTML = "GET Data"

  //         var htmlLoop = "";
  //         console.log(res.data[0]);
  //         console.log(res.data[0][0]);

  //         for (let i = 0; i < res.data[0].length; i++) {
  //           console.log("IN Data123");

  //           var imageHtml = "";
  //           var imagesdata = res.data[0][i].URL;

  //           if (imagesdata.includes(",")) {
  //             var splitimage = imagesdata.split(",");

  //             for (let j = 0; j < splitimage.length; j++) {
  //               var imageurl = imageBase + splitimage[j];
  //               // imageHtml += '<img src="'+ imageurl +'" alt="Property Image" />'
  //               imageHtml +=
  //                 '<div class="swiper-slide"> <div class="pr-img-box"> <img src="' +
  //                 imageurl +
  //                 '" alt="Property Image" /> </div> </div>';
  //             }
  //           } else {
  //             var imageurl = imageBase + imagesdata;
  //             imageHtml =
  //               '<div class="swiper-slide"> <div class="pr-img-box"> <img src="' +
  //               imageurl +
  //               '" alt="Property Image" /> </div> </div>';
  //             // imageHtml = '<img src="'+ imageurl +'" alt="Property Image" />'
  //           }
  //           var FeatureHtml = "";

  //           var feature = res.data[0][i].PropertyFeature;

  //           if (feature.includes(",")) {
  //             var splitFeature = feature.split(",");
  //             for (let j = 0; j < splitFeature.length; j++) {
  //               FeatureHtml +=
  //                 '<li> <img src="/wp-content/themes/valueCare/images/accessible.svg" alt="Accessible"> <span>' +
  //                 splitFeature[j] +
  //                 "</span> </li>";
  //             }
  //           } else {
  //             FeatureHtml =
  //               '<li> <img src="/wp-content/themes/valueCare/images/accessible.svg" alt="Accessible"> <span>' +
  //               feature +
  //               "</span> </li>";
  //           }

  //           var hrefUrl =
  //             "https://wordpress-419965-2723092.cloudwaysapps.com/property-details/?id=" +
  //             res.data[0][i].PropertyID;

  //           htmlLoop +=
  //             '<div class="pl-list-box"> <div class="pr-image"> <div class="pr-slider"> <div class="swiper prSwiper"> <div class="swiper-wrapper"> ' +
  //             imageHtml +
  //             ' </div> <div class="swiper-button-next"></div> <div class="swiper-button-prev"></div> </div></div> </div> <div class="pr-content"> <a href="' +
  //             hrefUrl +
  //             '"><h3>' +
  //             res.data[0][i].AddrLine1 +
  //             ", " +
  //             res.data[0][i].City +
  //             ", " +
  //             res.data[0][i].PostalCode +
  //             ', Australia</h3></a> <p class="pr-short"> ' +
  //             res.data[0][i].BriefDescription +
  //             '</p> <div class="pr-rooms"> <p> <img src="/wp-content/themes/valueCare/images/bedrooms.svg" alt="Bedrooms"> <span>' +
  //             res.data[0][i].TotalBedroomCount +
  //             ' Bedrooms</span> </p> <p> <img src="/wp-content/themes/valueCare/images/bathrooms.svg" alt="Bathrooms"> <span>' +
  //             res.data[0][i].BathroomCount +
  //             ' Bathrooms</span> </p> <p> <img src="/wp-content/themes/valueCare/images/balcony.svg" alt="Bedrooms"> <span>' +
  //             res.data[0][i].BalconyCount +
  //             ' Balcony</span> </p> </div> <div class="pr-sda"> <h5>' +
  //             res.data[0][i].PropertyType +
  //             "</h5> <h5>Feature</h5> <ul> " +
  //             FeatureHtml +
  //             '  </ul> </div> <div class="pr-footer"> <div class="pr-lv-option"> <p> <img src="/wp-content/themes/valueCare/images/living-options.svg" alt="Multiple Leaving Options" /> <span>Multiple living options are available</span> </p> </div> <div class="pr-book"> <a href="' +
  //             hrefUrl +
  //             '">Book an Inspection</a> </div> </div> </div> </div>';
  //         }

  //         var wrapper = document.getElementById("propertyListingFilter");
  //         document.getElementById("propertyCount").innerHTML =
  //           res.data[0].length;
  //         console.log(htmlLoop);
  //         wrapper.innerHTML = htmlLoop;

  //         // var swiper = new Swiper(".prSwiper", {
  //         //     navigation: {
  //         //     nextEl: ".swiper-button-next",
  //         //     prevEl: ".swiper-button-prev",
  //         //     },
  //         // });
  //       }
  //     });
  // };

  return (
    <div>
      {/* <div class="loader-wrap" id="loaderWrap" style="display: none;">
        <div class="loader">
          <svg viewBox="0 0 32 32" width="42" height="42">
            <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
          </svg>
        </div>
      </div> */}

      <div class="property-list-wrap">
        <div class="pl-header">
          <div class="container">
            <div class="pl-header-inner">
              <h2 id="heading"></h2>
              <span class="devider"></span>
              <p id="subHeading"></p>
            </div>
          </div>
        </div>

        <div class="filter-wrap">
          <div class="container">
            <div class="filter-inner">
              <div class="grid-row">
                <div class="grid-col-3">
                  <div class="filter-input">
                    <label>Search Suburb/Post Code</label>
                    <input
                      type="text"
                      id="suburb"
                      placeholder="Search Suburb/Post Code"
                    />
                  </div>
                </div>
                <div class="grid-col-8">
                  <div class="grid-row">
                    <div class="grid-col-3">
                      <div class="filter-input">
                        <label>State</label>
                        <select id="states">
                          <option value="Australia Capital City">
                            Australia Capital City
                          </option>
                          <option value="New South Wales">
                            New South Wales
                          </option>
                          <option value="Queensland">Queensland</option>
                          <option value="South Australia">
                            South Australia
                          </option>
                          <option value="Tasmania">Tasmania</option>
                          <option value="Victoria">Victoria</option>
                          <option value="Western Australia">
                            Western Australia
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="grid-col-3">
                      <div class="filter-input">
                        <label>Bedreoom Count</label>
                        <select id="bedroom">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                    </div>
                    <div class="grid-col-3">
                      <div class="filter-input">
                        <label>Bathroom Count</label>
                        <select id="bathroom">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>

                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>

                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>

                          <option value="10">10</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="filter-check">
                <label>
                  <input type="checkbox" /> Vacancies
                </label>
                <label>
                  <input type="checkbox" /> Wheelchair Accessible
                </label>
              </div>
              <div class="filter-sub">
                {/* <button type="button" onclick={SearchProperty()}>
                  Search
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <div class="pl-content-wrap">
          <div class="container">
            <div class="pl-content-inner">
              <h6>
                <span id="propertyCount"></span> vacancies found
              </h6>
              <div class="pl-list-outer" id="propertyListing12">

                <div class="pl-list-box">
                  <div class="pr-image">
                    <div class="pr-slider">

                      <img src="https://servicesapi.valuecare.org.au/documents/Property/199-223 Anambah Roadpic6.jpeg" alt="Property Image" />


                      <div class="pr-content">
                        <a href="/property-details/?id=08c3860d-6cb7-11ed-9f52-fa163e3ffd3c">
                          <h3>199-233 Anambah Road, Anambah, 2320, Australia</h3>
                        </a>
                        <p class="pr-short"> All NDIS funded supports are available for Supported Independent Living and Respite participants.</p>
                        <div class="pr-rooms">
                          <p>
                            <img src="/wp-content/themes/valueCare/images/bedrooms.svg" alt="Bedrooms" />
                            <span>5 Bedrooms</span>
                          </p>
                          <p>
                            <img src="/wp-content/themes/valueCare/images/bathrooms.svg" alt="Bathrooms" />
                            <span>3 Bathrooms</span>
                          </p>
                          <p>
                            <img src="/wp-content/themes/valueCare/images/balcony.svg" alt="Bedrooms" />
                            <span>1 Balcony</span>
                          </p>
                        </div>
                        <div class="pr-sda">
                          <h5>SIL</h5>
                          <h5>Feature</h5>
                          <ul>
                            <li>
                              <img src="/wp-content/themes/valueCare/images/accessible.svg" alt="Accessible" />
                              <span>Garage</span>
                            </li>
                          </ul>
                        </div>
                        <div class="pr-footer">
                          <div class="pr-lv-option">
                            <p> <img src="/wp-content/themes/valueCare/images/living-options.svg" alt="Multiple Leaving Options" />
                              <span>Multiple living options are available</span>
                            </p>
                          </div>
                          <div class="pr-book">
                            <a href="/property-details/?id=08c3860d-6cb7-11ed-9f52-fa163e3ffd3c">Book an Inspection
                              <i aria-hidden="true" class="fas fa-chevron-right">
                              </i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div></div>

                  <div
                    class="pl-list-outer"
                    id="propertyListingFilter"
                  //style="display:none"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
}
        export default Page2;
