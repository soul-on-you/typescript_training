class Notify {
  send(template: string, to: string) {
    console.log(`Отправляю "${template}": ${to}`);
  }
}

class Logger {
  log(message: string) {
    console.log(message);
  }
}

class Template {
  private _templates: { name: string; template: string }[] = [
    { name: "ex1", template: "<h1>Пример<h1>" },
    { name: "ex2", template: "<h2>Пример<h2>" },
  ];

  getByName(name: string) {
    return this._templates.find((t) => t.name === name);
  }
}

class NotificationFacade {
  private _notify: Notify;
  private _logger: Logger;
  private _template: Template;

  constructor() {
    this._notify = new Notify();
    this._logger = new Logger();
    this._template = new Template();
  }

  send(to: string, templateName: string) {
    const data = this._template.getByName(templateName);
    if (!data) {
      return this._logger.log(`Не найден шаблон ${templateName}`);
    }
    this._notify.send(data.template, to);
    this._logger.log("Шаблон отправлен");
  }
}

const notificationService = new NotificationFacade();
notificationService.send("Vi", "ex3");

console.log("\n");
notificationService.send("Vi", "ex1");
