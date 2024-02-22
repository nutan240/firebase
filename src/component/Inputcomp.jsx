import { useState } from "react";
import { TextField } from "@mui/material";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function Inputcomp({
  label,
  type,
  inputname,
  inputvalue,
  handleChange,
  handleBlur,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      fullWidth
      label={label}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      name={inputname}
      value={inputvalue}
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{
        endAdornment:
          type === "password" ? (
            <div
              style={{ cursor: "pointer" }}
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </div>
          ) : null,
      }}
    />
  );
}

export default Inputcomp;
