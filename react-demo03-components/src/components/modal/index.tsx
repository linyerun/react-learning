import "./index.css";
import { createPortal } from "react-dom";

const Modal = () => {
  return createPortal(
    <div className="modal">
      <div className="modal-header">
        <div className="modal-title">标题</div>
      </div>
      <div className="modal-content">
        <h1>Modal</h1>
      </div>
      <div className="modal-footer">
        <button className="modal-close-button">关闭</button>
        <button className="modal-confirm-button">确定</button>
      </div>
    </div>,
    document.body,
  );
};

/**
 * createPortal的作用: 将我们的模板渲染至指定DOM节点，不受父级style、v-show等属性影响
 * 参数:
 *    children：要渲染的组件
 *    domNode：要渲染到的DOM位置
 *    key?：可选，用于唯一标识要渲染的组件
 * 返回一个React元素(即jsx)，这个元素可以被React渲染到DOM的任意位置
 * */

export default Modal;
