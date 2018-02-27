import React from "react";
import Moment from "react-moment";

const DateFormat = (props) => {
  return <Moment format="YY/MM/DD hh:mm">{props.time}</Moment>
}

export default DateFormat;
