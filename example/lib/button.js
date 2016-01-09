'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Object = require('react/lib/Object.assign');

var _Object2 = _interopRequireDefault(_Object);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this, props));

    _this.state = { sequence: 0 };
    _this.params = [{
      scaleX: (0, _reactMotion.spring)(1, [1500, 10]),
      scaleY: (0, _reactMotion.spring)(1, [1500, 10])
    }, {
      scaleX: (0, _reactMotion.spring)(0.6, [1500, 50]),
      scaleY: (0, _reactMotion.spring)(0.6, [1500, 50])
    }, {
      scaleX: (0, _reactMotion.spring)(1, [1500, 10]),
      scaleY: (0, _reactMotion.spring)(1, [1500, 10])
    }];
    return _this;
  }

  _createClass(Button, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.setState({ sequence: 1 });
      }, 100);
      setTimeout(function () {
        return _this2.setState({ sequence: 2 });
      }, 150);
    }
  }, {
    key: 'reverse',
    value: function reverse() {
      var _this3 = this;

      this.setState({ sequence: 1 });
      setTimeout(function () {
        return _this3.setState({ sequence: 0 });
      }, 50);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props;
      var x = _props.x;
      var y = _props.y;
      var width = _props.width;
      var height = _props.height;
      var customStyle = _props.customStyle;
      var onClick = _props.onClick;
      var customClass = _props.customClass;

      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: this.params[this.state.sequence] },
        function (_ref) {
          var scaleX = _ref.scaleX;
          var scaleY = _ref.scaleY;
          return _react2.default.createElement(
            'div',
            {
              onClick: onClick,
              className: customClass,
              style: (0, _Object2.default)({}, customStyle, {
                transform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')',
                WebkitTransform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')',
                position: 'absolute',
                width: width,
                height: height
              }) },
            _this4.props.children
          );
        }
      );
    }
  }]);

  return Button;
}(_react.Component);

exports.default = Button;

Button.propTypes = {
  x: _react.PropTypes.number.isRequired,
  y: _react.PropTypes.number.isRequired,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  customStyle: _react.PropTypes.object,
  customClass: _react.PropTypes.string
};