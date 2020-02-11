
    import { AxiosStatic, AxiosResponse } from 'axios';

    // TODO prune?
    const axios :AxiosStatic = require( 'axios' ).default;

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

            // perform request via Axios API
            axios.get(
                Setting.BASE_API_URL + 'jokes/random',
                {
                    params: {
                        ID: 12345,
                    },
                }
            ).then(
                ( response:AxiosResponse ) :void => {
                    const dto :RandomJokeResponse = response.data as RandomJokeResponse;
                    onSuccess( dto );
                }
            ).catch(
                ( error :Error ) :void => {
                    onError( error );
                }
            );
        }
    }
