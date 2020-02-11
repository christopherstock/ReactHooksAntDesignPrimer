
    import { AxiosStatic } from 'axios';
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
/*
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
*/

console.log( "Trying AXIOS lib request" );

axios.get(
    Setting.BASE_API_URL + 'jokes/random',
    {
        params: {
            ID: 12345
        }
    }
).then(
    function (response)
    {
        console.log( "Axios Response" );
        console.log( response );
    }
).catch(
    function (error)
    {
        console.log( "Axios Error" );
        console.log(error);
    }
);






/*
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
*/
        }
    }
