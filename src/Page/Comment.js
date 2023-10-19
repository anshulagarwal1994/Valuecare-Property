import React, { useState } from "react";
import { useHistory } from "react-router";

import { useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Comment() {
  return (

    <div className="thankyou-wrap">
      <div className="container">
        <div className="thankyou-inner">
          <span><CheckCircleOutlineIcon></CheckCircleOutlineIcon></span>
          <p>
            Thank you for contacting us. Our representative will be in touch with you soon.
          </p>
        </div>
      </div>
    </div>
    // <div class="elementor-widget-wrap elementor-element-populated">
    //   <div
    //     class="elementor-element elementor-element-58da777 elementor-view-default elementor-widget elementor-widget-icon animated swing"
    //     data-id="58da777"
    //     data-element_type="widget"
    //     data-settings='{"_animation":"swing"}'
    //     data-widget_type="icon.default"
    //   >
    //     <div class="elementor-widget-container">
    //       <div class="elementor-icon-wrapper">
    //         <div class="elementor-icon">
    //           <i aria-hidden="true" class="far fa-check-circle"></i>{" "}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div
    //     class="elementor-element elementor-element-9dbc697 elementor-widget elementor-widget-heading animated fadeInDown"
    //     data-id="9dbc697"
    //     data-element_type="widget"
    //     data-settings='{"_animation":"fadeInDown"}'
    //     data-widget_type="heading.default"
    //   >
    //     <div class="elementor-widget-container">
    //       <style></style>
    //       <h2 class="elementor-heading-title elementor-size-default">
            
    //       </h2>{" "}
    //     </div>
    //   </div>
    // </div>
  );
}
export default Comment;
