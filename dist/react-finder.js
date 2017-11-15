"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _finderjs = require("finderjs");

var Finder = _interopRequireWildcard(_finderjs);

var _v = require("uuid/v4");

var uuidv4 = _interopRequireWildcard(_v);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
    className: "",
    createItemContent: undefined,
    data: [],
    onItemSelected: null,
    onLeafSelected: null,
    onColumnCreated: null
};

var ReactFinder = function (_Component) {
    _inherits(ReactFinder, _Component);

    function ReactFinder(props) {
        _classCallCheck(this, ReactFinder);

        var _this = _possibleConstructorReturn(this, (ReactFinder.__proto__ || Object.getPrototypeOf(ReactFinder)).call(this, props));

        _this._componentId = uuidv4.default();
        _this._finder = undefined;

        _this.createColumn = _this.createColumn.bind(_this);
        _this.navigate = _this.navigate.bind(_this);
        _this._initializeFinder = _this._initializeFinder.bind(_this);
        _this._onItemSelected = _this._onItemSelected.bind(_this);
        _this._onLeafSelected = _this._onLeafSelected.bind(_this);
        _this._onCreateColumn = _this._onCreateColumn.bind(_this);
        return _this;
    }

    _createClass(ReactFinder, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._initializeFinder();
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps) {
            if (nextProps.data !== this.props.data) {
                this._componentId = uuidv4.default();
                this._finder = undefined;
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            this._initializeFinder();
        }
    }, {
        key: "render",
        value: function render() {
            var className = "c-finder ";

            if (this.props.className != undefined) {
                className += this.props.className;
            }

            return _react2.default.createElement("div", {
                className: className,
                dangerouslySetInnerHTML: {
                    __html: "<div id=\"" + this._componentId + "\"></div>"
                }
            });
        }

        // --------------
        // Public Methods
        // --------------

    }, {
        key: "createColumn",
        value: function createColumn(item) {
            if (this._finder == undefined || item == undefined) {
                return;
            }

            this._finder.emit('create-column', item);
        }
    }, {
        key: "navigate",
        value: function navigate(direction) {
            if (this._finder == undefined || direction == undefined || direction.length === 0) {
                return;
            }

            this._finder.emit('navigate', { direction: direction });
        }

        // ---------------
        // Private Methods
        // ---------------

    }, {
        key: "_initializeFinder",
        value: function _initializeFinder() {
            if (this._finder == undefined && this.props.data != undefined) {
                var component = document.getElementById(this._componentId);
                if (component == undefined) {
                    return;
                }
                this._finder = Finder.default(component, this.props.data, {
                    className: this.props.className,
                    createItemContent: this.props.createItemContent
                });
                this._finder.on('leaf-selected', this._onLeafSelected);
                this._finder.on('item-selected', this._onItemSelected);
                this._finder.on('column-created', this._onCreateColumn);
            }
        }

        // --------------
        // Event Handlers
        // --------------

    }, {
        key: "_onItemSelected",
        value: function _onItemSelected(item) {
            if (this.props.onItemSelected != undefined && item != undefined && item.item != undefined && item.item._item != undefined) {
                this.props.onItemSelected(item.item._item, item);
            }
        }
    }, {
        key: "_onLeafSelected",
        value: function _onLeafSelected(item) {
            if (this.props.onLeafSelected != undefined) {
                this.props.onLeafSelected(item);
            }
        }
    }, {
        key: "_onCreateColumn",
        value: function _onCreateColumn(item) {
            if (this.props.onColumnCreated != undefined) {
                this.props.onColumnCreated(item);
            }
        }
    }]);

    return ReactFinder;
}(_react.Component);

;

ReactFinder.defaultProps = defaultProps;
exports.default = ReactFinder;