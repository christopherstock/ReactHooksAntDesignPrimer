
    import Button                                          from 'antd/lib/button';
    import Divider                                         from 'antd/lib/divider';
    import List                                            from 'antd/lib/List';
    import * as React                                      from 'react';
    import { Debug, API, RandomJokeResponse, TestHookComponent } from '../..';

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

                <TestHookComponent />

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

            // submit a new search
            API.getRandomJoke(
                ( data:RandomJokeResponse ) :void => {
                    this.onRandomJokeResponse( data );
                },
                ( error:Error ) :void => {
                    this.onRandomJokeError( error );
                }
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

            // state the request as completed
            this.setState(
                {
                    ...this.state,

                    requestInProgress: false,
                }
            );
        }
    }
