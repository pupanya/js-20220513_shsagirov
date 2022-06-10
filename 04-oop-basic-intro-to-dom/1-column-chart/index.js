export default class ColumnChart {
  chartHeight = 50;

  constructor({
                data = [],
                label = '',
                value = '',
                link = '',
                formatHeading = (header) => header
              } = {}) {
    this.chartHeight = 50;

    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;

    this.render();
    this.setSubElements();
    this.initEventListeners();
  }

  initEventListeners() {
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  setSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');
    for (const element of elements) {
      const name = element.dataset.element;
      result[name] = element;
    }
    this.subElements = result;
  }

  getTemplate() {
    return `
      <div class="dashboard__chart_${this.label} ${this.data.length > 1 ? '' : 'column-chart_loading'}">
        <div class="column-chart" style="--chart-height: ${this.chartHeight}">
          <div class="column-chart__title">
            Total ${this.label}
            ${this.link ? '<a href="/' + this.link + '" class="column-chart__link">View all</a>' : ''}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
            <div data-element="body" class="column-chart__chart">
                ${this.getChartTemplate()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getChartTemplate() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map(item => {
      const point = {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
      return `<div style="--value: ${point.value}" data-tooltip="${point.percent}"></div>`;
    }).join('');
  }

  update(data) {
    this.data = data;
    this.subElements.body.innerHTML = this.getChartTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
