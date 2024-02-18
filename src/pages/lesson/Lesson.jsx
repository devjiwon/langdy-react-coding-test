import React, {useEffect, useState} from "react"

// CSS
import './index.scss';

// Component
import EvaluationModal from '../component/EvaluationModal';

const Lesson = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState({
    grammarScore: '',
    vocabularyScore: '',
    listeningScore: '',
    grammarExp: '',
    grammarExpStudent: '',
    grammarExpBetter: '',
    vocabularyExp: '',
    vocabularyExpStudent: '',
    vocabularyExpBetter: '',
  });

  useEffect(() => {
    if (isOpen) {
      let tempData = JSON.parse(localStorage.getItem('tempData'));

      if (tempData) {
        setDetail(tempData);
      }
    }
  }, [isOpen]);

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    localStorage.setItem('tempData', JSON.stringify(detail));

    setIsOpen(false);
  }

  /**
   * detail state 변경
   */
  const handleDetailState = (state, value) => {
    let tempState = JSON.parse(JSON.stringify(detail));
    tempState[state] = value;
    setDetail(tempState);
  }

  /**
   * 저장 버튼 클릭 이벤트
   */
  const saveData = (audioUrl) => {
    console.log(detail)

    const url = URL.createObjectURL(audioUrl);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = '녹음파일';
    a.click();
    window.URL.revokeObjectURL(url);

    localStorage.removeItem('tempData');
    setDetail({
      grammarScore: '',
      vocabularyScore: '',
      listeningScore: '',
      grammarExp: '',
      grammarExpStudent: '',
      grammarExpBetter: '',
      vocabularyExp: '',
      vocabularyExpStudent: '',
      vocabularyExpBetter: '',
    });
    setIsOpen(false);
    alert('저장되었습니다.');
  }

  return (
    <React.Fragment>
      <EvaluationModal isOpen={isOpen} closeModal={closeModal} detail={detail} setDetail={handleDetailState}
                       saveData={saveData}/>
      <button onClick={() => setIsOpen(!isOpen)}>실력 평가하기</button>
    </React.Fragment>
  );
};

export default Lesson;
