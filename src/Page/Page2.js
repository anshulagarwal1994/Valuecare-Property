import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { apiBase, imageBase, iconBase } from "../utils/constant";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import MapComponent from "./MapComponent";
import UseGooglemap from "./UseGooglemap";
import HeaderPage from "./Header";
import Tooltip from "@material-ui/core/Tooltip";
import { Autocomplete } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import "swiper/css";
import { ControlCameraTwoTone } from "@mui/icons-material";

function Page2() {
  let history = useHistory();
  const search = useLocation().search;
  const [sizeses, setSizes] = useState(0);
  const listArray = [];
  const [location, setlocation] = useState([]);
  const [locationsearch, setlocationSearch] = useState([]);

  const [AvailbleProperty, setAvailbleProperty] = useState(false);
  const [isReload, setisReload] = useState(false);
  const [isSearch, setisSearch] = useState(false);
  const [newfilterSuburb, setnewfilterSuburb] = useState("");
  const [filterSate, setfilterSate] = useState("");
  const [stateErrText, setstateErrText] = useState("");
  const id = new URLSearchParams(search).get("id");
  const typeid = new URLSearchParams(search).get("data");
  const [list, setList] = useState([]);
  const [suburlist, setsuburlist] = useState([]);
  const [managedData, setManagedData] = useState("");
  const [StateData, setStateData] = useState("");
  const [stateList, setStateList] = useState(null);
  // var filterSate = "";
  var filterSuburb = "";
  //var newfilterSuburb = "";
  var deliverytype = [
    // { value: "Residential", label: "Residential" },
    // { value: "Commercial", label: "Commercial" },
  ];

  useEffect(() => {
    getStateData();

    setStateData([
      {
        label: "New South Wales",
        value: "New South Wales"
      },
      {
        label: "Northern Territory",
        value: "Northern Territory"
      },
    ])

    console.log(localStorage.getItem("Search"));

    if (localStorage.getItem("Search")) {
      var getData = localStorage.getItem("Search");
      setfilterSate(localStorage.getItem("states"));
      //filterSate = localStorage.getItem("states");

      console.log("Search = ", getData.bedroom);
      SearchProperty();
    } else {
      getpropertylist();
    }

    setisReload(true);
  }, []);

  const getpropertylist = () => {
    var pData = {
      id: id,
    };

    let urldata = new URLSearchParams(search).get("data");
    var subHeading =
      "Search for " +
      urldata +
      " (" +
      id +
      ") vacancies across New South Wales, Queensland, the ACT, and Victoria.";

    document.getElementById("heading").innerHTML = urldata + " vacancies";
    document.getElementById("subHeading").innerHTML = subHeading;
    document.getElementById("PropertyTypes").innerHTML = urldata;

    axios
      .post(apiBase + "/Property/getPropertylistWebsite", pData)
      .then((res) => {
        debugger;
        if (res.data.success) {
          console.log(res);

          var locationlist = res.data.data[0].map((item) => {
            const getSingle = item.URL.split(",");
            let imageUrl = "";
            for (let index = 0; index < getSingle.length; index++) {
              imageUrl = "https://servicesapi.valuecare.org.au/" + getSingle[0];
            }
            var addressLine1 = ""
            if(item.AddrLine1 != ""){
              addressLine1 = item.AddrLine1 + ", "
            }
          
            var addressLine2 = ""
            if(item.AddrLine2 != ""){
              addressLine2 = item.AddrLine2 + ", "
            }
            
            var addressLine3 = ""
            if(item.AddrLine3 != ""){
              addressLine3 = item.AddrLine3 + ", "
            }

            return {
              title:
              addressLine1 +
              addressLine2 +
              addressLine3 +
                item.City +
                ", " +
                item.State +
                ", " +
                item.PostalCode +
                ", " +
                "Australia",
              shortDes: item.BriefDescription,
              bedroom: item.TotalBedroomCount,
              bathroom: item.BathroomCount,
              imageUrl: imageUrl,
              id: "/Propertydetails/?id=" + item.PropertyID,
              position: { lat: item.Latitude, lng: item.Longitude },
            };
          });
          setlocation(locationlist);
          // document.getElementById("manual").style.display = "block"
          // document.getElementById("search").style.display = "none"
          setAvailbleProperty(true);
          var htmlLoop = "";
          setList(res.data.data[0]);
          document.getElementById("propertyCount").innerHTML =
            res.data.data[0].length;

          console.log("krutiiii", list);
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  };
  const displayReviewSites = () => {
    // document.getElementById("propertyCount").innerHTML = res.data.data[0].length
    console.log("List = ", list.length);

    if(list.length > 0){

      return list.map((data) => {
        var hrefurl = "/Propertydetails/?id=" + data.PropertyID;
        const propertyFeatureString = data.PropertyFeature;
        const propertyFeatureArray = data.PropertyFeature.split(",");
        let propertydata = [];
  
        const propertyImages = data.URL.split(",");
        for (let i = 0; i < propertyImages.length; i++) {
          propertydata.push({
            imgSrc: "https://servicesapi.valuecare.org.au/" + propertyImages[i],
          });
        }
        let htmlFeatures = "";
  
        console.log("propertyData = ", propertydata);
  
        for (let j = 0; j < propertyFeatureArray.length; j++) {
          htmlFeatures += `<li>
              
               <img
                 src="https://wordpress-419965-2723092.cloudwaysapps.com//wp-content/themes/valueCare/images/accessible.svg"
                 alt="Accessible"
               />
               <span>${propertyFeatureArray[j]}</span>
            </li>`;
        }
  
        localStorage.removeItem("AvailbleProperty");
        localStorage.removeItem("bedroom");
        localStorage.removeItem("bathroom");
        localStorage.removeItem("propertyType");
        localStorage.removeItem("states");
        localStorage.removeItem("suburb");
        localStorage.removeItem("Search");
        return (
          <div className="pm-list-box">
            <div className="pm-image">
              <Slide>
                {propertydata.map((item, index) => (
                  <span key={index}>
                    <img src={item.imgSrc} alt="Property Image"></img>
                  </span>
                ))}
              </Slide>
            </div>
  
            <div className="pm-content">
              <div className="pm-category">
                <span>{data.PropertyType}</span>
              </div>
              <div className="pm-name">
                <a  href={hrefurl}>
                <h3>
                  {data.AddrLine1 + " "}
                  {data.AddrLine2 + " "}
                  {data.AddrLine3 + ", "}
                  {data.City ? data.City + ", " : ""}
                  {data.State ? data.State + ", " : ""}
                  {data.PostalCode ? data.PostalCode + ", " : ""}
                  {"Australia"}
                </h3></a>
              </div>
              <div className="pm-location">
                <p>{data.BriefDescription}</p>
              </div>
              <div className="pm-avail">
                <span>
                  <b>{data.TotalBedroomCount}</b> Bedreooms
                </span>
                <span>
                  <b>{data.BathroomCount}</b> Bathrooms
                </span>
              </div>
              <div className="pm-more">
                <a href={hrefurl}>Learn more</a>
              </div>
            </div>
          </div>
        );
      });

    }else{
      // document.getElementById("propertyCount").innerHTML =
      //         "0";
      // localStorage.removeItem("AvailbleProperty");
      //   localStorage.removeItem("bedroom");
      //   localStorage.removeItem("bathroom");
      //   localStorage.removeItem("propertyType");
      //   localStorage.removeItem("states");
      //   localStorage.removeItem("suburb");
      //   localStorage.removeItem("Search");
      return (
        
        <div className="pm-content">
        <span class = "NoData">No Property available for this search.</span>
      </div>
  
      );

    }

    // return list.map((data) => {
    //   var hrefurl = "/Propertydetails/?id=" + data.PropertyID;
    //   const propertyFeatureString = data.PropertyFeature;
    //   const propertyFeatureArray = data.PropertyFeature.split(",");
    //   let propertydata = [];

    //   const propertyImages = data.URL.split(",");
    //   for (let i = 0; i < propertyImages.length; i++) {
    //     propertydata.push({
    //       imgSrc: "https://servicesapi.valuecare.org.au/" + propertyImages[i],
    //     });
    //   }
    //   let htmlFeatures = "";

    //   console.log("propertyData = ", propertydata);

    //   for (let j = 0; j < propertyFeatureArray.length; j++) {
    //     htmlFeatures += `<li>
            
    //          <img
    //            src="https://wordpress-419965-2723092.cloudwaysapps.com//wp-content/themes/valueCare/images/accessible.svg"
    //            alt="Accessible"
    //          />
    //          <span>${propertyFeatureArray[j]}</span>
    //       </li>`;
    //   }

    //   localStorage.removeItem("AvailbleProperty");
    //   localStorage.removeItem("bedroom");
    //   localStorage.removeItem("bathroom");
    //   localStorage.removeItem("propertyType");
    //   localStorage.removeItem("states");
    //   localStorage.removeItem("suburb");
    //   localStorage.removeItem("Search");
    //   return (
    //     <div className="pm-list-box">
    //       <div className="pm-image">
    //         <Slide>
    //           {propertydata.map((item, index) => (
    //             <span key={index}>
    //               <img src={item.imgSrc} alt="Property Image"></img>
    //             </span>
    //           ))}
    //         </Slide>
    //       </div>

    //       <div className="pm-content">
    //         <div className="pm-category">
    //           <span>{data.PropertyType}</span>
    //         </div>
    //         <div className="pm-name">
    //           <a  href={hrefurl}>
    //           <h3>
    //             {data.AddrLine1 + " "}
    //             {data.AddrLine2 + " "}
    //             {data.AddrLine3 + ", "}
    //             {data.City ? data.City + ", " : ""}
    //             {data.State ? data.State + ", " : ""}
    //             {data.PostalCode ? data.PostalCode + ", " : ""}
    //             {"Australia"}
    //           </h3></a>
    //         </div>
    //         <div className="pm-location">
    //           <p>{data.BriefDescription}</p>
    //         </div>
    //         <div className="pm-avail">
    //           <span>
    //             <b>{data.TotalBedroomCount}</b> Bedreooms
    //           </span>
    //           <span>
    //             <b>{data.BathroomCount}</b> Bathrooms
    //           </span>
    //         </div>
    //         <div className="pm-more">
    //           <a href={hrefurl}>Learn more</a>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
  };

  const showHide = () => {
    let myElement = document.getElementById("hidefilter");
    let mypmOuter = document.getElementById("pmOuter");
    if (myElement.classList.contains("hidefilter")) {
      myElement.classList.remove("hidefilter");
      myElement.classList.add("showfilter");
      mypmOuter.classList.add("showpmOuter");
      // setSizes(1);
      // document.getElementById("ToolHideMap").style.display ="none"
      // document.getElementById("ToolShowMap").style.display ="block"
    } else {
      myElement.classList.remove("showfilter");
      myElement.classList.add("hidefilter");
      mypmOuter.classList.remove("showpmOuter");
      // setSizes(0);
    }
  };

  const toggleClass = () => {
    debugger;

    let myElement = document.getElementById("toggleclass");

    if (myElement.classList.contains("showMap")) {
      myElement.classList.remove("showMap");
      myElement.classList.add("hideMap");

      setSizes(1);

      // document.getElementById("ToolHideMap").style.display ="none"
      // document.getElementById("ToolShowMap").style.display ="block"
    } else {
      myElement.classList.remove("hideMap");
      myElement.classList.add("showMap");

      setSizes(0);
    }
  };

  const getStateData = () => {
    const formattedData = {
      StringMapType: "STATE",
      SortType: "Alpha",
    };

    axios({
      url: apiBase + "Utils/getDropDownValues",
      method: "POST",
      headers: {},
      data: formattedData,
    })
      .then((res) => {
        if (res.data?.success) {
          console.log("StateList===>", res.data.data);

          setStateList(
            res.data.data.map((item) => ({
              value: item.StringMapName,
              label: item.StringMapName,
            }))
          );
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const getSuburbList = (input) => {
    debugger;
    axios
      .post(apiBase + "Property/getDatafromState", input)
      .then((res) => {
        debugger;
        if (res.data.success) {
          console.log(res.data.data);

          
            res.data.data[0].map((state) => {
              var arr1 = {
                value: state.PostalCode,
                label: state.PostalCode,
              };
              deliverytype.push(arr1);
            }
          );

          res.data.data[1].map((city) => {
            var arr2 = {
              value: city.City,
              label: city.City,
            };
            deliverytype.push(arr2);
          }
        );

        res.data.data[2].map((suburb) => {
          if(suburb.AddrLine3 != ""){

            var arr3 = {
              value: suburb.AddrLine3,
              label: suburb.AddrLine3,
            };
            deliverytype.push(arr3);

          }
          
        }
      );

          console.log("managedData = ",deliverytype);
          setManagedData(deliverytype)
          console.log("managedData = ",managedData);
          // console.log("Manage 2 = ",managedData);
          // var fromStateOptions = res.data.data[0].map((state) => {
          //   var array = [];
          //   // var arr1 = {
          //   //   value: state.AddrLine3,
          //   //   label: state.AddrLine3,
          //   // };
          //   // deliverytype.push(arr1);
          //   // var arr2 = {
          //   //   value: state.City,
          //   //   label: state.City,
          //   // };

          //   // deliverytype.push(arr2);
          //   var arr3 = {
          //     value: state.PostalCode,
          //     label: state.PostalCode,
          //   };
          //   deliverytype.push(arr3);

          //   return deliverytype;
          // });
          //  deliverytype = fromStateOptions;
          // setsuburlist(fromStateOptions);
          // console.log("kkkkk", deliverytype);
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  };
  const handleChange = (e, value, type) => {
    debugger;
    
    if (type === "states") {
      setfilterSate(value.value);
      var newfilterSate = value.value;
      var inputdata = { state: newfilterSate, propertyType: id };
      getSuburbList(inputdata);
    } else if (type === "suburb") {
      var valueevent = e.target.value
      // setfilterSuburb(value ? value.value : "");
      setnewfilterSuburb(valueevent);
      filterSuburb = valueevent ? valueevent : "";
      setstateErrText("");
      setisSearch(true);
    } else if (type === "checkbox") {
      setAvailbleProperty(!AvailbleProperty);
    }
  };

  const ResetAll = () =>{
    localStorage.removeItem("AvailbleProperty");
    localStorage.removeItem("bedroom");
    localStorage.removeItem("bathroom");
    localStorage.removeItem("propertyType");
    localStorage.removeItem("states");
    localStorage.removeItem("suburb");
    localStorage.removeItem("Search");
    window.location.reload();
  }

  const setAvailable = () => {
    debugger;
    if (newfilterSuburb === "") {
      setstateErrText("Field is required");
      setisSearch(false);
    } else {
      setstateErrText("");
      setisSearch(true);
    }
    if (isSearch) {
      debugger;
      var inputData = {
        AvailbleProperty: AvailbleProperty,
        bedroom: AvailbleProperty ? "1" : "0",
        bathroom: "1",
        propertyType: id, //id + "&" + typeid, //"SDA&data=Specialist%20Disability%20Accommodation",
        states: filterSate,
        suburb: newfilterSuburb, //filterSuburb,
      };

      localStorage.setItem("AvailbleProperty", inputData.AvailbleProperty);
      localStorage.setItem("bedroom", inputData.bedroom);
      localStorage.setItem("bathroom", inputData.bathroom);
      localStorage.setItem("propertyType", inputData.propertyType);
      localStorage.setItem("states", inputData.states);
      localStorage.setItem("suburb", inputData.suburb);

      localStorage.setItem("Search", inputData);

      window.location.reload();
    }
  };

  const SearchProperty = () => {
    // console.log("filter", filterSate + "" + filterSuburb);
    debugger;
    setAvailbleProperty(false);

    var inputData = {
      AvailbleProperty: localStorage.getItem("AvailbleProperty"),
      bedroom: localStorage.getItem("bedroom"),
      bathroom: localStorage.getItem("bathroom"),
      propertyType: localStorage.getItem("propertyType"), //id + "&" + typeid, //"SDA&data=Specialist%20Disability%20Accommodation",
      states: localStorage.getItem("states"),
      suburb: localStorage.getItem("suburb"),
    };

   

    axios
      .post(apiBase + "/Property/getPropertylistWebsite", inputData)
      .then((res) => {
        debugger;
        if (res.data.success) {
          console.log(res);

          if(res.data.data[0].length == 0){
            localStorage.removeItem("AvailbleProperty");
            localStorage.removeItem("bedroom");
            localStorage.removeItem("bathroom");
            localStorage.removeItem("propertyType");
            localStorage.removeItem("states");
            localStorage.removeItem("suburb");
            localStorage.removeItem("Search");

          }else{

            var locationlist = res.data.data[0].map((item) => {
              const getSingle = item.URL.split(",");
              let imageUrl = "";
              for (let index = 0; index < getSingle.length; index++) {
                imageUrl = "https://servicesapi.valuecare.org.au/" + getSingle[0];
              }
              var addressLine1 = ""
            if(item.AddrLine1 != ""){
              addressLine1 = item.AddrLine1 + ", "
            }
          
            var addressLine2 = ""
            if(item.AddrLine2 != ""){
              addressLine2 = item.AddrLine2 + ", "
            }
            
            var addressLine3 = ""
            if(item.AddrLine3 != ""){
              addressLine3 = item.AddrLine3 + ", "
            }
              return {
                title:
                addressLine1 +
                addressLine2 +
                addressLine3  +
                  item.City +
                  ", " +
                  item.State +
                  ", " +
                  item.PostalCode +
                  ", " +
                  "Australia",
                shortDes: item.BriefDescription,
                bedroom: item.TotalBedroomCount,
                bathroom: item.BathroomCount,
                imageUrl: imageUrl,
                id: "/Propertydetails/?id=" + item.PropertyID,
                position: { lat: item.Latitude, lng: item.Longitude },
              };
            });
            setisReload(false);
            setlocation(locationlist);
            console.log("locationlist = ", locationlist);
            setAvailbleProperty(true);
            // document.getElementById("manual").style.display = "none"
            // document.getElementById("search").style.display = "block"
            //    document.getElementById("mapshow").innerHTML = location;
  
            setisReload(true);
  
            var htmlLoop = "";
            setList(res.data.data[0]);
            document.getElementById("propertyCount").innerHTML =
              res.data.data[0].length;
  
            console.log("krutiiii", list);

          }

          
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  };
  return (
    <div>
      <div class="property-list-wrap" style={{ display: "none" }}>
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
            <div class="filter-inner"></div>

            <div class="pl-content-wrap" id="mapshow">
              <div class="container" id="manual">
                {/* {isReload ? ( */}
                <UseGooglemap locationlist={location} />
                {/* ) : null} */}
              </div>

              <div className="pl-content-wrap" id="propertylistadd">
                <div className="container">
                  <div className="pl-content-inner">
                    <div classNameName="pl-list-outer" id=""></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="property-map-wrap showMap" id="toggleclass">
        {/* <div className="pm-row">
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
                    </div>
                  </div>
                </div>
                <div class="filter-sub">
                  <button
                    type="button"
                    // onclick={SearchProperty()}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="pm-row">
          {/* <div class="filter-wrap">
            <div class="container">
              <div class="filter-inner">
                <div class="grid-row">
                  <div class="grid-col-3">
                    <div class="filter-input">
                      <Autocomplete
                        options={deliverytype}
                        id="deliverytype"
                        onChange={(event, value) =>
                          handleChange(event, value, "suburb")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={filterSuburb}
                            label="Delivery Type"
                            fullWidth
                          />
                        )}
                      />
                      <span
                        id="cname"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {stateErrText}
                      </span>
                     
                    </div>
                  </div>
                  <div class="grid-col-8">
                    <div class="grid-row">
                      <div class="grid-col-3">
                        <div class="filter-input">
                          <label>State</label>
                          <select
                            id="states"
                            onChange={(event) => handleChange(event, "states")}
                          >
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
                    </div>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="myCheckbox"
                      value={AvailbleProperty ? "checked" : "unchecked"}
                      checked={AvailbleProperty}
                      onChange={(event) => handleChange(event, "checkbox")}
                    />
                    <label for="myCheckbox">Show only available</label>
                  </div>
                </div>
                <div class="filter-sub">
                  <button type="button" onClick={() => setAvailable()}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="pm-list-wrap">
            <div className="pm-list">
              <div className="pm-title">
                <h3 id="PropertyTypes"></h3>
                <div className="pmt-right">
                  <p>
                    <span id="propertyCount"></span> property found
                  </p>
                  {sizeses == 0 ? (
                    <Tooltip title="Hide Map" id="ToolHideMap" arrow>
                      <a
                        onClick={() => toggleClass()}
                        className="map-show-hide"
                      >
                        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                      </a>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Show Map" id="ToolShowMap" arrow>
                      <a
                        onClick={() => toggleClass()}
                        className="map-show-hide"
                      >
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                      </a>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="pm-filter">
                <div className="pmf-title" onClick={() => showHide()}>
                  <h3>Filter</h3>
                  <a href="#">
                    <ExpandMoreIcon></ExpandMoreIcon>
                  </a>
                </div>
                <div className="pmf-form hidefilter" id="hidefilter">
                  <div class="grid-row">
                    
                    <div className="grid-col-5">
                      <div className="filter-input">
                        {/* <label>State</label> */}
                        <Autocomplete
                          options={stateList}
                          id="states"
                          onChange={(event, value) =>
                            handleChange(event, value, "states")
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              value={filterSuburb}
                              label="State"
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid-col-5">
                      <div className="filter-input">
                        {/* <label>Search Suburb/Post Code</label> */}
                        {/* <Autocomplete
                          options={managedData}
                          id="deliverytype"
                          onChange={(event, value) =>
                            handleChange(event, value, "suburb")
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              value={filterSuburb}
                              label="City or Postal Code or Suburb"
                              fullWidth
                            />
                          )}
                        />
                        <span
                          id="cname"
                          style={{ color: "red", fontSize: "12px" }}
                        >
                          {stateErrText}
                        </span> */}

                        <input
                          type="text"
                          id="suburb"
                          placeholder="Search Suburb/Post Code"
                          onChange={(event) => handleChange(event, "", "suburb")}
                        />

<span
                          id="cname"
                          style={{ color: "red", fontSize: "12px" }}
                        >
                          {stateErrText}
                        </span>
                      </div>
                    </div>
                    <div className="grid-col-2">
                      <div className="filter-submit">
                        <button
                          type="button"
                          className="search-btn"
                          onClick={() => setAvailable()}
                        >
                          <SearchIcon></SearchIcon>
                        </button>
                        <button type="button" onClick={() => ResetAll()} className="reset-btn">
                          <RestartAltIcon></RestartAltIcon>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="filter-check-box">
                    <label for="myCheckbox">
                      <input
                        type="checkbox"
                        id="myCheckbox"
                        value={AvailbleProperty ? "checked" : "unchecked"}
                        checked={AvailbleProperty}
                        onChange={(event) => handleChange(event,"", "checkbox")}
                      />
                      <span>Show only available bedrooms</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="pm-list-outer" id="pmOuter">
                {displayReviewSites()}

                {/* <div className="pm-list-box">
                  <div className="pm-image">
                    <span>
                      <img src="https://placehold.co/400" alt="Property Image"></img>
                    </span>
                  </div>
                  <div className="pm-content">
                    <div className="pm-category">
                      <span>INDEOENDENT LIVING</span>
                    </div>
                    <div className="pm-name">
                      <h3>McRae-McMahon Place by ValueCare (Retirement Living)</h3>
                    </div>
                    <div className="pm-location">
                      <p>17 Marion Street, Leichhardt NSW, 2040</p>
                    </div>
                    <div className="pm-avail">
                      <span><b>3</b> Bedreooms</span>
                      <span><b>3</b> Bathrooms</span>
                    </div>
                    <div className="pm-more">
                      <a href="javascript:;">Learn more</a>
                    </div>
                  </div>
                </div>
                <div className="pm-list-box">
                  <div className="pm-image">
                    <span>
                      <img src="https://placehold.co/400" alt="Property Image"></img>
                    </span>
                  </div>
                  <div className="pm-content">
                    <div className="pm-category">
                      <span>INDEOENDENT LIVING</span>
                    </div>
                    <div className="pm-name">
                      <h3>McRae-McMahon Place by ValueCare (Retirement Living)</h3>
                    </div>
                    <div className="pm-location">
                      <p>17 Marion Street, Leichhardt NSW, 2040</p>
                    </div>
                    <div className="pm-avail">
                      <span><b>3</b> Bedreooms</span>
                      <span><b>3</b> Bathrooms</span>
                    </div>
                    <div className="pm-more">
                      <a href="javascript:;">Learn more</a>
                    </div>
                  </div>
                </div>
                <div className="pm-list-box">
                  <div className="pm-image">
                    <span>
                      <img src="https://placehold.co/400" alt="Property Image"></img>
                    </span>
                  </div>
                  <div className="pm-content">
                    <div className="pm-category">
                      <span>INDEOENDENT LIVING</span>
                    </div>
                    <div className="pm-name">
                      <h3>McRae-McMahon Place by ValueCare (Retirement Living)</h3>
                    </div>
                    <div className="pm-location">
                      <p>17 Marion Street, Leichhardt NSW, 2040</p>
                    </div>
                    <div className="pm-avail">
                      <span><b>3</b> Bedreooms</span>
                      <span><b>3</b> Bathrooms</span>
                    </div>
                    <div className="pm-more">
                      <a href="javascript:;">Learn more</a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="pm-map">
            <UseGooglemap locationlist={location} />

            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d353300.1363014915!2d150.96972040084566!3d-33.83421307387104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scare%20homes%20near%20Australia!5e0!3m2!1sen!2sin!4v1697200469828!5m2!1sen!2sin" width="100%" height="550" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page2;
