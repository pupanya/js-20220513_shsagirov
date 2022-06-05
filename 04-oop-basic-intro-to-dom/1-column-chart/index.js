export default class ColumnChart {
  chartHeight = 50;

  constructor(value = {
                data: [],
                label: null,
                value: null,
                link: null,
                formatHeading: (header) => header
              }) {
    this.data = value.data;
    this.label = value.label;
    this.value = value.value;
    this.link = value.link;
    this.formatHeading = value.formatHeading ? value.formatHeading : (header) => header;

    this.element = this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="dashboard__chart_${this.label}">
    <div class="column-chart" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.link ? '<a href="/'+this.link+'" class="column-chart__link">View all</a>' : ''}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 22" data-tooltip="44%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 50" data-tooltip="100%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 4" data-tooltip="8%"></div>
          <div style="--value: 13" data-tooltip="28%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 34" data-tooltip="69%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 27" data-tooltip="56%"></div>
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
        </div>
      </div>
    </div>
  </div>
    `
    return element;
  }

}
