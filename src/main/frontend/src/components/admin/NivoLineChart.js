import React from "react";
import { ResponsiveLine } from "@nivo/line";

const NivoLineChart = ({ data }) => (
  <div style={{ width: "100%", height: "300px" }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      colors={["green"]}
      yScale={{
        type: "linear",
        min: "0",
        max: "5",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.0r"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "날짜",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 5,
        legend: "신규 가입",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      enablePointLabel={true}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableArea={true}
      useMesh={true}
      legends={[
        {
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: -48,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default NivoLineChart;
