
    import * as React                                      from 'react';
    import { Layout }                                      from 'antd';
    import { Content, Debug, MainMenu, MenuItem, Setting } from '../..';

    /** ****************************************************************************************************************
    *   The React state for the Website component.
    *******************************************************************************************************************/
    export interface WebsiteState
    {
        /** The current selected menu item. */
        currentMenuItem :MenuItem;
    }

    /** ****************************************************************************************************************
    *   The react component that represents the entire website.
    *******************************************************************************************************************/
    export class Website extends React.Component<any, WebsiteState>
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
                currentMenuItem: MenuItem.RANDOM_JOKE,
            };
        }

        /** ************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        public render() : JSX.Element
        {
            Debug.react.log( 'Website.render() being invoked' );

            return <Layout>

                <MainMenu
                    onChangeMenu={ ( key:MenuItem ) :void => { this.onChangeMenu( key ); } }
                />

                <Layout>

                    <Layout.Header
                        className="header"
                    >
                        { Setting.TITLE }
                    </Layout.Header>

                    <Content
                        currentSite={ this.state.currentMenuItem }
                    />

                    <Layout.Footer
                        className="footer"
                    >
                        { Setting.COPYRIGHT }
                    </Layout.Footer>

                </Layout>

            </Layout>;
        }

        /** ************************************************************************************************************
        *   Being invoked when the selected menu index is changed.
        *   This method is not invoked when the current active menu item is clicked again.
        *
        *   @param key The current selected key index in the menu.
        ***************************************************************************************************************/
        private onChangeMenu( key:MenuItem ) : void
        {
            Debug.major.log( 'Website.onChangeMenu to key [' + key + ']' );

            this.setState(
                {
                    currentMenuItem: key,
                }
            );
        }
    }
