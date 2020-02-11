
    import { Layout }     from 'antd';
    import * as React     from 'react';
    import * as chuck     from '../..';
    import { RandomJoke } from '../..';

    /** ****************************************************************************************************************
    *   React properties for the Content component.
    *******************************************************************************************************************/
    export interface ContentProps
    {
        /** The current selected content site to display. */
        currentSite: chuck.MenuItem;
    }

    /** ****************************************************************************************************************
    *   The react component that represents the content part of the website.
    *******************************************************************************************************************/
    export class Content extends React.Component<chuck.ContentProps, any>
    {
        /** ************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        public render() : JSX.Element
        {
            chuck.Debug.react.log( 'Content.render() being invoked' );

            return <Layout.Content
                className="content"
            >

                <div>
                    { this.createContent() }
                </div>

            </Layout.Content>;
        }

        /** ************************************************************************************************************
        *   Creates the different content part for this Content component.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        private createContent() : JSX.Element
        {
            switch ( this.props.currentSite )
            {
                case chuck.MenuItem.RANDOM_JOKE:
                {
                    return <RandomJoke />;
                }

                default:
                {
                    // TODO WORKSHOP show a Notification that this content is subject to change
                    return <div>
                        To be defined ..
                    </div>;
                }
            }
        }
    }
