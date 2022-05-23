import axios from "axios";
import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { Button, Alert } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import config from "../config/server";

function PasteArea(props) {
  const defaultTextLabel = "Verification Code";
  const [isValid, setValidity] = useState(true);
  const [pasteClicked, isPasteClicked] = useState(false);
  const [textBoxLabel, setTextBoxLabel] = useState(defaultTextLabel);
  const [authCode, setMatchedCode] = useState("");
  const [retrievedText, setRetrievedText] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function verifyInput(input) {
    if (input.length === 4 && /^\d+$/.test(input)) {
      return true;
    } else if (input === "") {
      return true;
    }
    setValidity(false);
    return false;
  }

  function handlePaste() {
    isPasteClicked(true);
    props.setIsCopy(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMatchedCode(value);
    setTextBoxLabel(defaultTextLabel);
  }

  function copyToClipboard(event) {
    if (retrievedText !== "") {
      navigator.clipboard.writeText(retrievedText);
      console.log("Copied text to clipboard");
      setCopySuccess(true);
      event.preventDefault();
    }
  }

  function queryItem(authCode) {
    axios
      .get(`${config.endpoint}/authenticationCode/${authCode}`)
      .then(function handleResponse(response) {
        const responseBody = response.data;
        setRetrievedText(responseBody.content);
        setVisibility(true);
        setTextBoxLabel("");
      })
      .catch(function handleError(error) {
        console.log(error);
        setTextBoxLabel("Incorrect Code");
        setValidity(false);
      });
    setLoading(false);
  }

  function submitCode(event) {
    if (verifyInput(authCode)) {
      setLoading(true);
      console.log("Retrieving text for matched code.");
      queryItem(authCode);
      event.preventDefault();
    } else {
      setTextBoxLabel("Incorrect Code");
    }
  }

  return (
    <div className="paste-area">
      {!pasteClicked && (
        <Button variant="text" onClick={handlePaste}>
          Pasting instead?
        </Button>
      )}
      {pasteClicked && <h1 className="title">ctrl+v</h1>}
      <form>
        {pasteClicked && (
          <div className="paste-form">
            <TextField
              error={!isValid}
              onChange={handleChange}
              label={textBoxLabel}
              value={authCode}
              placeholder="Enter your verification code."
            />
            <div className="submit-area">
              <LoadingButton
                size="small"
                onClick={submitCode}
                endIcon={<NavigateNextRoundedIcon />}
                loading={loading}
                loadingPosition="end"
                variant="outlined"
              >
                Paste
              </LoadingButton>
              <IconButton
                onClick={() => window.location.reload(false)}
                color="primary"
              >
                <RestartAltIcon />
              </IconButton>
            </div>
          </div>
        )}
      </form>
      {visibility && (
        <div className="paste-view">
          <h4>{retrievedText}</h4>
          <IconButton style={{ backgroundColor: 'transparent' }} onClick={copyToClipboard} color="primary">
            <ContentCopyIcon />
          </IconButton>
          <Snackbar
            message="Copied to clipboard"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={2000}
            onClose={() => setCopySuccess(false)}
            open={copySuccess}
          >
            <Alert severity="info">Text copied!</Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
}

export default PasteArea;
