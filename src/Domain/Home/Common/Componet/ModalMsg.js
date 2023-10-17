import React, {useEffect, useRef} from 'react';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ModalMsg(props) {
  const {title, msg, btnTxt, btnCss, btnEvent, show, setShow} = props;

  const params = useParams();
  const paramSe2 = params?.se2;
  const navigate = useNavigate();

  const msgButtonRef = useRef([]);

  const btnClick = (f) => {
    // console.log(f);
    // console.log(typeof f)
    if (f === undefined) {
      setShow(false);
    } else if (typeof f === 'function') {
      f();
    } else if (typeof f === 'string') {
      switch (f) {
      case 'sample':
        console.log('리덕스 샘플이벤트입니다.');
        setShow(false);
        break;
      case 'close':
        setShow(false);
        break;
      case 'goKeyword':
        navigate('/discovery/' + paramSe2);
        setShow(false);
        break;
      default: break;
      }
    }
  };

  useEffect(() => {
    const timeObj = setTimeout(() => {
      msgButtonRef?.current?.[0]?.focus();  
    }, 300);
    
    return () => {
      clearTimeout(timeObj);
    };
  }, [btnTxt]);

  return (
    <TEModal show={show} setShow={setShow}>
      <TEModalDialog>
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <p className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              <strong>{title ?? '알림'}</strong>
            </p>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setShow(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>
          {/* <!--Modal body--> */}
          <TEModalBody className='whitespace-pre-line'>{msg ?? ''}</TEModalBody>
          <TEModalFooter>
            {btnTxt?.map((e,i) => {
              return <TERipple key={i} rippleColor="light">
                <button
                  type="button"
                  className={btnCss?.[i]}
                  onClick={() => btnClick(btnEvent?.[i])}
                  ref={(e) => msgButtonRef.current[i] = e}
                >
                  {e}
                </button>
              </TERipple>;
            })}
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}
