export default class NotificationMessage {
  static notification = null;

  notificationTypes = {
    success: 'success',
    error: 'error',
  }

  constructor(message, config = {
    duration: 2000,
    type: 'success'}) {
    this.message = message;
    this.duration = config.duration;
    this.type = this.notificationTypes[config.type];

    if (NotificationMessage.notification) {
      NotificationMessage.notification.delete();
    }

    NotificationMessage.notification = this;
    this.element = this.render();
  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
    return div.firstChild;
  }

  show() {
    document.body.append(this.element);

    this.timeout = setTimeout(NotificationMessage.notification.delete, this.duration);
  }

  delete() {
    NotificationMessage.notification.element.remove();
    NotificationMessage.notification = null;
    clearTimeout(this.timeout);
  }
}
