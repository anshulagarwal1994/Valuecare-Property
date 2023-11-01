import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBase, imageBase, iconBase } from "../utils/constant";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';
import { Fade, Zoom, Slide } from "react-slideshow-image";
import Swiper from "swiper";
function Page3() {
  const search = useLocation().search;
  let history = useHistory();
  let imageUrl = ""
  // let propertydata = [];
  const [propertydata, setList] = useState([]);
  const id = new URLSearchParams(search).get("id");
  useEffect(() => {
    getpropertyDetailsById();
  },[]);

  const getpropertyDetailsById = () => {
    // var url = window.location.href

    // var propertyUrl = url.split("?id=");

    // var propertyID = propertyUrl[1];

    // console.log("URL = ",propertyID)

    var pData = {
      id: id,
    };

    axios
      .post(apiBase + "/Property/getPropertylistById", pData)
      .then((res) => {
        debugger;
        console.log(res);
        // console.log(res.data.data[0][0]);

        if (res.data.success) {
          var addressLine1 = ""
            if(res.data.data[0][0].AddrLine1 != ""){
              addressLine1 = res.data.data[0][0].AddrLine1 + ", "
            }
          
            var addressLine2 = ""
            if(res.data.data[0][0].AddrLine2 != ""){
              addressLine2 = res.data.data[0][0].AddrLine2 + ", "
            }
            
            var addressLine3 = ""
            if(res.data.data[0][0].AddrLine3 != ""){
              addressLine3 = res.data.data[0][0].AddrLine3 + ", "
            }
          var Address =
          addressLine1 +
          addressLine2 +
          addressLine3 +
            res.data.data[0][0].City +
            ", " + res.data.data[0][0].State+ ", " + 
            res.data.data[0][0].PostalCode +
            ", Australia";
          var imageHtml = "";
          var imagesdata = res.data.data[0][0].URL;

          
     
          var propertydataUrl = []
          const propertyImages = imagesdata.split(",");
          for (let i = 0; i < propertyImages.length; i++) {
            propertydataUrl.push({
                imgSrc: "https://servicesapi.valuecare.org.au/" + propertyImages[i] 
              });
              imageUrl = "https://servicesapi.valuecare.org.au/" +propertyImages[0]
          }

          document.getElementById("setImage").innerHTML = "<img class = 'imgwidth' src = '" +imageUrl+ "' />";

          setList(propertydataUrl)

          console.log("propertydata = ",propertydataUrl)
          

          var AccessibilityHTML = "";
          console.log("Res dfg = ", res.data.data[0][0].PropertyAccesibility);
          var Accessibilitydata = res.data.data[0][0].PropertyAccesibility;


          if (Accessibilitydata.includes(",")) {
            var splitAccibility = Accessibilitydata.split(",");

            for (let j = 0; j < splitAccibility.length; j++) {
              // var imageurl = "https://valuecare.cognisunsandbox.com/Backend/" + splitimage[j];
              // imageHtml += '<img src="'+ imageurl +'" alt="Property Image" />'
              AccessibilityHTML +=
                '<li><img src="' +
                iconBase +
                '/wp-content/themes/valueCare/images/wheelchair-white.svg" alt="Valuecare"><span>' +
                splitAccibility[j] +
                "</span></li>";
            }
          } else {
            AccessibilityHTML =
              '<li><img src="' +
              iconBase +
              '/wp-content/themes/valueCare/images/wheelchair-white.svg" alt="Valuecare"><span>' +
              Accessibilitydata +
              "</span></li>";
          }

          var Property_SDAHTML = "";
          var SDAdata = res.data.data[0][0].PropertySDA;

          if (SDAdata.includes(",")) {
            var splitSDA = SDAdata.split(",");

            for (let j = 0; j < splitSDA.length; j++) {
              // var imageurl = "https://valuecare.cognisunsandbox.com/Backend/" + splitimage[j];
              // imageHtml += '<img src="'+ imageurl +'" alt="Property Image" />'
              Property_SDAHTML +=
                '<li><img src="' +
                iconBase +
                '/wp-content/themes/valueCare/images/check-white.svg" alt="Valuecare"><span>' +
                splitSDA[j] +
                "</span></li>";
            }
          } else {
            Property_SDAHTML =
              '<li><img src="' +
              iconBase +
              '/wp-content/themes/valueCare/images/check-white.svg" alt="Valuecare"><span>' +
              SDAdata +
              "</span></li>";
          }

          document.getElementById("Address").innerHTML = Address;
          // document.getElementById("imageSlider").innerHTML = imageHtml;
          console.log("about  = ",res.data.data[0][0].AboutProperty);

          document.getElementById("Bedroom").innerHTML =
            res.data.data[0][0].TotalBedroomCount;
          document.getElementById("Bathroom").innerHTML =
            res.data.data[0][0].BathroomCount;
          // document.getElementById("AvlBedroom").innerHTML =
          //   res.data.data[0][0].TotalAvailableBedroomCount;
          document.getElementById("AvlBedrooms").innerHTML =
            res.data.data[0][0].TotalAvailableBedroomCount;

          document.getElementById("Accessibility").innerHTML =
            AccessibilityHTML;
          document.getElementById("AboutProperty").innerHTML =
            res.data.data[0][0].AboutProperty;

           

          document.getElementById("SDAProperty").innerHTML = Property_SDAHTML;

          var propType = ""

          if(res.data.data[0][0].PropertyType == "SDA"){
            propType = "Specialist Disability Accommodation"
          }
         else  if(res.data.data[0][0].PropertyType == "SIL"){
            propType = "Supported Independent Living"
          }
          else{
            propType = res.data.data[0][0].PropertyType
          }
          
          document.getElementById("propertyType").innerHTML =
          propType+ " Care";

          console.log(Address);
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  };
  const propertyImagesFun = () =>{
    debugger
    // <h2>Hello</h2>
    console.log("propertyData3 = ",propertydata);
    return propertydata.map((data,index) => {
      // <div className="swiper-slide">
      //   <div className="pr-img-box">
          // <img src={data.imgSrc} alt="Property Image" />
      //   </div>
      // </div>
      <h2>{data.imgSrc}</h2>

    })

  }

  const removeError = (id) =>{

    document.getElementById(id).innerHTML = ""

  }

  const buttonClick = () => {
    console.log("URL = ", id);
    debugger;
    let AreYou = [];
    const checkboxes = document.getElementsByName("areyoua");
    checkboxes.forEach((el) => el.checked && AreYou.push(el.value));
    // console.log('The AreYou(s): ' + AreYou);
    var AreYouAString = "";
    for (var i = 0; i < AreYou.length; i++) {
      AreYouAString += AreYou[i] + "-";
    }

    AreYouAString = AreYouAString.substring(0, AreYouAString.length - 1);
    // console.log("Hello demo = ",AreYouAString);

    let About = [];
    const checkboxesAbout = document.getElementsByName("inquiry-about");
    checkboxesAbout.forEach((els) => els.checked && About.push(els.value));
    // console.log('The About(s): ' + About);

    var AboutString = "";
    for (var i = 0; i < About.length; i++) {
      AboutString += About[i] + "-";
    }

    AboutString = AboutString.substring(0, AboutString.length - 1);
    // console.log("Hello demo = ",AboutString);

    var firstname = document.getElementById("Fname").value;
    var lastname = document.getElementById("Lname").value;
    var phone = document.getElementById("Phone").value;
    var email = document.getElementById("Email").value;
    var PostCode = document.getElementById("Postal").value;
    var Note = document.getElementById("Note").value;
    var checkBoxTC = document.getElementById("checkbox_id")
    var conditonstc = checkBoxTC.checked

    console.log("conditonstc = ",conditonstc);

    var radios = document.getElementsByName("contact-when");
    var contactWhen = "";
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        // alert(radios[i].value);
        contactWhen = radios[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }
    // console.log("radios[i].value" , contactWhen)

    var Contact = "";
    var radiosContact = document.getElementsByName("contact");
    for (var i = 0, length = radiosContact.length; i < length; i++) {
      if (radiosContact[i].checked) {
        // do whatever you want with the checked radio
        // alert(radios[i].value);
        Contact = radiosContact[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

    console.log("radios[i].value", Contact);

    var validate = true;
    var firstnameerr = false
    var lastnameerr = false
    var phoneerr = false
    var emailerr = false
    var PostCodeerr = false
    var contacterr = false
    var ContactTimeerr = false
    var EnquiryAbouterr = false
    var Noteerr = false
    var areyouaerr = false
    var conditonstcerr = false


    if (firstname == "") {
      firstnameerr = false
      document.getElementById("firstnameerr").innerHTML = "Please enter first name"


    } else {
      firstnameerr = true
      document.getElementById("firstnameerr").innerHTML = ""

    }
    if (lastname == "") {
      lastnameerr = false
      document.getElementById("lastnameerr").innerHTML = "Please enter last name"

    } else {
      lastnameerr = true
      document.getElementById("lastnameerr").innerHTML = ""

    }

    if (phone == "") {
      phoneerr = false
      document.getElementById("phoneerr").innerHTML = "Please enter phone number"

    } else {
      phoneerr = true
      document.getElementById("phoneerr").innerHTML = ""

    }

    if (email == "") {
      emailerr = false
      document.getElementById("emailerr").innerHTML = "Please enter email id"

    } else {
      emailerr = true
      document.getElementById("emailerr").innerHTML = ""

    }

    if (PostCode == "") {
      PostCodeerr = false
      document.getElementById("PostCodeerr").innerHTML = "Please enter postal code"
    } else {
      PostCodeerr = true
      document.getElementById("PostCodeerr").innerHTML = ""

    }

    if (AboutString == "") {
      EnquiryAbouterr = false
      document.getElementById("EnquiryAbouterr").innerHTML = "Please select an option"

    } else {
      EnquiryAbouterr = true
      document.getElementById("EnquiryAbouterr").innerHTML = ""

    }

    if (AreYouAString == "") {
      document.getElementById("areyouaerr").innerHTML = "Please select an option"
      areyouaerr = false

    } else {
      areyouaerr = true
      document.getElementById("areyouaerr").innerHTML = ""
    }

    if (Note == "") {
      document.getElementById("Noteerr").innerHTML = "Please enter message"
      Noteerr = false

    } else {

      document.getElementById("Noteerr").innerHTML = ""
      Noteerr = true

    }

    if (contactWhen == "") {
      ContactTimeerr = false
      document.getElementById("ContactTimeerr").innerHTML = "Please select an option"

    } else {
      ContactTimeerr = true
      document.getElementById("ContactTimeerr").innerHTML = ""

    }

    if (Contact == "") {
      contacterr = false
      document.getElementById("contacterr").innerHTML = "Please select an option"

    } else {
      contacterr = true
      document.getElementById("contacterr").innerHTML = ""
    }
    debugger
    if(conditonstc == false){
      conditonstcerr = false
      document.getElementById("conditonstcerr").innerHTML = "Please accept Consent"

    }else{
      conditonstcerr = true
      document.getElementById("conditonstcerr").innerHTML = ""
     
    }

    if (firstnameerr == true &&
      lastnameerr == true &&
      phoneerr == true &&
      emailerr == true &&
      PostCodeerr == true &&
      contacterr == true &&
      ContactTimeerr == true &&
      EnquiryAbouterr == true &&
      PostCodeerr == true &&
      areyouaerr == true && conditonstcerr == true) {

      var Data = {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        PostCode: PostCode,
        EnquiryAbout: AboutString,
        AreYou: AreYouAString,
        PropertyId: id,
        bookingtype: "visit",
        Message: Note,
        ContactTime: contactWhen,
        Contact: Contact,
        DataType: "Website",
      };

      // if (validate === true) {
      axios
        .post(
          apiBase + "/Property/AddupdateAssignProperty",
          JSON.stringify(Data)
        )
        .then((res) => {
          debugger;
          if (res.data.success) {
            console.log("Res Data = ", res);
            console.log(res.data.data[0][0].BookInspectionID);

            if (res.data.data[0][0].BookInspectionID != "") {
              // document.getElementById("Success").innerHTML = "Form submitted successfully"
              document.getElementById("myForm").reset();
              //  window.location.href = "/property-thank-you-page/";
              history.push("/property-thank-you-page");
            }
          }
        })
        .catch((err) => {
          console.log("setLock err", err);
        });
      // }

    } else {
      // alert('Please fill the form')
    }



  };

  return (
    <div>
      <div className="property-list-wrap">
        {/* <div className="pl-header">
          <div className="container">
            <div className="pl-header-inner">
              <h2>Property Details</h2>
              <span className="devider"></span>
              <p>
                Search for Supported Independent Living (SIL) and SDA vacancies
                across New South Wales, Queensland, the ACT, and Victoria.
              </p>
            </div>
          </div>
        </div> */}

        <div className="property-details-wrap">
          <div className="property-cat-title">
            <div className="container">
              <h2 id = "propertyType"></h2>
            </div>
          </div>
          <div className="container">
            <div className="pr-head">
              <div className="pr-title">
                <div className="pr-title-left">
                  
                  <h3 className="pr-adr" id="Address"></h3>
                </div>
                <div className="pr-title-right">
                  {/* <p>
                    <label id="AvlBedroom"></label> X Vacancies
                  </p> */}
                  <a href="#inspectionForm">Make an Enquiry</a>
                </div>
              </div>
              <div className="pr-rooms">
                <p>
                  <img
                    src={
                      iconBase +
                      "/wp-content/themes/valueCare/images/bedrooms.svg"
                    }
                    alt="Bedrooms"
                  />
                  <span>
                    <label id="Bedroom"></label> Bedrooms
                  </span>
                </p>
                <p>
                  <img
                    src={
                      iconBase +
                      "/wp-content/themes/valueCare/images/bathrooms.svg"
                    }
                    alt="Bathrooms"
                  />
                  <span>
                    <label id="Bathroom"></label> Bathrooms
                  </span>
                </p>
                <p>
                  <img
                    src={
                      iconBase +
                      "/wp-content/themes/valueCare/images/bedrooms.svg"
                    }
                    alt="Bedrooms"
                  />
                  <span>
                    <label id="AvlBedrooms"></label> Bedrooms Available
                  </span>
                </p>
              </div>
            </div>
            <div className="pd-row" id="propertyDetailsPage">
              <div className="pd-main">
                <div className="pd-img">
              
                      
                    {/* <Slide> */}
                    {/* {propertydata.map((item, index) => ( */}

                        <div className="swiper-slide">
                          <div className="pr-img-box" key = "1" id = "setImage">
                            {/* <img src={imageUrl} alt="Property Image" /> */}
                          </div>
                        </div>

                        {/* ))} */}
                    {/* </Slide> */}
                        
                </div>
                <div className="pd-features">
                  <div className="pd-row">
                    <div className="pdf-inner">
                      <h3>Accessibility</h3>
                      <ul id="Accessibility">
                        <li>
                          <img
                            src={
                              iconBase +
                              "/wp-content/themes/valueCare/images/wheelchair-white.svg"
                            }
                            alt="Valuecare"
                          />
                          <span>Wheelchair accessible</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pd-cat">
                    <h3>Supported Disability Accommodation (SDA)</h3>
                    <ul id="SDAProperty"></ul>
                  </div>
                </div>
                <div className="property-details-text" id="AboutProperty"></div>

                <div className="property-map"></div>
              </div>
              <div className="pd-inspection-wrap" id="sidebar">
                <div className="book-ipc-form" id="inspectionForm">
                  <h3>Book an Inspection</h3>

                  <form id="myForm">
                    <div className="bif-form-wrap">
                      <div className="grid-row">
                        <div className="grid-col-6">
                          <div className="bif-box">
                            <label>
                              First Name<span>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter first name"
                              name="Fname"
                              id="Fname"
                              // onFocus={}
                              onFocus={() => removeError("firstnameerr")}
                            />
                            <span className="error-span" id="firstnameerr"></span>
                          </div>
                        </div>
                        <div className="grid-col-6">
                          <div className="bif-box">
                            <label>
                              Last Name<span>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter last name"
                              name="Lname"
                              id="Lname"
                              onFocus={() => removeError("lastnameerr")}
                            />
                            <span className="error-span" id="lastnameerr"></span>
                          </div>
                        </div>
                      </div>
                      <div className="grid-row">
                        <div className="grid-col-6">
                          <div className="bif-box">
                            <label>
                              Phone<span>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter phone number"
                              name="Phone"
                              id="Phone"
                              onFocus={() => removeError("phoneerr")}
                            />
                            <span className="error-span" id="phoneerr"></span>
                          </div>
                        </div>
                        <div className="grid-col-6">
                          <div className="bif-box">
                            <label>
                              Email<span>*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="Enter email"
                              name="Email"
                              id="Email"
                              onFocus={() => removeError("emailerr")}
                            />
                            <span className="error-span" id="emailerr"></span>
                          </div>
                        </div>
                      </div>
                      <div className="grid-row">
                        <div className="grid-col-6">
                          <div className="bif-box">
                            <label>
                              Postcode<span>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter postal code"
                              name="Postal"
                              id="Postal"
                              onFocus={() => removeError("PostCodeerr")}
                            />
                            <span className="error-span" id="PostCodeerr"></span>
                          </div>
                        </div>
                        <div className="grid-col-6"></div>
                      </div>
                      <div className="grid-row">
                        <div className="grid-col-6">
                          <div className="bif-box">
                            <label>
                              How would you like us to contact you?
                              <span>*</span>
                            </label>
                            <div className="check-value">
                              <label>
                                <input
                                  type="radio"
                                  name="contact"
                                  onFocus={() => removeError("contacterr")}
                                  value="Email"
                                />{" "}
                                Email
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="contact"
                                  onFocus={() => removeError("contacterr")}
                                  value="SMS"
                                />{" "}
                                SMS
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="contact"
                                  onFocus={() => removeError("contacterr")}
                                  value="Phone"
                                />{" "}
                                Phone
                              </label>
                              <span className="error-span" id="contacterr"></span>
                              <label for="contact" className="error"></label>

                            </div>
                          </div>
                        </div>
                        <div className="grid-col-6">
                          <div className="bif-box">
                            <label>
                              When would you like us to contact you?
                              <span>*</span>
                            </label>
                            <div className="check-value">
                              <label>
                                <input
                                  type="radio"
                                  name="contact-when"
                                  value="Morning"
                                  onFocus={() => removeError("ContactTimeerr")}
                                />{" "}
                                Morning
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="contact-when"
                                  value="Afternoon"
                                  onFocus={() => removeError("ContactTimeerr")}
                                />{" "}
                                Afternoon
                              </label>
                              <span className="error-span" id="ContactTimeerr"></span>
                              <label for="contact-when" className="error"></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bif-box">
                        <label>
                          What is your enquiry about?<span>*</span>
                        </label>
                        <div className="check-value">
                          <div className="grid-row">
                            <div className="grid-col-6">
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  value="Disability Employment Services"
                                />{" "}
                                Disability Employment Services
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  value="Short Term Accommodation and Respite"
                                />{" "}
                                Short Term Accommodation and Respite
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  value="Community Services"
                                />{" "}
                                Community Services
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  value="Allied Health"
                                />{" "}
                                Allied Health
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  value="Australian Disability Enterprises"
                                />{" "}
                                Australian Disability Enterprises
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  value="Careers"
                                />{" "}
                                Careers
                              </label>
                            </div>
                            <div className="grid-col-6">
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  value="School Leavers Employment Services"
                                />{" "}
                                School Leavers Employment Services
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                  
                                  value="Supported Independent Living"
                                />{" "}
                                Supported Independent Living
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  value="Lifestyle Centres"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                />{" "}
                                Lifestyle Centres
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  value="Support Coordination"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                />{" "}
                                Support Coordination
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  value="Media Enquiries and Partnerships"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                />{" "}
                                Media Enquiries and Partnerships
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  name="inquiry-about"
                                  value="Other Enquiries"
                                  onFocus={() => removeError("EnquiryAbouterr")}
                                />{" "}
                                Other Enquiries
                              </label>
                              <span className="error-span" id="EnquiryAbouterr"></span>
                              <label for="inquiry-about" className="error"></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bif-box">
                        <label>
                          Leave a message<span>*</span>
                        </label>
                        <textarea id="Note" name="Note" onFocus={() => removeError("Noteerr")}></textarea>
                        <span className="error-span" id="Noteerr"></span>
                      </div>
                      <div className="bif-box">
                        <label>
                          Are you a?<span>*</span>
                        </label>
                        <div className="check-value">
                          <label>
                            <input
                              type="checkbox"
                              name="areyoua"
                              onFocus={() => removeError("areyouaerr")}
                              value="NDIS Participant"
                            />{" "}
                            NDIS Participant
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="areyoua"
                              onFocus={() => removeError("areyouaerr")}
                              value="Current Value Care Client"
                            />{" "}
                            Current Value Care Client
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="areyoua"
                              onFocus={() => removeError("areyouaerr")}
                              value="Carer / Family / Guardian"
                            />{" "}
                            Carer / Family / Guardian
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="areyoua"
                              onFocus={() => removeError("areyouaerr")}
                              value="Referrer"
                            />{" "}
                            Referrer
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="areyoua"
                              value="Other"
                              onFocus={() => removeError("areyouaerr")}
                            />{" "}
                            Other
                          </label>
                          <span className="error-span" id="areyouaerr"></span>
                          <label for="areyoua" className="error"></label>
                        </div>
                      </div>
                      <div className="bif-box">
                        <label>
                          Consent<span>*</span>
                        </label>
                        <div className="check-value">
                          <label>
                            <input type="checkbox" onFocus={() => removeError("conditonstcerr")} name="Consent" id = "checkbox_id" />I consent to
                            Value Care use, collection and disclosure of my
                            personal information, and where personal information
                            has been provided on behalf of, or in relation to
                            another person, I have their consent to do so. I
                            authorise this in accordance with Value Care Terms
                            and Conditions, Privacy Procedure and Easy Read
                            Privacy Collection Notice (as may be changed from
                            time to time by Value Care).
                          </label>
                          <span className="error-span" id="conditonstcerr"></span>
                          <label for="Consent" className="error"></label>
                        </div>
                      </div>
                      <div className="bif-submit">
                        <button type="button" onClick={() => buttonClick()}>
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </form>
                  <p id="Success"></p>
                </div>
              </div>
            </div>

            <div className="related-properties"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page3;
