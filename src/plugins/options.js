export const option1 = {
    series: [
        {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
                show: false
            },
            progress: {
                show: true,
                overlap: false,
                roundCap: false,
                clip: false,
                itemStyle: {
                    color: "red"
                }
            },
            axisLine: {
                lineStyle: {
                    width: 20
                }
            },
            splitLine: {
                show: false,
                distance: 0,
                length: 10
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                distance: 50
            },
            data:[
                {
                    value: ((1 / 170) * 100).toFixed(2),
                    detail: {
                        valueAnimation: false,
                        offsetCenter: ["0%", "0%"]
                    }
                }
            ],
            detail: {
                fontSize: 20,
                color: "red",
                formatter: "{value}%"
            }
        }
    ]
};