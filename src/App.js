import React, { Component } from "react";
import "./App.css";

let obj = { name: 1, other: { title: "lee" } };
let obj1 = { name: 1, other: { title: "lee" } };

// 浅比较
console.log(obj == obj1);

// 递归深比较，复杂度高
// react建议，只做浅层比较，不考虑其为对象
function compareObj(obj1, obj2) {
  if (obj1 == obj2) {
    return true;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  //   for (let k in obj1) {
  //     if (typeof obj1[k] == "object") {
  //       return compareObj(obj1[k], obj2[k]);
  //     } else {
  //       if (obj1[k] !== obj2[k]) {
  //         return false;
  //       }
  //     }
  //   }
  for (let k in obj1) {
    if (obj1[k] !== obj2[k]) {
      return false;
    }
  }
  return true;
}
// 深拷贝

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      title: "lee",
      age: 22
    };
    console.log("构造函数执行");
    this.handleClick = this.handleClick.bind(this);
    this.handleTittle = this.handleTittle.bind(this);
    this.item = { react: "redux" };
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1
    });
  }

  handleTittle() {
    this.setState({
      title: this.state.title + "!"
    });
  }

  render() {
    console.log("render执行中");
    const item = { react: "redux" };
    return (
      <div>
        <h2>
          App {this.state.num}
        </h2>
        <button onClick={this.handleClick}>BtnNum</button>
        <button onClick={this.handleTittle}>BtnTittle</button>
        <Demo title={this.state.title} />
      </div>
    );
  }
}

// 使用PureComponent代替,根据值来渲染的时候使用，性能很好
// class Demo extends React.PureComponent
class Demo extends Component {
  //   决定是否要渲染
  // 比较两个对象
  shouldComponentUpdate(nextProps, nextState) {
    //   深递归，复杂度太高，不可接受

    if (compareObj(nextProps, this.props)) {
      return false;
    }
    return true;
  }
  render() {
    console.log("demo render执行中");
    return (
      <h2>
        I am Demo,{this.props.title}
      </h2>
    );
  }
}
export default App;
