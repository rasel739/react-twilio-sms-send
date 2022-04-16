import OtpTimer from "otp-timer";
import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  BsCheckCircleFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import inputSmsStyle from "../../assets/css/style.module.css";

const InputSmsText = () => {
  const [fromCheck, setFromCheck] = useState(false);
  const [checkBoxText, setCheckBoxText] = useState("Single Message");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTime, setAlertTime] = useState(null);
  const [buttonCheck, setButtonCheck] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { phoneNumber, fromNumber, fromMessageSid, message } = data;

    if (fromCheck === true) {
      const bulkData = { phoneNumber, fromMessageSid, message };
      console.log(bulkData);
      messageapi(bulkData, "bulkMessage");
    } else {
      const singleData = { phoneNumber, fromNumber, message };
      console.log(singleData);

      messageapi(singleData, "singleMessage");
    }
  };

  const messageapi = (data, url) => {
    fetch(`https://react-twilio-sms-server.herokuapp.com/${url}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((result) => {
        setAlertTime(true);
        setAlertMessage(
          <Alert variant="success">
            <BsCheckCircleFill /> message sent successfully
          </Alert>
        );
        setTimeout(() => {
          setAlertTime(false);
        }, 3000);
        setButtonCheck(true);
      })
      .catch((error) => {
        setAlertTime(true);
        setAlertMessage(
          <Alert variant="danger">
            <BsFillExclamationTriangleFill /> unverified phone number message
            not sent
          </Alert>
        );
        setTimeout(() => {
          setAlertTime(false);
        }, 3000);
      });
  };

  const handleCheck = (event) => {
    setFromCheck(event.currentTarget.checked);
    fromCheck
      ? setCheckBoxText("Single Message")
      : setCheckBoxText("Bulk Message");
  };

  const handleSubmitTime = () => {
    setTimeout(() => {
      setButtonCheck(false);
    }, 20000);
  };

  const handleCharacterCount = (e) => {
    setCharacterCount(e.target.value.length);
  };

  return (
    <Container fluid className={inputSmsStyle.inputContainer}>
      <Container>
        <div>{alertTime ? alertMessage : ""}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>
              <span className={inputSmsStyle.inputStar}>*</span>{" "}
              {fromCheck ? "Bulk" : "Single"} To Receiver Phone Numbers
            </Form.Label>
            <Form.Control
              type="tel"
              maxlength={fromCheck ? "" : "14"}
              placeholder={
                fromCheck
                  ? "+8801860124450,+8801517826356,+8801309583999"
                  : "+8801445673489"
              }
              {...register("phoneNumber", { required: true })}
              className={fromCheck ? "w-100" : "w-25"}
            />
            {errors.phoneNumber && (
              <span className="text-danger">
                <BsFillExclamationTriangleFill />
                Phone Number is required
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>
              <span className={inputSmsStyle.inputStar}>*</span>{" "}
              {fromCheck ? "From Messaging Service SID" : "From Phone Numbers"}
            </Form.Label>
            <Form.Select aria-label="Default select example">
              <option>
                {fromCheck
                  ? "Select Messaging Service Sid"
                  : "Select from Number"}
              </option>
              {fromCheck ? (
                <option
                  value="MGf3cd8c1fa8903eef72d500945451be96"
                  {...register("fromMessageSid", { required: true })}
                >
                  MGf3cd8c1fa*****f72d500945451be96
                </option>
              ) : (
                <option
                  value="+19896327481"
                  {...register("fromNumber", { required: true })}
                >
                  +198****7481
                </option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <span className={inputSmsStyle.inputStar}>*</span> Write a Body
              Text
            </Form.Label>
            <span className="ms-2">{characterCount}/400</span>
            <Form.Control
              as="textarea"
              placeholder="Write Customer's Message..."
              style={{ height: "100px" }}
              {...register("message", { required: true })}
              onChange={handleCharacterCount}
              maxlength="400"
            />
            {errors.message && (
              <span className="text-danger">
                {" "}
                <BsFillExclamationTriangleFill />
                Message is required
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              onClick={handleCheck}
              label={checkBoxText}
            />
          </Form.Group>
          {buttonCheck ? (
            <Button variant="danger" onClick={handleSubmitTime} type="submit">
              <OtpTimer
                seconds={20}
                minutes={0}
                text="Resend SMS"
                ButtonText="Resend SMS"
                textColor={"#fff"}
              />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmitTime} type="submit">
              Send SMS
            </Button>
          )}
        </form>
      </Container>
    </Container>
  );
};

export default InputSmsText;
