// 约定式路由
import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import dayjs from "dayjs";
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

export default function Hello(props) {
  const [time, setTime] = useState(""); // 倒计时

  let timer = null;

  useEffect(() => {
    countDown(dayjs().add(10, "s").format("YYYY-MM-DD HH:mm:ss"));
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 倒计时
  const countDown = (deadLine) => {
    if (typeof deadLine !== "string") return;
    const deadLineMoment = dayjs(deadLine);
    const deadLineTime = deadLineMoment.diff(dayjs());
    let durationTime = dayjs.duration(deadLineTime);
    if (deadLineTime < 0) {
      setTime("00:00:00");
      clearInterval(timer);
    } else {
      setTime(
        `${Math.floor(durationTime.asHours())
          ?.toString()
          ?.padStart("2", "0")}:${durationTime
          .minutes()
          ?.toString()
          ?.padStart("2", "0")}:${durationTime
          .seconds()
          ?.toString()
          ?.padStart("2", "0")}`
      );
    }
    // 延迟了一秒
    timer = setInterval(() => {
      // 结束的时间
      const deadLineMoment = dayjs(deadLine);
      // 时间差
      const deadLineTime = deadLineMoment.diff(dayjs());
      // console.log("deadLineTime", deadLineTime);
      // 时长
      let durationTime = dayjs.duration(deadLineTime);
      // 设置
      if (deadLineTime < 0) {
        setTime("00:00:00");
        clearInterval(timer);
      } else {
        setTime(
          `${Math.floor(durationTime.asHours())
            ?.toString()
            ?.padStart("2", "0")}:${durationTime
            .minutes()
            ?.toString()
            ?.padStart("2", "0")}:${durationTime
            .seconds()
            ?.toString()
            ?.padStart("2", "0")}`
        );
      }
    }, 1000);
  };

  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "20px",
        }}
      >
        {time === "00:00:00" ? <p>猜猜我是谁？</p> : <span>{time}</span>}
      </div>
    </Layout>
  );
}
