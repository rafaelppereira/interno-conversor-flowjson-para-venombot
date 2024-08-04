import { Injectable, Logger } from '@nestjs/common';
import { create, Whatsapp } from 'venom-bot';

import * as fs from 'fs';
import { FlowRoot } from './utils/flow.interface';

@Injectable()
export class AppService {
  initVenomBot() {
    create({
      session: 'session-name',
      disableWelcome: true,
    })
      .then((client) => start(client))
      .catch((erro) => {
        console.log(erro);
      });

    async function start(client: Whatsapp) {
      const { flow }: FlowRoot = JSON.parse(
        fs.readFileSync('src/mocks/flow.json', 'utf8'),
      );

      client.onMessage(async (message) => {
        if (flow.initWord === '*') {
          if (message.body && message.isGroupMsg === false) {
            console.log('Qualquer palavra');
          }
        } else {
          if (message.body === flow.initWord && message.isGroupMsg === false) {
            Logger.verbose(`Iniciando o fluxo de mensagens: ${flow.name}`);

            for (const step of flow.steps) {
              switch (step.stepType) {
                case 'content':
                  for (const action of step.actions) {
                    console.log(action);

                    switch (action.type) {
                      case 'typing':
                        await client.startTyping(message.chatId, true);
                        break;
                      case 'text':
                        await client.sendText(message.chatId, action.content);
                        break;
                      case 'list':
                        await client.sendListMenu(
                          message.chatId,
                          action.title,
                          action.subtitle,
                          action.description,
                          action.title,
                          action.data,
                        );
                        break;
                    }
                  }
                  break;
              }
            }
          }
        }
      });
    }
  }
}
