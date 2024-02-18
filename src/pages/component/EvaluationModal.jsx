import React, {useEffect, useState} from "react"
import ReactModal from 'react-modal';

// Components
import SelectComponent from '../../component/Select';
import InputComponent from "../../component/Input";
import AudioComponent from "../../component/Audio";

const styled = {
  overlay: {
    position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(77, 77, 77, 0.75)'
  },
  content: {
    position: 'absolute',
      width: '500px',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '12px',
      outline: 'none',
      padding: '20px 50px',
  }
};

const EvaluationModal = (props) => {
  const {isOpen, closeModal, detail, setDetail, saveData} = props;

  const [isActive, setIsActive] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [validation, setValidation] = useState({
    grammarScore: false,
    vocabularyScore: false,
    listeningScore: false,
    grammarExp: false,
    grammarExpStudent: false,
    grammarExpBetter: false,
    vocabularyExp: false,
    vocabularyExpStudent: false,
    vocabularyExpBetter: false,
    audio: false
  })

  /**
   * detail state 변경
   */
  const handleDetailState = (state, value) => {

    let check = false;

    switch (state) {
      case 'grammarScore':
      case 'vocabularyScore':
      case 'listeningScore':
        check = value !== '';
        break;
      case 'grammarExp':
      case 'vocabularyExp':
        check = value.split(" ").length >= 2;
        break;
      case 'grammarExpStudent':
      case 'grammarExpBetter':
      case 'vocabularyExpStudent':
      case 'vocabularyExpBetter':
        check = value.split(" ").length >= 3;
        break;
      case 'audio':
        check = value;
        break;
      default:
        break;
    }

    setValidation({
      ...validation,
      [state]: check
    });

    if(state !== 'audio') setDetail(state, value);
  }

  /**
   * 버튼 활성화 확인
   */
  useEffect(() => {
    if (validation) {
      let count = 0;
      for (let item of Object.keys(validation)) {
        if (validation[item] !== true) count++;
      }

      if (count > 0) setIsActive(false);
      else setIsActive(true);
    }
  }, [validation]);

  useEffect(() => {
    if(isOpen) {
      for(let item of Object.keys(validation)) {
        handleDetailState(item, detail[item]);
      }
    }
  }, [isOpen]);

  const handleAudio = (data) => {
    setAudioUrl(data);
  }

  return (
    <ReactModal
      className={'evaluationModal'}
      isOpen={isOpen}
      closeTimeoutMS={0}
      contentLabel={"Example Modal"}
      style={styled}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <h3>Receive lesson fees</h3>

      <div className={'formElement'}>
        <div className={'title'}>Grammar: accuracy in grammatical elements including word order, tense etc.</div>
        <SelectComponent onChange={handleDetailState} state={'grammarScore'} value={detail['grammarScore']} />
      </div>
      <div className={'formElement'}>
        <div className={'title'}>Vocabulary: use right words in certain situations</div>
        <SelectComponent onChange={handleDetailState} state={'vocabularyScore'} value={detail['vocabularyScore']} />
      </div>
      <div className={'formElement'}>
        <div className={'title'}>Listening: understand what tutors say</div>
        <SelectComponent onChange={handleDetailState} state={'listeningScore'} value={detail['listeningScore']} />
      </div>

      <h5>Needs improvement</h5>

      <div className={'formElement input'}>
        <div className={'title'}>Grammar<br/>Explanation(min. 2 words)</div>
        <div className={'example'}>ex) I noticed some errors on your grammar especially in subject verb agreement.</div>
        <InputComponent onChange={handleDetailState} state={'grammarExp'} value={detail['grammarExp']} />
      </div>
      <div className={'formElement input'}>
        <div className={'title'}>Student said(min. 3 words)</div>
        <div className={'example'}>ex) She love herself</div>
        <InputComponent onChange={handleDetailState} state={'grammarExpStudent'} value={detail['grammarExpStudent']} />
      </div>
      <div className={'formElement input'}>
        <div className={'title'}>Better to say(min. 3 words)</div>
        <div className={'example'}>ex) She loves herself</div>
        <InputComponent onChange={handleDetailState} state={'grammarExpBetter'} value={detail['grammarExpBetter']} />
      </div>
      <div className={'formElement input'}>
        <div className={'title'}>Vocabulary<br/>Explanation(min. 2 words)</div>
        <div className={'example'}>ex) You can simply use one word for a certain explanation.</div>
        <InputComponent onChange={handleDetailState} state={'vocabularyExp'} value={detail['vocabularyExp']} />
      </div>
      <div className={'formElement input'}>
        <div className={'title'}>Student said(min. 3 words)</div>
        <div className={'example'}>ex) Boil the beans in water to low-fire with a bit of salt.</div>
        <InputComponent onChange={handleDetailState} state={'vocabularyExpStudent'} value={detail['vocabularyExpStudent']} />
      </div>
      <div className={'formElement input'}>
        <div className={'title'}>Better to say(min. 3 words)</div>
        <div className={'example'}>ex) Simmer the beans in water with a bit of salt.</div>
        <InputComponent onChange={handleDetailState} state={'vocabularyExpBetter'} value={detail['vocabularyExpBetter']} />
      </div>

      <h5>Please red the "Better to say" sentences (and pronunciation if needed) twice and record them: Once slowly, once naturally.</h5>
      <div className={'formElement'}>
        <AudioComponent setAudioUrl={handleAudio} validation={validation} handleValidation={handleDetailState}/>
      </div>

      <button className={'button save ' + (isActive ? 'active' : 'noActive')} onClick={() => (isActive ? saveData(audioUrl) : '')}>Receive lesson fees</button>

    </ReactModal>
  );
};

export default EvaluationModal;
