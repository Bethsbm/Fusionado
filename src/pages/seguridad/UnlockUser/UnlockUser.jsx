import React from "react";

import { Formik } from "formik";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";



const UnlockUser = () => {
  const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
  const letter = /(?!.*[DFIOQU])[A-Z]/i;
  const digit = /[0-9]/;
  const mask = [firstLetter, digit, letter, " ", digit, letter, digit];




return ( 
  <InputMask mask="" maskChar={null} />
) 

 
};
export default UnlockUser;
