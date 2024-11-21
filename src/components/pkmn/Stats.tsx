"use client";

import { Stat, StatName } from "@/lib/pkmn.types";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from "recharts";
import { statArrayToChartable } from "@/lib/pkmn.utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DiagonalTick from "./DiagonalTick";

export const StatList: StatName[] = ["hp", "attack", "defense", "special attack", "special defense", "speed"];

const chartConfig = {
    hp: {
        label: "HP",
        color: "#3366ff",
    },
    attack: {
        label: "Attack",
        color: "#3366ff",
    },
    defense: {
        label: "Defense",
        color: "#3366ff",
    },
    "special attack": {
        label: "Sp. Attack",
        color: "#3366ff",
    },
    "special defense": {
        label: "Sp. Defense",
        color: "#3366ff",
    },
    speed: {
        label: "Speed",
        color: "#3366ff",
    },
} satisfies ChartConfig;

interface StatsProps {
    data: Stat[];
}

const getPath = (x: number, y: number, width: number, height: number) =>
    `M${x},${y} 
     H${x + width} 
     V${y + height} 
     H${x} 
     Z`;

const RectangleBar = ({ fill, x, y, width, height, payload, ...props }: any) => {
    const asNumber = Number(payload.base);
    console.log(JSON.stringify(payload, null, 2));
    if (isNaN(asNumber)) {
        throw new Error("Cannot render bar for chart: value is NaN");
    }
    const percent = (asNumber / 255) * 100;

    return (
        <path
            d={getPath(x, y, width, height)}
            style={{ fill: `color-mix(in hsl, hsl(0 84 60), hsl(142 71 45) ${percent}%)` }}
            stroke="none"
        />
    );
};

export default function Stats({ data }: StatsProps) {
    const chartedData = statArrayToChartable(data);

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="bg-zinc">Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartedData} margin={{ left: 5, top: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            domain={["auto", "auto"]}
                            tick={<DiagonalTick />}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            height={48}
                            interval={0}
                        />
                        <YAxis domain={[0, 255]} tickCount={8} width={24} />
                        <Bar shape={<RectangleBar />} dataKey="base" radius={4}>
                            <LabelList
                                dataKey="base"
                                position="top"
                                style={{ fill: "light-dark(#333, #eee", fontWeight: "bolder", zIndex: 20 }}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
