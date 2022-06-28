export default class SortableTable {
  orderIncrement = {
    'asc': 1,
    'desc': -1
  };

  constructor(headerConfig = [], data = []) {
    this.config = headerConfig;
    this.data = data;
    this.element = this.render();
    this.subElements = this.getSubElements();
    this.subElements.header.innerHTML = this.getHeader();
    this.subElements.body.innerHTML = this.getTableRows(this.data);
    this.updateRows(this.data);
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');
    for (const element of elements) {
      const name = element.dataset.element;
      result[name] = element;
    }
    return result;
  }

  getHeader() {
    return this.config.map(th => {
      return `<div class="sortable-table__cell" data-id="${th.id}" data-sortable="${th.sortable}" data-order="">
              <span>${th.title}</span>
            </div>`;
    }).join('');
  }

  getTableRow(row) {
    const tds = this.config.map(td => {
      return td.template ? td.template(row[td.id]) : `<div class="sortable-table__cell">${row[td.id]}</div>`;
    }).join('');
    return `<a href="/products/${row.id}" class="sortable-table__row">
                ${tds}
            </a>`;
  }

  getTableRows(rows) {
    return rows.map(value => this.getTableRow(value)).join('');
  }

  updateRows(rows) {
    this.subElements.body.innerHTML = this.getTableRows(rows);
  }


  getTemplate() {
    return `<div class="sortable-table">
              <div data-element="header" class="sortable-table__header sortable-table__row"></div>

              <div data-element="body" class="sortable-table__body"></div>

              <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

              <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                <div>
                  <p>No products satisfies your filter criteria</p>
                  <button type="button" class="button-primary-outline">Reset all filters</button>
                </div>
              </div>

              <span data-element="arrow" class="sortable-table__sort-arrow">
                  <span class="sort-arrow"></span>
              </span>

            </div>`;
  }

  sort(field, sort) {
    const config = this.config.find(conf => conf.id === field);
    const increment = this.orderIncrement[sort];
    if (config === undefined || increment === undefined || !config.sortable) {
      return;
    }
    const header = this.subElements.header.querySelector(`[data-id='${config.id}']`);
    header.dataset.order = sort;
    header.append(this.subElements.arrow);
    let sorted = [];
    const data = this.data;
    switch (config.sortType) {
      case 'string':
        sorted = [...data].sort((val1, val2) => val1[config.id]
          .localeCompare(val2[config.id],
            ['ru', 'en'],
            {sensitivity: 'variant', caseFirst: 'upper'}) * increment);
        break;
      case 'number':
        sorted = [...data].sort((val1, val2) => {
          return (val1[config.id] - val2[config.id]) * increment;
        });
        break;
      default:
        throw new Error('Unknown sort type');
        break;
    }
    this.updateRows(sorted);

  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

