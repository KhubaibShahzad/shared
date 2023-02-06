import React from "react";
import Webcam from "react-webcam";
import { Row, Col, Button,Upload } from "antd";
import swal from 'sweetalert';


export const WebcamStreamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [imgSrc, setImgSrc] = React.useState(null);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${imageSrc}" width="700px" height="600px">`;
  }, [webcamRef, setImgSrc]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);



  return (
    <>
      <Webcam mirrored={true} audio={false} ref={webcamRef} />
      <Row gutter={8}>
        {capturing ? (
          <Col span={6}>
            <Button
              type="primary"
              style={{
                width: "100%",
              }}
              onClick={handleStopCaptureClick}
            >
              Stop Capture
            </Button>
          </Col>
        ) : (
          <Col span={6}>
            <Button
              style={{
                width: "100%",
              }}
              onClick={handleStartCaptureClick}
            >
              Start Capture
            </Button>
          </Col>
        )}
        {recordedChunks.length > 0 && (
          <Col span={6}>
            <Button
              style={{
                width: "100%",
              }}
              onClick={handleDownload}
            >
              Download
            </Button>
          </Col>
        )}
        <Col span={6}>
          <Button
            style={{
              width: "100%",
            }}
            onClick={capture}
          >
            SnapShot
          </Button>
        </Col>
       

        <Col span={6}>
          <Button
            type="danger"
            style={{
              width: "100%",
            }}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </Col>

        <Col span={6}>
        <Upload >
            <Button style={{
              width: "100%",
            }}
            
          >Upload Video</Button>
          </Upload>
        
        </Col>



        <Col span={6}>
          <Button
            type="success"
            style={{
              marginTop:"1rem",
              width: "100%",
            }}
            onClick={props.onCancel}
          >
            Done
          </Button>
        </Col>
      </Row>
    </>
  );
};
