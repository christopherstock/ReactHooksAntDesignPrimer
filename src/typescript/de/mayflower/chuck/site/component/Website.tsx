
    import * as React        from 'react';
    import * as antd         from 'antd';
    import * as chuck        from '../..';
    import { Menu, Content } from '../..';

    /** ****************************************************************************************************************
    *   The React state for the Website component.
    *******************************************************************************************************************/
    export interface WebsiteState
    {
        /** The current selected menu item. */
        currentMenuItem :chuck.MenuItem;
    }

    /** ****************************************************************************************************************
    *   The react component that represents the entire website.
    *******************************************************************************************************************/
    export class Website extends React.Component<any, chuck.WebsiteState>
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
                currentMenuItem: chuck.MenuItem.RANDOM_JOKE,
            };
        }

        /** ************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        public render() : JSX.Element
        {
            chuck.Debug.react.log( 'Website.render() being invoked' );

            return <antd.Layout>

                <Menu
                    onChangeMenu={ ( key:chuck.MenuItem ) :void => { this.onChangeMenu( key ); } }
                />

                <antd.Layout>

                    <antd.Layout.Header
                        className="header"
                    >
                        { chuck.Setting.TITLE }
                    </antd.Layout.Header>

                    <Content
                        currentSite={ this.state.currentMenuItem }
                    />

                    <antd.Layout.Footer
                        className="footer"
                    >
                        { chuck.Setting.COPYRIGHT }
                    </antd.Layout.Footer>

                </antd.Layout>

            </antd.Layout>;
        }

        /** ************************************************************************************************************
        *   Being invoked when the selected menu index is changed.
        *   This method is not invoked when the current active menu item is clicked again.
        *
        *   @param key The current selected key index in the menu.
        ***************************************************************************************************************/
        private onChangeMenu( key:chuck.MenuItem ) : void
        {
            chuck.Debug.major.log( 'Website.onChangeMenu to key [' + key + ']' );

            this.setState(
                {
                    currentMenuItem: key,
                }
            );
        }
    }
