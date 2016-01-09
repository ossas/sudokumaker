'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props));

    _this.state = { itemNumber: 1, status: "idle" };
    return _this;
  }

  _createClass(Menu, [{
    key: 'open',
    value: function open() {
      if (this.state.action === "open") return;
      this._open();
    }
  }, {
    key: '_open',
    value: function _open() {
      this.setState({ action: "open" });
      this.refs.button.start();
      this.refs["item" + this.state.itemNumber].start();
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.state.action !== "open") return;
      this._close();
    }
  }, {
    key: '_close',
    value: function _close() {
      this.setState({ action: "close" });
      this.refs.button.reverse();
      for (var i = this.state.itemNumber - 1; i > 0; i -= 1) {
        this.refs["item" + i].reverse();
      }
    }
  }, {
    key: '_onOpenEnd',
    value: function _onOpenEnd(name) {
      if (this.state.action !== "open") return;
      if (this.state.itemNumber < this.props.children.length) {
        this.refs["item" + this.state.itemNumber].start();
        return this.setState({ itemNumber: this.state.itemNumber + 1 });
      }
      if (name === 'item' + (this.props.children.length - 1)) if (this.props.onOpen) this.props.onOpen(this.props.name);
    }
  }, {
    key: '_onCloseEnd',
    value: function _onCloseEnd(name) {
      if (this.state.action === "open") return;
      if (this.state.itemNumber > 1) {
        if (name === 'item1') if (this.props.onClose) this.props.onClose(this.props.name);
        this.setState({ itemNumber: this.state.itemNumber - 1 });
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      if (this.state.action === "open") this._close();else this._open();
    }
  }, {
    key: '_getItems',
    value: function _getItems() {
      var _props = this.props;
      var x = _props.x;
      var y = _props.y;
      var width = _props.width;
      var height = _props.height;
      var direction = _props.direction;
      var distance = _props.distance;
      var customStyle = _props.customStyle;

      var button = undefined;
      var children = undefined;

      var _props$children = _toArray(this.props.children);

      button = _props$children[0];
      children = _props$children.slice(1);

      var items = [_react2.default.createElement(
        _button2.default,
        {
          ref: 'button',
          onClick: this._onClick.bind(this),
          customStyle: customStyle,
          width: width,
          height: height,
          x: x,
          y: y,
          key: "button" },
        button.props.children
      )];
      for (var i = 0; i < this.state.itemNumber && i < children.length; i += 1) {
        items.push(_react2.default.createElement(
          _item2.default,
          {
            direction: this.props.direction,
            key: i,
            ref: 'item' + (i + 1),
            name: 'item' + (i + 1),
            onOpenAnimationEnd: this._onOpenEnd.bind(this),
            onCloseAnimationEnd: this._onCloseEnd.bind(this),
            customStyle: customStyle,
            width: width,
            height: height,
            distance: distance,
            x: direction === "horizontal" ? i * distance + x : x,
            y: direction === "vertical" ? i * distance + y : y },
          children[i].props.children
        ));
      }
      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this._getItems()
      );
    }
  }]);

  return Menu;
}(_react.Component);

exports.default = Menu;

Menu.propTypes = {
  x: _react.PropTypes.number.isRequired,
  y: _react.PropTypes.number.isRequired,
  direction: _react.PropTypes.string.isRequired,
  distance: _react.PropTypes.number.isRequired,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  onClick: _react.PropTypes.func,
  onAnimationEnd: _react.PropTypes.func,
  onCloseAnimationEnd: _react.PropTypes.func,
  customStyle: _react.PropTypes.object,
  customClass: _react.PropTypes.string
};