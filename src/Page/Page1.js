import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBase, imageBase } from "../utils/constant";
import { useHistory } from "react-router-dom";

export default function Page1() {
  let history = useHistory();
  const [getHTML, setgetHTML] = useState("");

  var htmlLoop = "";

  useEffect(() => {
    console.log("apiiii", apiBase);
    getoption();
  });
  // function sendData(paramValue) {
  //   debugger;

  //   console.log("Paramas== ", paramValue);
  //   // navigate("/Page2");
  //   // history.push("/Page2");
  // }
  const sendData = () => {
    //   console.log("Paramas== ");
    //   history.push("/Page2");
  };

  const getoption = () => {
    debugger;
    var dataToSend = {
      StringMapType: "PROPERTYTYPE",
      SortType: "",
    };

    axios
      .post(apiBase + "/Utils/getDropDownValues", dataToSend)
      .then((res) => {
        debugger;
        var resdata = res.data;
        if (resdata.success) {
          console.log("IN Data123", res);

          console.log("dataaaaa", resdata);
          for (let i = 0; i < resdata.data.length; i++) {
            var imageHtml = "";
            // var imagesdata = res.data[0][i].URL
            imageHtml = imageBase + resdata.data[i].ExtDescription;
            // src="https://servicesapi.valuecare.org.au/documents/Property/199-223 Anambah Roadpic2.jpeg"
            var hrefUrl =
              "/property-listing/?id=" +
              resdata.data[i].StringMapKey +
              "&data=" +
              resdata.data[i].Description;

            htmlLoop +=
              '<a class = "category-link" href="' +
              hrefUrl +
              '" onclick = {sendData("' +
              resdata.data[i].Description +
              '")}><div class="grid-col-3"> <div class="cat-detail-box"> <span class="cat-img"> <img src="' +
              imageHtml +
              '" alt="Property Category"/> </span> <h2>' +
              resdata.data[i].Description +
              " (" +
              resdata.data[i].StringMapKey +
              ')</h2> <a href="' +
              hrefUrl +
              '" onclick ={sendData("' +
              resdata.data[i].Description +
              '")}>Find out more</a> </div> </div></a>';
          }
          var wrapper = document.getElementById("propertyCategory");
          setgetHTML(htmlLoop);

          wrapper.innerHTML = htmlLoop;
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  };

  return (
    //<div>
    //   page 1<button onClick={history.push("/Page2")}>click me</button>{" "}
    // </div>
    <div class="property-cat-wrap">
      <div class="pl-header">
        <div class="container">
          <div class="pl-header-inner">
            <h2>Welcome to the Value Care</h2>
            <span class="devider"></span>
            <p>
              The team at Value Care are here to support our clients to make
              choices about how and where to live that works for each
              individual, how to find the right support and care, and realise
              opportunities for work and to have fun.
            </p>
          </div>
        </div>
      </div>

      <div class="cat-list-wrap">
        <div class="container">
          <div class="cat-list-inner">
            {/* <div class="grid-row" id="propertyCategory"></div> */}
            <div class="grid-row">
              <a
                class="category-link"
                onClick={() => history.push("/Propertylisting/?id=SDA&data=Specialist Disability Accommodation")}
                // href="/property-listing/?id=SDA&data=Specialist Disability Accommodation"
                // onclick={sendData("Specialist Disability Accommodation")}
              >
                <div class="grid-col-3">
                  {" "}
                  <div class="cat-detail-box">
                    {" "}
                    <span class="cat-img">
                      {" "}
                      <img
                        src="https://servicesapi.valuecare.org.au/documents/Category/SDA.jpg"
                        alt="Property Category"
                      />{" "}
                    </span>{" "}
                    <h2>Specialist Disability Accommodation (SDA)</h2>{" "}
                    <a
                      onClick={() => history.push("/Propertylisting/?id=SDA&data=Specialist Disability Accommodation")}
                      // href="/property-listing/?id=SDA&data=Specialist Disability Accommodation"
                      // onclick={sendData("Specialist Disability Accommodation")}
                    >
                      Find out more
                    </a>{" "}
                  </div>{" "}
                </div>
              </a>
              <a
                class="category-link"
                onClick={() => history.push("/Propertylisting/?id=SIL&data=Supported Independent Living")}
                // href="/property-listing/?id=SIL&data=Supported Independent Living"
                // onclick={sendData("Supported Independent Living")}
              >
                <div class="grid-col-3">
                  {" "}
                  <div class="cat-detail-box">
                    {" "}
                    <span class="cat-img">
                      {" "}
                      <img
                        src="https://servicesapi.valuecare.org.au/documents/Category/SIL.jpg"
                        alt="Property Category"
                      />{" "}
                    </span>{" "}
                    <h2>Supported Independent Living (SIL)</h2>{" "}
                    <a
                      onClick={() => history.push("/Propertylisting/?id=SIL&data=Supported Independent Living")}
                      // href="/property-listing/?id=SIL&data=Supported Independent Living"
                      onclick={sendData("Supported Independent Living")}
                    >
                      Find out more
                    </a>{" "}
                  </div>{" "}
                </div>
              </a>
              <a
                class="category-link"
                // href="/property-listing/?id=Respite&data=Respite Care"
                // onclick={sendData("Respite Care")}

                onClick={() => history.push("/Propertylisting/?id=Respite&data=Respite Care")}
              >
                <div class="grid-col-3">
                  {" "}
                  <div class="cat-detail-box">
                    {" "}
                    <span class="cat-img">
                      {" "}
                      <img
                        src="https://servicesapi.valuecare.org.au/documents/Category/RESPITE.jpg"
                        alt="Property Category"
                      />{" "}
                    </span>{" "}
                    <h2>Respite Care (Respite)</h2>{" "}
                    <a
                      // href="/property-listing/?id=Respite&data=Respite Care"
                      // onclick={sendData("Respite Care")}
                      onClick={() =>
                        history.push("/Propertylisting/?id=Respite&data=Respite Care")
                      }
                    >
                      Find out more
                    </a>{" "}
                  </div>{" "}
                </div>
              </a>
              <a
                class="category-link"
                // href="/property-listing/?id=MTA&data=Medium Term Accommodation"
                // onclick={sendData("Medium Term Accommodation")}
                onClick={() => history.push("/Propertylisting/?id=MTA&data=Medium Term Accommodation")}
              >
                <div class="grid-col-3">
                  {" "}
                  <div class="cat-detail-box">
                    {" "}
                    <span class="cat-img">
                      {" "}
                      <img
                        src="https://servicesapi.valuecare.org.au/documents/Category/MTA.jpg"
                        alt="Property Category"
                      />{" "}
                    </span>{" "}
                    <h2>Medium Term Accommodation (MTA)</h2>{" "}
                    <a
                      onClick={() => history.push("/Propertylisting/?id=MTA&data=Medium Term Accommodation")}
                      // href="/property-listing/?id=MTA&data=Medium Term Accommodation"
                      // onclick={sendData("Medium Term Accommodation")}
                    >
                      Find out more
                    </a>{" "}
                  </div>{" "}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
