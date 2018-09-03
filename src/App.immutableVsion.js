import React, { Component } from "react";
import "./App.css";
import { Map, is } from "immutable";

// immutable优点
// 1. 减少内存使用
// 2. 并发安全
// 3. 降级项目复杂度
// 4. 便于比较复杂数据，定制shouldComponentUpdate方便
// 5. 时空旅行功能方便
// 6. 函数式变成
// 缺点:
// 1. 学习成本
// 2. 库的大小
// 3. 对先有项目入侵严重
// 新项目使用，老项目评估再用
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Map({
        num: 1,
        title: "lee"
      })
    };
    console.log("构造函数执行");
    this.handleClick = this.handleClick.bind(this);
    this.handleTittle = this.handleTittle.bind(this);
  }
  handleClick() {
    let count = this.state.data.set("num", this.state.data.get("num") + 29);
    console.log(count);
    this.setState(({ data }) => ({
      data: data.set("num", data.get("num") + 1)
    }));
    console.log(this.state.data.get("num"));
  }

  handleTittle() {
    let a = this.state.data.get("title") + "!";
    console.log(a);
    this.setState(({ data }) => ({
      data: data.set("title", a)
    }));
    console.log(this.state.data);
  }

  render() {
    console.log("render执行中");
    return (
      <div>
        <h2>
          App{this.state.data.get("num")}
        </h2>
        <button onClick={this.handleClick}>BtnNum</button>
        <button onClick={this.handleTittle}>BtnTittle</button>
        <Demo title={this.state.data.get("title")} />
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
    // return true;
    console.log(nextProps);
    console.log(this.props);
    return !is(nextProps, this.props);
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
