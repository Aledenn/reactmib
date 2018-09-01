import React, { Component } from "react";
import "./App.css";

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
    this.item = { react: "redux" };
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1
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
        {/* 推荐写法，把bind写在构造函数里 */}
        <button onClick={this.handleClick}>BT0</button>
        {/* 每次渲染APP bind都会执行一次 */}
        <button onClick={this.handleClick.bind(this)}>BT1</button>
        {/* 每次都会生成新的函数 */}
        <button onClick={() => this.handleClick()}>BT2</button>
        {/* 每次都会生成新的对象传递*/}
        <Demo style={{ color: "red" }} name={{ react: "redux" }} />
        {/* 这个不会了呢，把item放在render或者constructor中*/}
        <Demo name={item} />
        <Demo name={this.item} />
        {/* 传必要数据 */}
        <Demo title={this.state.title} />
      </div>
    );
  }
}

class Demo extends Component {
  render() {
    return <h2>I am Demo</h2>;
  }
}
export default App;
