import { MopidyClient } from '../client';
import { MopidyRefRaw } from '../rpc/methods';

export interface HistoryService {
  getHistory(): Promise<Array<[number, MopidyRefRaw]>>;
  getLength(): Promise<number>;
}

export const createHistoryService = (client: MopidyClient): HistoryService => {
  return {
    async getHistory() {
      return client.call('core.history.get_history');
    },

    async getLength() {
      return client.call('core.history.get_length');
    },
  };
};
