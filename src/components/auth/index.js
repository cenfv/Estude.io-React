import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Auth(props) {
  var ReturnComponent = props.redirect;
  if (useSelector((state) => state.usuarioLogado) > 0) {
    ReturnComponent = props.component;
  }
  return <ReturnComponent />;
}

export default Auth;
