import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

export default function CountDown(props) {
  const [current, setTime] = useState("0 天 0 时 0 分 0 秒"); // 展示数据
  const [isArrived, setIsArrived] = useState(false); // 倒计时是否结束
  let { deadLine = "", callback } = props; // 结束时间与结束的回调

  const timerID = useRef();

  deadLine = dayjs(deadLine);

  const deadLineTime = deadLine.diff(dayjs());

  let durationTime = dayjs.duration(deadLineTime);

  useEffect(() => {
    timerID.current = setInterval(() => {
      const arriveTime = `${durationTime.months()} 月 ${durationTime.days()} 天 ${durationTime.hours()} 时 ${durationTime.minutes()} 分 ${durationTime.seconds()} 秒`;
      if (deadLineTime > 0) {
        durationTime = dayjs.duration(deadLine.diff(dayjs()));
        setTime(arriveTime);
      } else {
        setIsArrived(true);
      }
    }, 1000);
    return () => {
      clearInterval(timerID.current);
    };
  }, []);

  useEffect(() => {
    if (isArrived) {
      clearInterval(timerID.current);
      typeof callback === "function" && callback();
    }
  }, [isArrived]);

  return <div>{current}</div>;
}
