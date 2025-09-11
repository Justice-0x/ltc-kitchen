import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function ChartCard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: "Suction Pressure (psig)",
            data: [20, 22, 18, 15, 21],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.3,
          },
        ],
      },
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-bold mb-2 text-black">Live Refrigeration Readings</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}
