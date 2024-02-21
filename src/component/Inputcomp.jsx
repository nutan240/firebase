import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Inputcomp({
  label,
  type,
  inputname,
  inputvalue,
  handelchange,
  handleBlur,
  showPassword,
}) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      name={inputname}
      value={inputvalue}
      onChange={handelchange}
      onBlur={handleBlur}
      InputProps={{
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  function handleTogglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
}

export default Inputcomp;
