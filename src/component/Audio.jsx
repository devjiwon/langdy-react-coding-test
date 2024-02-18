import React, {useState} from "react"

const AudioComponent = (props) => {
  const {setAudioUrl, handleValidation} = props;

  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [validation, setValidation] = useState(false);
  const chunks = [];

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data); // 청크 데이터를 배열에 추가
      });

      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        setOnRec(false);
        handleValidation('audio', false);
        if (e.playbackTime >= 10) {

          setValidation(true);
        } else setValidation(false);
      };
    }).catch((error) => {
      alert('마이크 사용 권한을 허용해야 녹음을 진행할 수 있습니다.');
    });
  };

  const offRecAudio = () => {
    if(!validation) {
      alert('10초 이상 녹음 되어야 합니다.');
      return;
    }

    handleValidation('audio', true);

    media.ondataavailable = function (e) {
      chunks.push(e.data);
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  };

  return (
    <button onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? '녹음' : '중지'}</button>
  );
};

export default AudioComponent;
