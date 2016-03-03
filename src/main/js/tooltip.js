var Tooltip = React.createClass({
  getInitialState: function() {
    return {
      content: null,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        visibility: 'none',
        width: '300px',
        height: '250px'
      }
    };
  },

  componentDidMount: function() {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  },

  componentDidUpdate: function() {
    this._renderLayer();
  },

  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.container);
    document.body.removeChild(this.container);
  },

  /**
   * Generates an adjusted position value if the current position + the dimension
   * of the element goes over the max value
   * @method checkPosition
   * @param position - The css position value of the tooltip
   * @param dimension - The dimension of the element relative to the position
   * @param max - The limit to check against
   * @return {Integer} - Returns an adjusted position value within the viewport
   */
  getNewPosition: function(position, dimension, max) {
    if (!position || !dimension || !max) {
      return position;
    }
    position = parseInt(position);
    dimension = parseInt(dimension);
    max = parseInt(max);

    if (checkPosition(position, dimension, max)) {
      if (isUnderLimit(position)) {
        return 0;
      }

      if (isOverLimit(position, dimension, max)) {
        var total = position + dimension;
        var difference = max - total;
        return position + difference;
      }
    }
    return position;
  },

  setBounds: function(element) {
    this.bounds = element.getBoundingClientRect();
  },

  show: function(x, y, content) {
    var style = _.clone(this.state.style);
    // 1. Adjust to carret center

    // 2. Adjust against bounds
    console.log(this.bounds)
    var newY = this.getNewPosition(y, this.state.style.height, (this.bounds.height+this.bounds.top));
    var newX = this.getNewPosition(x, this.state.style.width, (this.bounds.width+this.bounds.left));

    // 3. Adjust caret position

    console.log(y, newY)
    var newStyle = {
      top: newY + 'px',
      left: newX + 'px',
      visible: 'visible'
    }
    _.merge(style, newStyle);
    this.setState({ style: style, content: content });
  },

  _renderLayer: function() {
    var props = {
      className: 'tooltip__content'
    };
    var content = React.createElement('div', props, this.state.content);

    var props = {
      className: 'tooltip',
      style: this.state.style
    };
    var tooltip = React.createElement('div', props, content);

    ReactDOM.render(tooltip, this.container);
  },

  render: function() {
    return React.DOM.div(this.props);
  }
});

Tooltip.create = function() {
  return ReactDOM.render(
    React.createElement(Tooltip),
    document.createElement('div')
  );
};

var TooltipUtils = {};



/**
 * Checks the position value to see if it is under/over the viewport
 * @method checkPosition
 * @param position - The position css value of the tooltip to check
 * @param dimension - The dimension value of the element with respect to the position to check
 * @param max - The total available space
 * @return {Boolean} - Returns true if the tooltip's 'left' value is out of bounds
 */
function checkPosition(position, dimension, max) {
  return (isUnderLimit(position) || isOverLimit(position, dimension, max));
}

/**
 * Generic helper function that checks if the value is negative
 * @method isUnderLimit - Is the position value under zero
 * @param position - The position css value
 * @return {Boolean} - Returns true if the value is negative
 */
function isUnderLimit(position) {
  return (position < 0);
}

/**
 * Generic helper function that checks if the value is over the viewport
 * @method isOverLimit
 * @param position - The position css value
 * @param dimension - The dimension of the element
 * @param max - The maximum avaliable space of the viewport
 * @return {Boolean} - Returns true if the css position + the width is greater than the max
 */
function isOverLimit(position, dimension, max) {
  return ((position + dimension) > max);
}
