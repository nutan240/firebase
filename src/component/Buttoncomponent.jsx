import { Button } from "@mui/material";
import React from "react";

function Buttoncomponent({ buttontype, title  ,handelclick}) {
  return (
    <Button
      variant="contained"
      sx={{
        background:
          "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
          marginLeft :'3px'
      }}
      type={buttontype}
      onClick={handelclick}
    >
      {title}
    </Button>
  );
}

export default Buttoncomponent;
