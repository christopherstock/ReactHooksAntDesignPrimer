
    import * as chuck from '..';

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
            onSuccess   :( json:chuck.RandomJokeResponse ) => void,
            onError     :( error:Error ) => void,
            abortSignal :AbortSignal
        )
        : void
        {
            if ( chuck.Setting.DEBUG_MOCK_ALL_REQUESTS )
            {
                window.setTimeout(
                    () => {
                        onSuccess( chuck.Mock.mockRandomJoke() );
                    },
                    chuck.Setting.DEBUG_MOCK_REQUEST_DELAY
                );
                return;
            }

            chuck.Networking.fetchViaApi(
                chuck.Setting.BASE_API_URL + 'jokes/random',
                'GET',
                null,
                ( json:JSON ) => {
                    const dto :chuck.RandomJokeResponse = json as unknown as chuck.RandomJokeResponse;
                    onSuccess( dto );
                },
                ( error:Error ) => {
                    onError( error );
                },
                abortSignal
            );
        }
    }
