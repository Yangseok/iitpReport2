import React from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

export default function ModalMsg(props) {
  const {title, msg, btnTxt, btnCss, btnEvent, show, setShow} = props;
  const btnClick = (f) => {
    // console.log(f)
    // console.log(typeof f)
    if (f === undefined) setShow(false);
    else if (typeof f === 'function') f();
    else if (typeof f === 'string') {
      switch (f) {
        case "sample": console.log("리덕스 샘플이벤트입니다."); setShow(false); break;
        default: break;
      }
    };
  }
  return (
    <TEModal show={show} setShow={setShow}>
      <TEModalDialog>
        <TEModalContent>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              {title ?? "알림"}
            </h5>
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
          <TEModalBody>{msg ?? ""}</TEModalBody>
          <TEModalFooter>
            {btnTxt?.map((e,i) => {
              return <TERipple key={i} rippleColor="light">
                <button
                  type="button"
                  className={btnCss?.[i]}
                  onClick={() => btnClick(btnEvent?.[i])}
                >
                  {e}
                </button>
              </TERipple>
            })}
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}
