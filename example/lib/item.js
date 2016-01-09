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

var Item = function (_Component) {
  _inherits(Item, _Component);

  function Item(props) {
    var _ret;

    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Item).call(this, props));

    _this.timerIds = [null, null, null];
    _this.state = { sequence: 0 };
    var _this$props = _this.props;
    var x = _this$props.x;
    var y = _this$props.y;
    var direction = _this$props.direction;
    var distance = _this$props.distance;

    if (direction !== 'vertical' && direction !== 'horizontal') return _ret = console.error("not support this direction!!"), _possibleConstructorReturn(_this, _ret);
    _this.params = direction === 'vertical' ? [{
      scaleX: (0, _reactMotion.spring)(0, [1500, 100]),
      scaleY: (0, _reactMotion.spring)(0, [1500, 100]),
      x: x,
      y: (0, _reactMotion.spring)(y, [1500, 50])
    }, {
      scaleX: (0, _reactMotion.spring)(0.7, [1500, 150]),
      scaleY: (0, _reactMotion.spring)(1.6, [1500, 150]),
      x: x,
      y: (0, _reactMotion.spring)(y + distance, [1500, 100])
    }, {
      scaleX: (0, _reactMotion.spring)(1, [1500, 18]),
      scaleY: (0, _reactMotion.spring)(1, [1500, 18]),
      x: x,
      y: (0, _reactMotion.spring)(y + distance, [1500, 100])
    }] : [{
      scaleX: (0, _reactMotion.spring)(0, [1500, 100]),
      scaleY: (0, _reactMotion.spring)(0, [1500, 100]),
      x: (0, _reactMotion.spring)(x, [1500, 50]),
      y: y
    }, {
      scaleX: (0, _reactMotion.spring)(1.6, [1500, 150]),
      scaleY: (0, _reactMotion.spring)(0.7, [1500, 150]),
      x: (0, _reactMotion.spring)(x + distance, [1500, 100]),
      y: y
    }, {
      scaleX: (0, _reactMotion.spring)(1, [1500, 18]),
      scaleY: (0, _reactMotion.spring)(1, [1500, 18]),
      x: (0, _reactMotion.spring)(x + distance, [1500, 100]),
      y: y
    }];
    return _this;
  }

  _createClass(Item, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.timerIds[1] = setTimeout(function () {
        _this2.setState({ sequence: 1 });
        _this2.timerIds[1] = null;
      }, 60);

      this.timerIds[2] = setTimeout(function () {
        _this2.setState({ sequence: 2 });
        _this2.timerIds[2] = null;
        if (_this2.props.onOpenAnimationEnd) _this2.props.onOpenAnimationEnd(_this2.props.name);
      }, 80);
    }
  }, {
    key: 'reverse',
    value: function reverse() {
      var _this3 = this;

      clearTimeout(this.timerIds[1]);
      clearTimeout(this.timerIds[2]);
      this.timerIds[0] = setTimeout(function () {
        if (_this3.props.onCloseAnimationEnd) _this3.props.onCloseAnimationEnd(_this3.props.name);
        _this3.timerIds[0] = null;
      }, 100);
      this.setState({ sequence: 0 });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var customStyle = _props.customStyle;
      var onClick = _props.onClick;
      var customClass = _props.customClass;
      var children = _props.children;

      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: this.params[this.state.sequence] },
        function (_ref) {
          var scaleX = _ref.scaleX;
          var scaleY = _ref.scaleY;
          var x = _ref.x;
          var y = _ref.y;
          return _react2.default.createElement(
            'div',
            { className: customClass,
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

  return Item;
}(_react.Component);

exports.default = Item;

Item.propTypes = {
  x: _react.PropTypes.number.isRequired,
  y: _react.PropTypes.number.isRequired,
  direction: _react.PropTypes.string.isRequired,
  distance: _react.PropTypes.number.isRequired,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  onOpenAnimationEnd: _react.PropTypes.func,
  onCloseAnimationEnd: _react.PropTypes.func,
  customStyle: _react.PropTypes.object,
  customClass: _react.PropTypes.string
};