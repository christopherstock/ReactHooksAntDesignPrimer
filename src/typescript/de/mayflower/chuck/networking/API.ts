
    import axios, { AxiosResponse, AxiosInstance } from 'axios';
    import { Mock, RandomJokeResponse, Setting } from '..';

    /** ****************************************************************************************************************
    *   Triggers all different API requests.
    *******************************************************************************************************************/
    export class API
    {
        // TODO handle abortSignal

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
            // TODO use Moxios!
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

            // create Axios instance
            // TODO perform creation only once! move to React Context!
            const axiosInstance :AxiosInstance = axios.create(
                {
                    baseURL: Setting.BASE_API_URL,
                }
            );

            // perform request via Axios API
            axiosInstance.get(
                'jokes/random'
            ).then(
                ( response:AxiosResponse<RandomJokeResponse> ) :void => {
                    const dto :RandomJokeResponse = response.data;
                    onSuccess( dto );
                }
            ).catch(
                ( error :Error ) :void => {
                    onError( error );
                }
            );
        }
    }
