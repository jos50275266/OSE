import React from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";

const FacebookWrapper = styled.section`
  width: 100%;
`;

const Facebook = ({ informParent = (f) => f }) => {
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken },
    })
      .then((response) => {
        console.log("FACEBOOK SIGNIN SUCCESS", response);
        // Inform Parent Component
        informParent(response);
      })
      .catch((error) => {
        console.log("error", error);
        console.log("FACEBOOK SIGNIN ERROR", error.response);
      });
  };

  return (
    <FacebookWrapper>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="btn btn-primary btn-lg btn-block"
          >
            <i className="fab fa-facebook pr-2"></i> Login with Facebook
          </button>
        )}
      />
    </FacebookWrapper>
  );
};

export default Facebook;
