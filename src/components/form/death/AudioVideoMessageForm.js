import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Modal,Upload } from "antd";
import video2 from "../../../assets/images/video2.png";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import Header from "../components/header";
import Add from "../components/add";
import "../../custom/CustomSubFormTable.css";
import { WebcamStreamCapture } from "../../../helpers/Recorder";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";

const formName = "audioVideoForm";

class AudioVideoMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio_video: [],
      formData: {},
      showModal: false,
      showAudioModal: false,
      recordState: null,
      audioData: null,
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.audioVideoForm &&
      this.props.checklistObject.audioVideoForm.hasOwnProperty("audio_video")
    )
      this.setState({
        audio_video: this.props.checklistObject.audioVideoForm.audio_video,
      });
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });
  };

  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    this.setState({
      audioData: audioData,
    });
    console.log("audioData", audioData);
  };

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  getAudioVideoRow = () => {
    const { role } = this.props;
    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={6}></Col>
          <Col span={6}>
            <div className="custom-audio-video-container">
              <div>
                {/* <Icon type="delete" style={{ fontSize: "20px" }}></Icon> */}
              </div>
              <span className="custom-media-header">No Media</span>
              {role !== "ROLE" ? (
                <React.Fragment>
                  <div
                    className="custom-add-audio-video"
                    onClick={() => {
                      this.setState({ showModal: true });
                    }}
                  >
                    <span style={{ color: "white" }}>Add Video</span>
                  </div>
                  <div
                    style={{ marginTop: "10px" }}
                    className="custom-add-audio-video"
                    onClick={() => {
                      this.setState({ showModal: true });
                    }}
                  >
                    <span style={{ color: "white" }}>Remove Video</span>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="custom-audio-video-container">
              <span className="custom-media-header">No Media</span>
              {role !== "ROLE" ? (
                <React.Fragment>
                  <div
                    className="custom-add-audio-video"
                    onClick={() => {
                      this.setState({ showAudioModal: true });
                    }}
                  >
                    <span style={{ color: "white" }}>Add Audio</span>
                  </div>
                  <div
                    style={{ marginTop: "10px" }}
                    className="custom-add-audio-video"
                    onClick={() => {
                      this.setState({ showModal: true });
                    }}
                  >
                    <span style={{ color: "white" }}>Remove Audio</span>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col span={6}></Col>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const largeBills = [
      {
        title: "Incapacitated",
        dataIndex: "incapaticitated",
        key: "incapaticitated",
        fields: [
          {
            type: "Video",
            name: "incapaticitated",
            title: "If I Am Incapacitated",
          },
        ],
      },
      {
        title: "Spouse/Partner",
        dataIndex: "spouse_partner",
        key: "spouse_partner",
        fields: [
          {
            type: "Video",
            name: "spouse_partner",
            title: "If I Die Spouse/Partner",
          },
        ],
      },
      {
        title: "Family",
        dataIndex: "family",
        key: "family",
        fields: [
          {
            type: "Video",
            name: "family",
            title: "If I Die Family",
          },
        ],
      },
      {
        title: "Friends",
        dataIndex: "friends",
        key: "friends",
        fields: [
          {
            type: "Video",
            name: "friends",
            title: "If I Die Friends",
          },
        ],
      },
    ];

    const { recordState } = this.state;
    const { handleFormInputChange } = this.props;

    return (
      <React.Fragment>
        {this.state.showModal ? (
          <Modal
            closable={false}
            width="55vw"
            centered
            visible={true}
            title={"Record Video"}
            footer={false}
          >
           
            <WebcamStreamCapture
              onCancel={() => {
                this.setState({ showModal: false });
              }}
            ></WebcamStreamCapture>
            
          </Modal>
        ) : null}

        {this.state.showAudioModal ? (
          <Modal
            closable={false}
            // width="55vw"
            centered
            visible={true}
            title={"Record Audio"}
            footer={false}
          >
            <div>
              <AudioReactRecorder
                state={recordState}
                onStop={this.onStop}
                backgroundColor="rgb(255,255,255)"
              />
              <audio
                id="audio"
                controls
                src={this.state.audioData ? this.state.audioData.url : null}
              ></audio>
              <button id="record" onClick={this.start}>
                Start
              </button>
              <button id="stop" onClick={this.stop}>
                Stop
              </button>
            </div>
            <button
              id="pause"
              onClick={() => {
                this.setState({ showAudioModal: false });
              }}
            >
              Cancel
            </button>

            <Upload >
            <Button style={{
              width: "100%",
              marginLeft:"1rem"
            }}
          >Upload Audio</Button>
          </Upload>

          <button
              id="pause"
              onClick={() => {
                this.setState({ showAudioModal: false });
              }}
            >
              Done
            </button>
          </Modal>
        ) : null}

        <Header image={video2} title={"Audio Video Message"} />

        <Add title={"Incapacitated"} />
        {this.getAudioVideoRow()}
        <Add title={"Spouse / Partner"} />
        {this.getAudioVideoRow()}
        <Add title={"Family"} />
        {this.getAudioVideoRow()}
        <Add title={"Friends"} />
        {this.getAudioVideoRow()}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default AudioVideoMessage;
