'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
declare class TimeAgo extends Component<DefaultProps, Props, void> {
  static displayName: string;
  timeoutId: ?number;
  isStillMounted: boolean;
  tick: TickFn;
}
*/

var TimeAgo = function (_Component) {
  _inherits(TimeAgo, _Component);

  function TimeAgo() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TimeAgo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimeAgo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.isStillMounted = false, _this.tick = function (refresh) {
      if (!_this.isStillMounted || !_this.props.live) {
        return;
      }

      var period = 1000;
      var then = new Date(_this.props.date).valueOf();
      var now = Date.now();
      var seconds = Math.round(Math.abs(now - then) / 1000);

      if (seconds < 60) {
        period = 1000;
      } else if (seconds < 60 * 60) {
        period = 1000 * 60;
      } else if (seconds < 60 * 60 * 24) {
        period = 1000 * 60 * 60;
      } else {
        period = 0;
      }

      period = Math.min(Math.max(period, _this.props.minPeriod * 1000), _this.props.maxPeriod * 1000);

      if (period != null) {
        _this.timeoutId = setTimeout(_this.tick, period);
      }

      if (!refresh) {
        _this.forceUpdate();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimeAgo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.isStillMounted = true;
      if (this.props.live) {
        this.tick(true);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps) {
      if (this.props.live !== lastProps.live || this.props.date !== lastProps.date) {
        if (!this.props.live && this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        this.tick();
      }
    }
  }, {
    key: 'componentWIllUnmount',
    value: function componentWIllUnmount() {
      this.isStillMounted = false;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var then = new Date(this.props.date).valueOf();
      var now = Date.now();
      var seconds = Math.round(Math.abs(now - then) / 1000);

      var suffix = then < now ? 'ago' : 'from now';

      var value = void 0,
          unit = void 0;

      if (seconds < 60) {
        value = Math.round(seconds);
        unit = 'second';
      } else if (seconds < 60 * 60) {
        value = Math.round(seconds / 60);
        unit = 'minute';
      } else if (seconds < 60 * 60 * 24) {
        value = Math.round(seconds / (60 * 60));
        unit = 'hour';
      } else if (seconds < 60 * 60 * 24 * 7) {
        value = Math.round(seconds / (60 * 60 * 24));
        unit = 'day';
      } else if (seconds < 60 * 60 * 24 * 30) {
        value = Math.round(seconds / (60 * 60 * 24 * 7));
        unit = 'week';
      } else if (seconds < 60 * 60 * 24 * 365) {
        value = Math.round(seconds / (60 * 60 * 24 * 30));
        unit = 'month';
      } else {
        value = Math.round(seconds / (60 * 60 * 24 * 365));
        unit = 'year';
      }

      var props = Object.assign({}, this.props);

      props.title = props.title || typeof props.date === 'string' ? props.date : new Date(props.date).toISOString().substr(0, 16).replace('T', ' ');

      if (props.component === 'time') {
        props.dateTime = new Date(props.date).toISOString();
      }

      delete props.date;
      delete props.formatter;
      delete props.component;

      var Komponent = this.props.component;
      return _react2.default.createElement(
        Komponent,
        props,
        this.props.formatter(value, unit, suffix, then)
      );
    }
  }]);

  return TimeAgo;
}(_react.Component);

TimeAgo.displayName = 'TimeAgo';
TimeAgo.propTypes = {
  /** If the component should update itself over time */
  live: _react.PropTypes.bool.isRequired,
  /** minimum amount of time in seceonds between re-renders */
  minPeriod: _react.PropTypes.number.isRequired,
  /** Maximum time between re-renders in seconds. The component should update at least once every `x` seconds */
  maxPeriod: _react.PropTypes.number.isRequired,
  /** The container to render the string into. You could use a string like `span` or a custom component */
  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,
  /** A function to decide how to format the date.
   * If you use this, react-timeago is basically acting like a glorified setInterval for you.
   */
  formatter: _react.PropTypes.func.isRequired,
  /** The Date to display. An actual Date object or something that can be fed to new Date */
  date: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.instanceOf(Date)]).isRequired
};
TimeAgo.defaultProps = {
  live: true,
  component: 'time',
  minPeriod: 0,
  maxPeriod: Infinity,
  formatter: function formatter(value, unit, suffix) {
    if (value !== 1) {
      unit += 's';
    }
    return value + ' ' + unit + ' ' + suffix;
  }
};
exports.default = TimeAgo;