"use client";

import { Stat, StatName } from "@/lib/pkmn.types";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from "recharts";
import { statArrayToChartable, statNameToAbbreviation } from "@/lib/pkmn.utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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

export default function Stats({ data }: StatsProps) {
    const chartedData = statArrayToChartable(data);

    return (
        <Card className="w-full max-w-5xl">
            <CardHeader>
                <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartedData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => statNameToAbbreviation(value).toUpperCase()}
                        />
                        <YAxis max={255} />
                        <Tooltip wrapperClassName="rounded-lg" />
                        <Bar dataKey="base" fill="#3366ff" radius={4}>
                            <LabelList dataKey="base" position="top" style={{ fill: "#000" }} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
