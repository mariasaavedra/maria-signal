import { MopidyHttpOptions, MopidyHttpTransport } from './rpc/http';
import {
  MethodName,
  MethodParams,
  MethodResult,
  MopidyMethodMap,
} from './rpc/methods';
import {
  isJsonRpcFailure,
  JsonRpcId,
  JsonRpcRequest,
  JsonRpcResponse,
  MopidyRpcError,
} from './rpc/types';
import {
  createHistoryService,
  HistoryService,
} from './services/history';
import {
  createLibraryService,
  LibraryService,
} from './services/library';
import {
  createPlaybackService,
  PlaybackService,
} from './services/playback';
import {
  createPlaylistsService,
  PlaylistsService,
} from './services/playlists';
import {
  createQueueService,
  QueueService,
} from './services/queue';

export interface MopidyClient {
  call<TMethod extends MethodName>(
    method: TMethod,
    ...args: MethodParams<TMethod> extends undefined ? [] : [params: MethodParams<TMethod>]
  ): Promise<MethodResult<TMethod>>;
}

export interface CreateMopidyOptions extends MopidyHttpOptions {
  idGenerator?: () => JsonRpcId;
}

export interface MopidyFacade {
  client: MopidyClient;
  playback: PlaybackService;
  queue: QueueService;
  playlists: PlaylistsService;
  history: HistoryService;
  library: LibraryService;
}

const defaultIdGenerator = (): JsonRpcId => {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

class MopidyClientImpl implements MopidyClient {
  constructor(
    private readonly transport: MopidyHttpTransport,
    private readonly idGenerator: () => JsonRpcId
  ) {}

  async call<TMethod extends keyof MopidyMethodMap>(
    method: TMethod,
    ...args: MethodParams<TMethod> extends undefined ? [] : [params: MethodParams<TMethod>]
  ): Promise<MethodResult<TMethod>> {
    const params = args[0];
    const request: JsonRpcRequest<TMethod, MethodParams<TMethod>> = {
      jsonrpc: '2.0',
      id: this.idGenerator(),
      method,
      ...(params === undefined ? {} : { params }),
    };

    const response = await this.transport.send<JsonRpcResponse<MethodResult<TMethod>>>(request);

    if (isJsonRpcFailure(response)) {
      throw new MopidyRpcError({
        code: response.error.code,
        message: response.error.message,
        method,
        params,
        data: response.error.data,
      });
    }

    return response.result;
  }
}

export const createMopidyClient = (options: CreateMopidyOptions): MopidyClient => {
  const transport = new MopidyHttpTransport(options);
  return new MopidyClientImpl(transport, options.idGenerator ?? defaultIdGenerator);
};

export const createMopidy = (options: CreateMopidyOptions): MopidyFacade => {
  const client = createMopidyClient(options);

  return {
    client,
    playback: createPlaybackService(client),
    queue: createQueueService(client),
    playlists: createPlaylistsService(client),
    history: createHistoryService(client),
    library: createLibraryService(client),
  };
};