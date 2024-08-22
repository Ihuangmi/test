/** @name 生成裁剪器 **/
function createCropper() {
  mask.style.display = "block";
  cropper.style.display = "block";
  setDimention(initDimention);

  const moveElement = document.querySelector(".cropper-move");

  // 四条边框线、八个点、移动元素moveElement
  const elements = [
    moveElement,
    ...document.querySelectorAll(".cropper-line"),
    ...document.querySelectorAll(".cropper-point"),
  ];
  elements.forEach((ele) => {
    // 添加鼠标按下事件
    ele.addEventListener("mousedown", (e) => {
      dragging = true;
      const { clientX, clientY } = e;
      startPoint[0] = clientX;
      startPoint[1] = clientY;
      currentElement = ele;
      currentDimention = initDimention;
      startDimention = [...initDimention];

      // 当是移动元素时，改变direction变量
      if (ele === moveElement) {
        direction[TOP] = 1;
        direction[BOTTOM] = -1;
        direction[LEFT] = 1;
        direction[RIGHT] = -1;
        moving = true;
      }
      const action = ele.dataset.action;
      switch (action) {
        // 四条线
        case "top":
          direction[TOP] = 1;
          direction[BOTTOM] = 0;
          break;
        case "right":
          direction[LEFT] = 0;
          direction[RIGHT] = -1;
          break;
        case "bottom":
          direction[TOP] = 0;
          direction[BOTTOM] = -1;
          break;
        case "left":
          direction[LEFT] = 1;
          direction[RIGHT] = 0;
          break;
        // 四个端点
        case "top-right":
          direction[TOP] = 1;
          direction[RIGHT] = -1;
          break;
        case "top-left":
          direction[TOP] = 1;
          direction[LEFT] = 1;
          break;
        case "bottom-left":
          direction[BOTTOM] = -1;
          direction[LEFT] = 1;
          break;
        case "bottom-right":
          direction[BOTTOM] = -1;
          direction[RIGHT] = -1;
          break;
      }
    });
  });
}
// 鼠标按键抬起事件
document.body.addEventListener("mouseup", () => {
  dragging = false;
  moving = false;
  direction[TOP] = 0;
  direction[BOTTOM] = 0;
  direction[LEFT] = 0;
  direction[RIGHT] = 0;
});
