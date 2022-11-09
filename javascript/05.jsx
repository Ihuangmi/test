import React, {useEffect, useRef} from "react";

export default function App(props) {

  const ref = useRef(null)
  const ref1 = useRef(null)

  useEffect(() => {
    const div = document.querySelector("div")
    const button = document.querySelector("button")

    div.addEventListener("click", () => console.log("原生：div元素"))
    button.addEventListener("click", () => console.log("原生：button元素"))
    document.addEventListener("click", () => console.log("原生：document元素"))
  }, [])

  return (
    <div onClick={() => console.log('React：div元素')}>
      <button
        onClick={() => console.log('React：按钮元素')}
      >
        执行顺序
      </button>
    </div>
  );
}