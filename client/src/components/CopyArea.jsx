import { React, useState } from "react";
import axios from "axios";
import config from "../config/server";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import LoadingButton from "@mui/lab/LoadingButton";

function CopyArea(props) {
  const [text, setText] = useState("");
  const [authCode, setAuthCode] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setText(value);
  }

  function fetchAuthCode(authCode) {
    setAuthCode(authCode);
    setLoading(false);
  }

  function submitText(event) {
    if (text !== "") {
      setClicked(true);
      setLoading(true);
      props.setIsPaste(false);
      const item = {
        content: text,
      };
      axios
        .post(`${config.endpoint}/item`, item)
        .then(function handleResponse(response) {
          const authenticationCode = response.data.authenticationCode;
          fetchAuthCode(authenticationCode);
        })
        .catch((error) => console.log(error));
      console.log(`Posted to http server!`);
      event.preventDefault();
    }
  }

  function handleReset() {
    // Resetting all states to default
    setText("");
    setAuthCode(null);
    setClicked(false);
    props.setIsPaste(true);
  }

  return (
    <div className="copy-area">
      <h1 className="title">ctrl+c</h1>
      <form>
        <div className="copy-form">
          <TextField
            id="text"
            onChange={handleChange}
            label="Enter your text"
            value={text}
            placeholder="Enter your text"
          />
          <div className="submit-area">
            <LoadingButton
              size="small"
              onClick={submitText}
              endIcon={<NavigateNextRoundedIcon />}
              loading={loading}
              loadingPosition="end"
              variant="outlined"
            >
              Copy
            </LoadingButton>
            <IconButton onClick={handleReset} color="primary">
              <RestartAltIcon />
            </IconButton>
          </div>
        </div>
      </form>
      {clicked && (
        <div>
          <h3>Your verification code is: </h3>
          <h1>{authCode}</h1>
        </div>
      )}
    </div>
  );
}

export default CopyArea;
