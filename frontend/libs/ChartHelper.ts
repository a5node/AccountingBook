import type { ChartOptions, ChartData } from 'chart.js';

export class ChartHelper<T extends string> {
  datasets: ChartData['datasets'] = [];
  labels: T[] = [];
  constructor(labels: T[]) {
    this.labels = labels;
  }

  getRandomRgb = (): string => {
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  };

  public addDatasetLine = (fn: (str: T) => number, label: string, borderColor: string): this => {
    this.datasets.push({
      type: 'line' as const,
      label,
      borderColor,
      borderWidth: 2,
      fill: false,
      data: this.labels.map(fn),
    });
    return this;
  };

  public addDatasetBar = (fn: (str: T) => number, label: string, backgroundColor: string): this => {
    this.datasets.push({
      type: 'bar' as const,
      label,
      backgroundColor,
      data: this.labels.map(fn),
    });
    return this;
  };

  public options = (text: string): ChartOptions => {
    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      layout: { autoPadding: true },
      plugins: { legend: { position: 'right' as const } },
      scales: {
        x: { stacked: true, title: { display: true, text: text } },
        y: { position: 'left', beginAtZero: true, stacked: true },
      },
    };
    return options;
  };

  public data = (): ChartData => {
    const data: ChartData = {
      labels: this.labels,
      datasets: this.datasets,
    };
    return data;
  };
}
