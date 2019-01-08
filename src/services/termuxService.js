import termux from 'termux';

const commandPattern = /termux ([\s\S]+)/;

const smsCommands = {
  vibrate: (length = '1000') => {
    return termux.vibrate()
      .duration(parseInt(length))
      .run();
  },
  toast: (text = 'Hello!') => {
    return termux.toast()
      .text(text);
  },
};

const checkSms = content => {
  const matched = commandPattern.exec(content);

  if (matched) {
    const [command, ...params] = matched[1].split(' ');
    if (smsCommands[command]) {
      return smsCommands[command](...params);
    }
    return Promise.reject(`Command ${command} not found`);
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
      })
      .catch(error => {
        console.log('Sms command error:', error);
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
