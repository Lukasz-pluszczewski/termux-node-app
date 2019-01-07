import termux from 'termux';

const commandPattern = /termux ([\s\S]+)/;

const smsCommands = {
  vibrate: (length = '1000') => {
    return termux.vibrate()
      .duration(parseInt(length))
      .run();
  },
};

const checkSms = content => {
  const matched = commandPattern.exec(content);

  if (matched) {
    const [command, ...params] = matched[1];
    if (smsCommands[command]) {
      return smsCommands[command](...params);
    }
    return Promise.reject('Command not found');
  }
};

const termuxService = {
  checkMessages: () => {
    return termux.smsInbox()
      .date()
      .showNumbers()
      .run()
      .then(messages => {
        messages.forEach(({ body, read }) => {
          if (!read) {
            checkSms(body);
          }
        });
      });
  },
  watchSms: (interval = 20000) => {
    if (termuxService.interval) {
      clearInterval(termuxService.interval);
    }
    termuxService.interval = setInterval(() => {
      termuxService.checkMessages();
    }, interval);
  },
  unwatchSms: () => {
    clearInterval(termuxService.interval);
  },
};

export default termuxService;
