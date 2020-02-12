
    import axios, { AxiosResponse, AxiosInstance } from 'axios';
    import * as moxios from 'moxios';
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
            // create Axios instance
            // TODO perform creation only once! move to React Context!
            const axiosInstance :AxiosInstance = axios.create(
                {
                    baseURL: Setting.BASE_API_URL,
                }
            );

            // TODO move to Context
            // TODO invoke uninstall() for axiosInstance on tearing down app
            if ( Setting.DEBUG_MOCK_ALL_REQUESTS )
            {
                moxios.install( axiosInstance );
                moxios.stubRequest(
                    'jokes/random',
                    {
                        response: Mock.mockRandomJoke(),
                    }
                )
            }

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
