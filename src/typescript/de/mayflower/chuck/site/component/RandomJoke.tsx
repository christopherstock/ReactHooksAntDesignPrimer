
    import { Button, Divider, List }          from 'antd';
    import * as React                         from 'react';
    import { Debug, API, RandomJokeResponse } from '../..';

    /** ****************************************************************************************************************
    *   The React state for the RandomJoke component.
    *******************************************************************************************************************/
    export interface RandomJokeState
    {
        /** Indicates that the search results are currently requested from the server. */
        requestInProgress :boolean;

        /** The search results from the last search response. */
        jokes             :RandomJokeResponse[];
    }

    /** ****************************************************************************************************************
    *   The react component that represents the RandomJoke main content page.
    *******************************************************************************************************************/
    export class RandomJoke extends React.Component<any, RandomJokeState>
    {
        /** This AbortController can be used to cancel the 'RandomJoke' API-Response when the component is unmounted. */
        private             abortController             :AbortController                        = null;

        /** ************************************************************************************************************
        *   Creates a new Website React component.
        *
        *   @param props The initial properties to assign to this component.
        ***************************************************************************************************************/
        public constructor( props:any )
        {
            super( props );

            this.state = {
                jokes:             [],
                requestInProgress: false,
            };
        }

        /** ************************************************************************************************************
        *   Being invoked when this component did mount.
        ***************************************************************************************************************/
        public componentDidMount() : void
        {
            Debug.react.log( 'RandomJoke.componentDidMount() being invoked' );

            this.requestRandomJoke();
        }

        /** ************************************************************************************************************
        *   Being invoked when this component did mount.
        ***************************************************************************************************************/
        public componentWillUnmount() : void
        {
            Debug.react.log( 'RandomJoke.componentWillUnmount() being invoked' );

            // abort pending RandomJoke-Request, if existent
            if ( this.abortController !== null )
            {
                this.abortController.abort();
                this.abortController = null;

                Debug.network.log( ' Pending RandomJoke-Request has been CANCELED' );
            }
        }

        /** ************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        public render() : JSX.Element
        {
            Debug.react.log( 'RandomJoke.render() being invoked' );

            // TODO WORKSHOP show a Progress bar with maximum sustainable 'Chuck Norris Jokes per day' count
            return <div>

                <Button
                    type="primary"
                    onClick={ ( me: React.MouseEvent ) :void => { this.onClickJokeButton(); } }
                    loading={  this.state.requestInProgress }
                >
                    Request a Random Joke
                </Button>

                <Divider />

                {
                    this.state.jokes.length > 0
                    ? <List
                        dataSource={ this.state.jokes }
                        renderItem={

                            // TODO WORKSHOP extract to method .createJokeLine()
                            ( item:RandomJokeResponse, index:number ) :JSX.Element => {

                                const id   :number = ( index + 1 );
                                const fact :string = item.value.joke.replace( /&quot;/g, '"' );

                                return (
                                    <List.Item>
                                        { id }: { fact }
                                    </List.Item>
                                );
                            }
                        }
                    />
                    : null
                }

            </div>;
        }

        /** ************************************************************************************************************
        *   Being invoked when the 'Get Random Joke' button is clicked.
        ***************************************************************************************************************/
        private onClickJokeButton() : void
        {
            Debug.major.log( 'Button "Get a Joke" clicked.' );

            this.requestRandomJoke();
        }

        /** ************************************************************************************************************
        *   Requests a new random joke.
        ***************************************************************************************************************/
        private requestRandomJoke() : void
        {
            Debug.major.log( 'requestRandomJoke() being invoked.' );

            this.setState(
                {
                    ...this.state,

                    requestInProgress: true,
                }
            );

            // create a new AbortController
            this.abortController = new AbortController();

            // submit a new search
            API.getRandomJoke(
                ( data:RandomJokeResponse ) :void => {
                    this.onRandomJokeResponse( data );
                },
                ( error:Error ) :void => {
                    this.onRandomJokeError( error );
                },
                this.abortController.signal
            );
        }

        /** ************************************************************************************************************
        *   Being invoked when the random joke data has arrived.
        *
        *   @param joke The received random joke data model.
        ***************************************************************************************************************/
        private onRandomJokeResponse( joke:RandomJokeResponse ) : void
        {
            Debug.network.log( 'received random joke:' );
            Debug.network.log( JSON.stringify( joke ) );

            this.abortController = null;

            const newJokes:RandomJokeResponse[] = this.state.jokes.splice( 0 );
            newJokes.push( joke );

            this.setState(
                {
                    jokes:             newJokes,
                    requestInProgress: false,
                }
            );
        }

        /** ************************************************************************************************************
        *   Being invoked when the random joke request threw an error.
        *
        *   @param error The error that occurred on requesting the random joke.
        ***************************************************************************************************************/
        private onRandomJokeError( error:Error ) : void
        {
            Debug.network.log( 'requesting random joke threw an error:' );
            Debug.network.log( error.message );

            // check if the request has already been canceled
            if ( this.abortController === null )
            {
                Debug.network.log( 'The request has already been canceled and the state has been left!' );
            }
            else
            {
                this.abortController = null;

                this.setState(
                    {
                        ...this.state,

                        requestInProgress: false,
                    }
                );
            }
        }
    }
