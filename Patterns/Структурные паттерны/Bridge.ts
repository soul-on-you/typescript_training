interface IProvider {
  sendMessage(message: string, chatID: number): any;
  sendReport(chatID: number): any;
}

class ReportService {
  getReport() {
    const reportData = "Отчет компании Diomedialc...";
    console.log(reportData);
    return reportData;
  }
}

class TelegramProvider implements IProvider {
  private _bot: any;
  private _reporter = new ReportService();

  sendMessage(message: string, chatID: number) {
    this._bot.sendMessage(chatID, message);
  }
  sendReport(chatID: number) {
    this._bot.sendMessage(chatID, this._reporter.getReport());
  }
}

class WhatsAppProvider implements IProvider {
  private _bot: any;
  private _reporter = new ReportService();

  sendMessage(message: string, chatID: number) {
    this._bot.sendMessage(message, this._bot.getUser(chatID));
  }
  sendReport(chatID: number) {
    this._bot.sendMessage(
      this._reporter.getReport(),
      this._bot.getUser(chatID)
    );
  }
}

class Manager {
  constructor(public name: string, public chatID: number) {}
}

class NotificationService {
  protected _provider: IProvider;
  protected _managers: Manager[] = [];

  constructor(provider: IProvider) {
    this._provider = provider;
  }

  sendMessage(message: string): void {
    this._managers.forEach((manager) =>
      this._provider.sendMessage(message, manager.chatID)
    );
  }

  sendReport(): void {
    this._managers.forEach((manager) =>
      this._provider.sendReport(manager.chatID)
    );
  }

  addManager(manager: Manager) {
    if (!this._managers.includes(manager)) {
      this._managers.push(manager);
    }
  }
}

class DelayNotificationService extends NotificationService {
  constructor(provider: IProvider) {
    super(provider);
  }

  sendDelayedMessage(message: string, timeout: number): void {
    setTimeout(() => {
      super.sendMessage(message);
    }, timeout);
  }

  sendDelayedReport(timeout: number) {
    setTimeout(() => {
      super.sendReport();
    }, timeout);
  }
}

const managers: Manager[] = [
  new Manager("Victor", 216737904),
  new Manager("Vova", 23678235691),
  new Manager("Vladislav", 456761731),
  new Manager("Vi", 331786954),
];

const TelegramNotificationService = new NotificationService(
  new TelegramProvider()
);

const WhatsAppNotificationService = new NotificationService(
  new WhatsAppProvider()
);

for (let i = 0; i < managers.length; i++) {
  if (i % 2) {
    TelegramNotificationService.addManager(managers[i]);
  } else {
    WhatsAppNotificationService.addManager(managers[i]);
  }
}

const NotificationServices: NotificationService[] = [];

NotificationServices.push(TelegramNotificationService);
NotificationServices.push(WhatsAppNotificationService);

NotificationServices.forEach((notificationService) => {
  notificationService.sendReport();
});
