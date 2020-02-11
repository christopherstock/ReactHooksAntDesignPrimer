
    import { Networking, Mock, RandomJokeResponse, Setting } from '..';

    /** ****************************************************************************************************************
    *   Triggers all different API requests.
    *******************************************************************************************************************/
    export class API
    {
        /** ************************************************************************************************************
        *   Requests a random joke.
        *
        *   @param onSuccess   The callback method to invoke and pass the response data to when the result is available.
        *   @param onError     The callback method to invoke when an error occurred.
        *   @param abortSignal The abort signal that may cancel this fetch request.
        ***************************************************************************************************************/
        public static getRandomJoke(
            onSuccess   :( json:RandomJokeResponse ) => void,
            onError     :( error:Error ) => void,
            abortSignal :AbortSignal
        )
        : void
        {
            if ( Setting.DEBUG_MOCK_ALL_REQUESTS )
            {
                window.setTimeout(
                    () => {
                        onSuccess( Mock.mockRandomJoke() );
                    },
                    Setting.DEBUG_MOCK_REQUEST_DELAY
                );
                return;
            }

            Networking.fetchViaApi(
                Setting.BASE_API_URL + 'jokes/random',
                'GET',
                null,
                ( json:JSON ) => {
                    const dto :RandomJokeResponse = json as unknown as RandomJokeResponse;
                    onSuccess( dto );
                },
                ( error:Error ) => {
                    onError( error );
                },
                abortSignal
            );
        }
    }
